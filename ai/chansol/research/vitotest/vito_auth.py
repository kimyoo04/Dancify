import json
import requests

resp = requests.post(
    'https://openapi.vito.ai/v1/authenticate',
    data={'client_id': 'D_QV6Y2866NzPkULcJTh',
          'client_secret': 'rJ7hm9FpPS5yhQ2oUpQre4Wp9KYfQP89S4BZtr4P'}
)
resp.raise_for_status()
print(resp.json())
