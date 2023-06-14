import json
import requests

config = {
    "diarization": {
        "use_verification": False
    },
    "use_multi_channel": False
}
j_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY3Mzg3OTQsImlhdCI6MTY4NjcxNzE5NCwianRpIjoiUS1OcmlPQXZQeEhZWTNCRnNxS0wiLCJwbGFuIjoiYmFzaWMiLCJzY29wZSI6InNwZWVjaCIsInN1YiI6IkRfUVY2WTI4NjZOelBrVUxjSlRoIn0.6N2gJOQyyzJImO98DK-Lh_F777ir0T9Zyy2N2ychJ3A'
resp = requests.post(
    'https://openapi.vito.ai/v1/transcribe',
    headers={'Authorization': 'bearer '+j_key},
    data={'config': json.dumps(config)},
    files={'file': open('sample4.m4a', 'rb')}
)
resp.raise_for_status()
print(resp.json()['id'])  # transcribe_id
