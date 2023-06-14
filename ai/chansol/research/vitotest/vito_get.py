import requests

hello = requests.get(
    'https://openapi.vito.ai/v1/transcribe/'+'GrQ7K3HlRqWwKE-0xA68mA',
    headers={'Authorization': 'bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY3Mzg3OTQsImlhdCI6MTY4NjcxNzE5NCwianRpIjoiUS1OcmlPQXZQeEhZWTNCRnNxS0wiLCJwbGFuIjoiYmFzaWMiLCJzY29wZSI6InNwZWVjaCIsInN1YiI6IkRfUVY2WTI4NjZOelBrVUxjSlRoIn0.6N2gJOQyyzJImO98DK-Lh_F777ir0T9Zyy2N2ychJ3A'},
)
hello.raise_for_status()
print(hello.json()['status'])
