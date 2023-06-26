# complete

## 폴더 구조
```
📦code
 ┣ 📂aihub_sample
 ┃ ┣ 📜exo-love_me_right.json
 ┃ ┣ 📜red_velvet-red_flavor.json
 ┃ ┗ 📜snsd-gee.json
 ┣ 📂final_result
 ┃ ┣ 📜exo-rv.json
 ┃ ┣ 📜exo-snsd.json
 ┃ ┗ 📜rv-snsd.json
 ┣ 📂notebooks
 ┃ ┣ 📜01_angle1.ipynb
 ┃ ┣ 📜02_angle2.ipynb
 ┃ ┣ 📜03_angle3.ipynb
 ┃ ┣ 📜04_angle_v2.ipynb
 ┃ ┣ 📜05_json_similarity.ipynb
 ┃ ┣ 📜06_changed_json.ipynb
 ┃ ┣ 📜07_function_output.ipynb
 ┃ ┣ 📜08_function_refactoring.ipynb
 ┃ ┗ 📜09_final.ipynb
 ┣ 📂point_sample
 ┃ ┣ 📜chansol.json
 ┃ ┣ 📜danceable.json
 ┃ ┣ 📜dancer.json
 ┃ ┣ 📜heewon.json
 ┃ ┣ 📜sample_1.json
 ┃ ┣ 📜sample_2.json
 ┃ ┣ 📜test_data_1.json
 ┃ ┗ 📜test_data_2.json
 ┣ 📜ai_feedback.py
 ┣ 📜angle_calculation.py
 ┣ 📜example.py
 ┗ 📜note.md
```
- `aihub_sample`: 댄서 JSON
- `final_result`: `aihub_sample`의 JSON을 댄서-댄서블 JSON으로 가정하여 입력으로 사용한 결과물
- `notebooks`
    - `01_angle1.ipynb`
        - JSON 파일을 파싱하여, `matplotlib`을 이용하여 plot
        - 특정 부분만 떼어 내어 향후 진행 방안에 대한 탐구
    - `02_angle2.ipynb`
        - `angle1.ipynb`에 기반하여, 골격과 관절에 대한 `arctan2()` 각도 추출
    - `03_angle3.ipynb`
        - 희원님께 받은 Movenet 추출 JSON의 포맷에 대응하기 위해 `discarded_functions.py` 일부 변경
    - `04_angle_v2.ipynb`
        - `arctan2()` 방식에서 벡터의 내적 방식으로 관절의 각도 구하는 방법 변환
        - 각도는 degree로 통일
        - 여기부터는 `angle_calculation.py`의 구현으로 전환
    - `05_json_similarity.ipynb`
        - `calculate_angle_difference()` 함수 구현하여 두 json 간의 joint_angle 차의 절대값을 리스트에 저장
        - `average_angle_difference()` 함수 구현하여 영상에 대해 joint_angle의 오차를 반환
    - `06_changed_json.ipynb`
        - 변경된 JSON 포맷에 대응하기 위해 이전까지의 함수 변경
    - `07_final.ipynb`
        - 점수 변환 함수, 점수 기반 피드백 함수 구현
        - `angle_calculation.py` 완성
    - `08_function_refactoring.ipynb`
        - 함수 리팩토링
    - `09_final.ipynb`
        - `ai_feedback` 함수 구현
- `point_sample`
    - `chansol.json`: 찬솔님께 받은 AI-HUB의 이미지에서 추출한 keypoint
    - `danceable.json`: `dancer.json`에서 왼쪽 무릎, 오른쪽 무릎, 왼쪽 발, 오른쪽 발의 좌표 임의로 변경 (길이 2, [0]은 `dancer.json`과 다르고, [1]은 `dancer.json`과 완벽히 일치)
    - `dancer.json`: `dancer.json`+`chansol.json`하여 하나의 리스트에 담은 파일 (길이 2)
    - `heewon.json`: 희원님께 받은 Movenet에서 추출한 keypoint
    - `test_data_1.json`: 희원님께 받은 Movenet 카리나 추출 데이터(30fps, 20sec → 602frame) 하나의 리스트에 담은 파일
    - `test_data_2.json`: `test_data.json`에서 일부 변경하여 `calculate_angle_difference()` 검증에 사용
    - `sample_1.json`: 희원님께 받은 변경된 포맷 원본
    - `sample_2.json`: 희원님께 받은 변경된 포맷 수정본 (1 프레임씩 당기고, 첫 프레임은 맨 뒤로 이동)
- `ai_feedback.py`: **최종본**
- `angle_calculation.py`: 벡터의 내적을 이용한 각도 추출이 구현된 함수
- `example.py`: `angle_calculation.py`를 실제 사용한 예시