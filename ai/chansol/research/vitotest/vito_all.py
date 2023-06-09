# Fail
import json
import requests
id = ''
config = {
    "diarization": {
        "use_verification": False
    },
    "use_multi_channel": False
}
j_key = 'jwt_token'


def post_func(j_key):
    post_sample = requests.post(
        'https://openapi.vito.ai/v1/transcribe',
        headers={'Authorization': 'bearer '+j_key},
        data={'config': json.dumps(config)},
        files={'file': open('sample2.m4a', 'rb')}
    )
    post_sample.raise_for_status()
    return post_sample.json()


def get_func(id, j_key):
    get_sample = requests.get(
        'https://openapi.vito.ai/v1/transcribe/'+id,
        headers={'Authorization': 'bearer '+j_key},
    )
    get_sample.raise_for_status()
    return get_sample.json()


id = post_func(j_key)['id']
if id:
    print(get_func(id, j_key))
