FROM python:3.10.10

# opencv 설치를 위한 라이브러리 설치
RUN apt-get update && apt-get install -y libgl1-mesa-glx

# 영상 자르기 위한 ffmpeg 설치
RUN apt-get update && apt-get install -y ffmpeg

COPY ./ /usr/src/django
WORKDIR /usr/src/django

EXPOSE 8000

# 필요한 파이썬 패키지 설치
COPY requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt