import requests

hello = requests.get(
    'https://openapi.vito.ai/v1/transcribe/'+'transcribe_id',
    headers={'Authorization': 'bearer '+'jwt_token'},
)
hello.raise_for_status()
print(hello.json()['results']['utterances'][0]['msg'])
