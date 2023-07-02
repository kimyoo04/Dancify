# pip install -q mediapipe==0.10.0
# pip install moviepy
# pip install protobuf==3.20
# pip install opencv-python

'''
# 사용 예시
from face_mosaic.face_mosaic import *
videoname = video가 담긴 변수 이름
face_mosaic(videoname)
'''

import os
import cv2
import mediapipe as mp
import shutil
import random
import string

from .drawing_utils import draw_detection

import moviepy.editor as mvp


def face_mosaic(videoname):
    '''
    ---------------함수 설명---------------
    동영상에 얼굴 모자이크를 하여 저장해주는 함수입니다.
    현재 local경로(face_mosaic폴더)에 폴더를 만들어서 파일들(모자이크 영상 파일, 오디오 추출 파일)을 저장했다가,
    편집이 완료되면 파일이 지워집니다.

    ---------------parameter---------------
    - videoname : video가 담긴 변수 이름을 입력합니다.

    ---------------return 값 설명---------------
    * type : mp4 file (바이너리 형태)
    '''
    def generate_random_string(length):
        letters = string.ascii_lowercase
        random_string = ''.join(random.choice(letters) for _ in range(length))
        return random_string

    # 10자리의 랜덤 문자열 생성
    random_string = generate_random_string(8)

    # 영상 저장할 경로 지정
    localpath = os.path.dirname(os.path.abspath(__file__))  # 현재 폴더
    localpath = os.path.join(localpath, random_string)  # 현재 폴더/random_string/
    os.makedirs(localpath, exist_ok=True)  # 폴더 생성

    # ------------------영상에 모자이크 효과------------------
    # 오리지널 비디오 : f'{random_string}_original.mp4'
    # 결과 비디오 : f'{random_string}.mp4'
    # 모자이크 한 무음 비디오 : f'{random_string}_mosaic.mp4'
    # 비디오 mp3 : f'{random_string}_mosaic.mp3'
    local_videopath = os.path.join(localpath, f'{random_string}_original.mp4')
    resultpath = os.path.join(localpath, f'{random_string}.mp4')
    mosaicpath = os.path.join(localpath, f'{random_string}_mosaic.mp4')
    audiopath = mosaicpath[:-4] + '.mp3'

    # ---localpath에 videoname 변수로 mp4영상 저장하기---
    # 오리지널 비디오 파일 저장
    # bytes 객체이면
    if isinstance(videoname, bytes):
        with open(local_videopath, 'wb') as file:
            # 파일 쓰기 작업 수행
            file.write(videoname)

    # file 객체이면
    else:
        with open(local_videopath, 'wb') as destination:
            for chunk in videoname.chunks():
                destination.write(chunk)

    # 오리지널 동영상 파일 열기
    cap = cv2.VideoCapture(local_videopath)

    # 잘 열렸는지 확인
    if not cap.isOpened():
        print('Can\'t open the video (%d)' % (local_videopath))
        shutil.rmtree(localpath)
        exit()

    # 재생할 파일의 넓이 얻기
    width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
    # 재생할 파일의 높이 얻기
    height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
    # 재생할 파일의 프레임 레이트 얻기
    fps = cap.get(cv2.CAP_PROP_FPS)

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')

    # 파일 stream 생성
    out = cv2.VideoWriter(mosaicpath, fourcc, fps, (int(width), int(height)))

    # 모델 불러오기
    mp_face_detection = mp.solutions.face_detection
    face_detection = mp_face_detection.FaceDetection(model_selection=1, min_detection_confidence=0.4)

    # 이전 detection값 저장해두는 변수
    flag = 0

    while True:
        ret, image = cap.read()

        if image is None:
            break

        # 작업 전에 BGR 이미지를 RGB로 변환합니다.
        results = face_detection.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

        if results.detections:
            flag = results.detections
            annotated_image = image.copy()
            frame = draw_detection(annotated_image, results.detections[0])
            out.write(frame)

        # detect 못 했으면 이전의 값 그대로 사용
        elif not results.detections and flag != 0:
            annotated_image = image.copy()
            frame = draw_detection(annotated_image, flag[0])
            out.write(frame)

        else:
            out.write(image)

    # 재생 파일 종료
    cap.release()
    # 저장 파일 종료
    out.release()

    # ------------------영상 오디오 추출하고 비디오에 merge하기------------------
    # 원본 비디오에서 오디오를 추출합니다.
    mvp.ffmpeg_tools.ffmpeg_extract_audio(local_videopath, audiopath)

    # 비디오와 오디오를 합쳐 저장합니다. (모자이크비디오, 오디오, 결과저장경로)
    mvp.ffmpeg_tools.ffmpeg_merge_video_audio(mosaicpath, audiopath, resultpath, vcodec='copy', acodec='copy', ffmpeg_output=False, logger='bar')

    # 편집 완료된 동영상을 변수에 담아 저장합니다.
    with open(resultpath, 'rb') as file:
        result_video = file.read()  # 바이너리 파일

    # 편집에 사용되었던 localpath 폴더 삭제
    shutil.rmtree(localpath)

    return result_video
