# complete

## 폴더 구조
```
📦complete
 ┣ 📂notebooks
 ┃ ┣ 📜angle1.ipynb
 ┃ ┣ 📜angle2.ipynb
 ┃ ┣ 📜angle3.ipynb
 ┃ ┗ 📜angle_v2.ipynb
 ┣ 📂point_sample
 ┃ ┣ 📜chansol.json
 ┃ ┣ 📜heewon.json
 ┃ ┣ 📜sample.json
 ┃ ┗ 📜test_data.json
 ┣ 📜angle_calc.py
 ┣ 📜angle_calc_discard.py
 ┣ 📜example.py
 ┗ 📜note.md
```

- `notebooks`
    - `angle1.ipynb`
        - JSON 파일을 파싱하여, `matplotlib`을 이용하여 plot
        - 특정 부분만 떼어 내어 향후 진행 방안에 대한 탐구
    - `angle2.ipynb`
        - `angle1.ipynb`에 기반하여, 골격과 관절에 대한 `arctan2()` 각도 추출
    - `angle3.ipynb`
        - 희원님께 받은 Movenet 추출 JSON의 포맷에 대응하기 위해 `angle_calc.py` 일부 변경
    - `angle_v2.ipynb`
        - `arctan2()` 방식에서 벡터의 내적 방식으로 관절의 각도 구하는 방법 변환
        - 각도는 degree로 통일
- `point_sample`
    - `chansol.json`: 찬솔님께 받은 AI-HUB의 이미지에서 추출한 keypoint
    - `heewon.json`: 희원님께 받은 Movenet에서 추출한 keypoint
    - `sample.json`: `chansol.json`과 `heewon.json`을 하나의 리스트에 담은 파일
    - `test_data.json`: 희원님께 받은 Movenet 카리나 추출 데이터(30fps, 20sec → 602frame) 하나의 리스트에 담은 파일
- `angle_calc.py`: 벡터의 내적을 이용한 각도 추출이 구현된 함수
- `angle_calc_discard.py`: `arctan2()`를 이용하여 각도 추출이 구현된 함수 (폐기)
- `example.py`: `angle_calc.py`를 실제 사용한 예시