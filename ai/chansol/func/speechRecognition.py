import json
import requests
import time
from typing import Optional, Tuple
from os import path
from transformers import AutoModel, AutoTokenizer
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
import numpy as np
from sklearn.metrics import *

# 같은 폴더에 client.json으로 {"clid":클라이언트id, "clse":클라이언트시크릿}
tokenizer = AutoTokenizer.from_pretrained("klue/roberta-small")
model = torch.load("/roberta_speech.pt")

def load_key() -> Tuple[Optional[str], Optional[float]]:
    """
    저장된 key와 expire_time을 가져오는 함수
    Returns:
        Tuple[Optional[str], Optional[float]]: 저장된 key와 expire_time
    """
    try:
        with open('api_key.json', 'r') as file:
            data = json.load(file)
            jwt_key = data['jwt_key']
            expire_time = data['expire_time']
            return jwt_key, expire_time
    except (FileNotFoundError, KeyError):
        return None, None

def save_key(jwt_key: str, expire_time: float) -> None:
    """
    key와 expire_time을 저장하는 함수
    Args:
        jwt_key (str): 저장할 key
        expire_time (float): 저장할 expire_time
    Returns:
        None
    """
    data = {
        'jwt_key': jwt_key,
        'expire_time': expire_time
    }
    with open('api_key.json', 'w') as file:
        json.dump(data, file)

def auth_func(clid, clse):
    '''
    jwt_key/ expire time 받아오는 함수
    '''
    resp = requests.post(
        'https://openapi.vito.ai/v1/authenticate',
        data={'client_id': clid,
              'client_secret': clse}
    )
    resp.raise_for_status()
    return resp.json()['access_token'], float(resp.json()['expire_at'])

def post_func(jwt_key, filename):
    '''
    transcribe id 받아오는 함수
    '''
    # vito setting
    config = {
        "diarization": {
            "use_verification": False
        },
        "use_multi_channel": False
    }
    post_sample = requests.post(
        'https://openapi.vito.ai/v1/transcribe',
        headers={'Authorization': 'bearer '+jwt_key},
        data={'config': json.dumps(config)},
        files={'file': open(filename, 'rb')}
    )
    post_sample.raise_for_status()
    return post_sample.json()

def get_func(id, jwt_key):
    '''
    vito로 text 받아오는 함수
    '''
    while True:
        get_sample = requests.get(
            'https://openapi.vito.ai/v1/transcribe/'+id,
            headers={'Authorization': 'bearer '+jwt_key},
        )
        get_sample.raise_for_status()
        if get_sample.json()['status'] == 'completed': # 성공이면 텍스트 반환
            return get_sample.json()['results']['utterances'][0]['msg']
        elif get_sample.json()['status'] == 'transcribing': # 변환중이면 1초 더 기다리기
            time.sleep(1)
        else:
            return 'Fail'

def transcribe(filename):
    '''
    vito로 텍스트 받아오는 함수
    '''
    with open('client.json', 'r') as file:
        data = json.load(file)
        clid = data["clid"]
        clse = data["clse"]

    # 저장된 key와 expire_time 가져오기
    jwt_key, expire_time = load_key()

    # 현재 시간과 expire_time 비교하여 호출 스킵 여부 결정
    if not expire_time or expire_time<time.time():
        jwt_key, expire_time = auth_func(clid, clse)
        save_key(jwt_key, expire_time)

    id = post_func(jwt_key, filename)['id']
    return get_func(id, jwt_key)

def test_convert(texts):
    '''
    입력받은 텍스트를 토큰화한 결과로 input_ids, attention_masks 반환
    '''
    MAX_LEN = 128
    input_ids = []
    attention_masks = []

    for text in texts:  # 입력받은 텍스트를 토큰화
        encoded_dict = tokenizer(text, max_length=MAX_LEN, padding='max_length', truncation=True,
                                return_attention_mask=True, return_tensors='pt')
        input_ids.append(encoded_dict['input_ids'])
        attention_masks.append(encoded_dict['attention_mask'])

    input_ids = torch.cat(input_ids, dim=0) # 토큰화 한 텍스트 인덱스
    attention_masks = torch.cat(attention_masks, dim=0) # 토큰화 한 텍스트 어텐션마스크
    return TensorDataset(input_ids, attention_masks)

def test_classification(output):
    '''
    예측값 중 제일 확률 높은 인덱스 출력
    '''
    logits = output.logits.detach().numpy()
    predictions = np.argmax(logits, axis=1).flatten()
    return predictions

def stt(filename):
    # transcribe 함수(vito)로 받아온 텍스트를 토큰화
    test_dataset = test_convert([transcribe(filename)])
    test_loader = DataLoader(test_dataset, shuffle=False)
    y_pred = []

    # 모델 평가모드
    model.eval()
    with torch.no_grad():
        # test_loader에서 input_ids, attentiion_mask 하나씩 꺼내기
        for _, batch in enumerate(test_loader):
            batch = tuple(t for t in batch)
            input_ids, attention_mask = batch
            # 모델 돌리기
            outputs = model(input_ids, attention_mask=attention_mask)
            # 결과 출력
            y_pred_label = test_classification(outputs)
            y_pred.extend(y_pred_label)
    D = {0:'시작', 1:'이전', 2:'다음', 3:'한번더', 4:'종료', 5:'기타'}
    return D[y_pred[0]]
