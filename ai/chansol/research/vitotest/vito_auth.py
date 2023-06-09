import json
import requests

resp = requests.post(
    'https://openapi.vito.ai/v1/authenticate',
    data={'client_id': '',
          'client_secret': ''}
)
resp.raise_for_status()
print(resp.json())
