
# pip install transformers
# pip install torch
from transformers import AutoModel, AutoTokenizer
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
import numpy as np
from sklearn.metrics import *
from vito_all import transcribe

tokenizer = AutoTokenizer.from_pretrained("klue/roberta-small")
model = torch.load("roberta_speech.pt")

MAX_LEN = 128
BATCH_SIZE = 16

def test_convert(texts):
    input_ids = []
    attention_masks = []

    for text in texts:
        encoded_dict = tokenizer(text, max_length=MAX_LEN, padding='max_length', truncation=True,
                                return_attention_mask=True, return_tensors='pt')
        input_ids.append(encoded_dict['input_ids'])
        attention_masks.append(encoded_dict['attention_mask'])

    input_ids = torch.cat(input_ids, dim=0)
    attention_masks = torch.cat(attention_masks, dim=0)

    return TensorDataset(input_ids, attention_masks)

def test_classification(output):
    logits = output.logits.detach().numpy()
    predictions = np.argmax(logits, axis=1).flatten()
    return predictions

test_dataset = test_convert([transcribe("hanbundu.m4a")])
#test_dataset = test_convert(['시작할게'])
test_loader = DataLoader(test_dataset, shuffle=False)

#test data 확인

y_pred = []
model.eval()

with torch.no_grad():
    for step, batch in enumerate(test_loader):
        batch = tuple(t for t in batch)
        input_ids, attention_mask = batch

        outputs = model(input_ids, attention_mask=attention_mask)

        y_pred_label = test_classification(outputs)
        y_pred.extend(y_pred_label)

D = {0:'시작', 1:'이전', 2:'다음', 3:'한번더', 4:'종료', 5:'기타'}

for i in y_pred:
    print(D[i])