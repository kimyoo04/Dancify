import json
import requests

resp = requests.post(
    'https://openapi.vito.ai/v1/authenticate',
    data={'client_id': 'clid',
          'client_secret': 'clse'}
)
resp.raise_for_status()
print(resp.json())
