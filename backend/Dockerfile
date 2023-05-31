FROM python:3.10.10

COPY ./ /usr/src/django
WORKDIR /usr/src/django

EXPOSE 8000

# 필요한 파이썬 패키지 설치
COPY requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt