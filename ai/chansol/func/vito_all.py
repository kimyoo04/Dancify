# Fail
import json
import requests
import time
from typing import Optional, Tuple
from os import path

# 같은 폴더에 client.json으로 {"clid":클라이언트id, "clse":클라이언트시크릿}

config = {
    "diarization": {
        "use_verification": False
    },
    "use_multi_channel": False
}

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
    resp = requests.post(
        'https://openapi.vito.ai/v1/authenticate',
        data={'client_id': clid,
              'client_secret': clse}
    )
    resp.raise_for_status()
    return resp.json()['access_token'], float(resp.json()['expire_at'])


def post_func(jwt_key, filename):
    post_sample = requests.post(
        'https://openapi.vito.ai/v1/transcribe',
        headers={'Authorization': 'bearer '+jwt_key},
        data={'config': json.dumps(config)},
        files={'file': open(filename, 'rb')}
    )
    post_sample.raise_for_status()
    return post_sample.json()


def get_func(id, jwt_key):
    while True:
        get_sample = requests.get(
            'https://openapi.vito.ai/v1/transcribe/'+id,
            headers={'Authorization': 'bearer '+jwt_key},
        )
        get_sample.raise_for_status()
        if get_sample.json()['status'] == 'completed':
            return get_sample.json()['results']['utterances'][0]['msg']
        elif get_sample.json()['status'] == 'transcribing':
            time.sleep(1)
        else:
            return 'Fail'

def transcribe(filename):
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
