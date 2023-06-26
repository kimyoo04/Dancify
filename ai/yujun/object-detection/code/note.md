# complete

## 폴더 구조
```
📦code
 ┣ 📂audio_video
 ┃ ┗ 📜omg.mp4
 ┣ 📂result
 ┃ ┗ 📜omg.mp4
 ┣ 📂temp
 ┣ 📜example.ipynb
 ┣ 📜example.py
 ┣ 📜note.md
 ┗ 📜shortform_generator.py
 ```
- `audio_video`: 원본 영상 폴더
- `result`: 결과 영상 폴더
- `temp`: 중간에 생기는 mp3나 crop한 중간 영상을 임시로 담는 폴더
- `example.ipynb`: `shorform_generator.py`를 적용하는 예시 코드 (`.ipynb` 버전)
- `example.py`: `shorform_generator.py`를 적용하는 예시 코드 (`.py` 버전)
- `shortform_generator.py`: 영상을 입력받아 음성 추출 → 영상 크롭 → 음성 합성을 진행하는 함수