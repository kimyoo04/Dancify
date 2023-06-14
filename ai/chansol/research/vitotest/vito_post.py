import json
import requests

config = {
    "diarization": {
        "use_verification": False
    },
    "use_multi_channel": False
}
j_key = 'jwt_key'
resp = requests.post(
    'https://openapi.vito.ai/v1/transcribe',
    headers={'Authorization': 'bearer '+j_key},
    data={'config': json.dumps(config)},
    files={'file': open('sample4.m4a', 'rb')}
)
resp.raise_for_status()
print(resp.json()['id'])  # transcribe_id
