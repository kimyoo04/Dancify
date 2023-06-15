# pip install -q mediapipe==0.10.0
# pip install moviepy
# pip install protobuf==3.20
# pip install opencv-python

'''
#실행 예
from face_mosaic import *
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
print("Current path:", script_dir)

videopath = os.path.join(script_dir, 'test_data/spicy_karina.mp4')
savepath = os.path.join(script_dir, 'karina_result.mp4')
face_mosaic(videopath, savepath)

print("Done")
'''

import cv2
import mediapipe as mp
from drawing_utils import draw_detection

import moviepy.editor as mvp


def face_mosaic(videopath, savepath):
    '''
    동영상에 얼굴 모자이크를 하여 저장해주는 함수입니다.

    - videopath : 강사가 업로드 한 영상이 담긴 경로
    - savepath : 모자이크 처리된 영상을 저장할 경로
    - 주의) videopath에 무음 모자이크 처리 영상(mosaicpath)과
            오디오 추출 음원(audiopath)가 함께 저장됩니다.
    - ex) videopath = 'yourpath/karina.mp4'
    -     mosaicpath = 'yourpath/karina_mosaic.mp4'
    -     audiopath = 'yourpath/karina_mosaic.mp3'
    - savepath : 'yoursavepath/karina.mp4'
    '''

    mosaicpath = videopath[:-4]+'_mosaic.mp4'
    audiopath = mosaicpath[:-4] + '.mp3'

    # 동영상 파일 열기
    cap = cv2.VideoCapture(videopath)

    # 잘 열렸는지 확인
    if not cap.isOpened():
        print('Can\'t open the video (%d)' % (videopath))
        exit()

    # 재생할 파일의 넓이 얻기
    width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
    # 재생할 파일의 높이 얻기
    height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
    # 재생할 파일의 프레임 레이트 얻기
    fps = cap.get(cv2.CAP_PROP_FPS)

    # print('width {0}, height {1}, fps {2}'.format(width, height, fps))

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')

    # 파일 stream 생성
    out = cv2.VideoWriter(mosaicpath, fourcc, fps, (int(width), int(height)))

    mp_face_detection = mp.solutions.face_detection

    face_detection = mp_face_detection.FaceDetection(
        model_selection=1, min_detection_confidence=0.4)

    # 이전 detexction값 저장해두는 변수
    flag = 0

    while True:
        ret, image = cap.read()

        if image is None:
            break

        # 작업 전에 BGR 이미지를 RGB로 변환합니다.
        temp = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = face_detection.process(temp)

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

    # 원본 비디오에서 오디오를 추출합니다.
    mvp.ffmpeg_tools.ffmpeg_extract_audio(videopath, audiopath)

    # 비디오와 오디오를 합칩니다. (모자이크비디오, 오디오, 결과저장경로)
    mvp.ffmpeg_tools.ffmpeg_merge_video_audio(
        mosaicpath, audiopath, savepath,
        vcodec='copy', acodec='copy',
        ffmpeg_output=False, logger='bar')
