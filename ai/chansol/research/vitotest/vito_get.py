import requests

hello = requests.get(
    'https://openapi.vito.ai/v1/transcribe/'+'transcribeid',
    headers={'Authorization': 'bearer '+'jwt_key'},
)
hello.raise_for_status()
print(hello.json()['status'])
