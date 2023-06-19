from flask import Flask, send_file, request
import json
import os
app = Flask(__name__)


@app.route('/save_logs', methods=['POST'])
def save_logs():
    # 클라이언트로부터 받은 로그 데이터
    data = request.get_json()

    # 로그 데이터를 JSON 파일로 저장
    with open('/path/to/logs.json', 'w') as f:
        json.dump(data, f)

    return '로그가 저장되었습니다.'


@app.route('/download_logs')
def download_logs():
    # JSON 로그 파일 경로
    logs_path = '/path/to/logs.json'

    # 로그 파일이 존재하는지 확인
    if not os.path.exists(logs_path):
        return '로그 파일이 존재하지 않습니다.'

    # 로그 파일 다운로드
    return send_file(logs_path, as_attachment=True)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3300, debug=True)
