# pip install opencv-python
# pip install tensorflow

'''
# 사용 예시
from video_to_keypoint.vtk import *

AWS_ACCESS_KEY_ID ="blahblah"
AWS_SECRET_ACCESS_KEY = "blahblah"
bucket = 'dancify-hw-bucket'

localpath = os.path.dirname(os.path.abspath(__file__)) #현재 폴더
local_videopath =  os.path.join(localpath, 'spicy_winter.mp4')
jsonname = 'spicy_winter'

video_to_keypoint(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, bucket, local_videopath, jsonname)
'''

import boto3
import cv2
import os
import tensorflow as tf
import json


def video_to_keypoint(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, bucket, local_videopath, jsonname):
    '''
    ---------------함수 설명---------------
    비디오의 프레임 단위로 각 부위별 x,y 좌표를 json 파일로 저장하는 함수입니다.

    ---------------parameter---------------
    - AWS_ACCESS_KEY_ID : 키 아이디
    - AWS_SECRET_ACCESS_KEY : 시크릿 키
    - bucket : 버킷 이름
    - local_videopath : 로컬에 저장된 비디오 경로를 입력합니다.
    - jsonname :   s3에 저장될 json이름을 입력합니다.
                   ex) karina.json이면 karina만 입력

   ---------------return 값 설명---------------
    * type : json file

    - video_to_xy[0] : FPS
    - video_to_xy[1] ~ ... : n번째 이미지의 keypoint 값

    ---------------s3 저장 경로---------------
    (나중에 backend분들과 상의 후 수정 필요)
    - XXX json 파일이 저장될 경로 : f'video/dancer_video/json/{jsonname}.json' (s3_savepath)

    '''

    # s3로드
    client = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY, region_name='ap-northeast-2')

    localpath = os.path.dirname(os.path.abspath(__file__))  # 현재 폴더
    modelpath = os.path.join(localpath, 'lightning_int8.tflite')  # 모델 경로

    # ------------------x,y keypoints가 담긴 json 파일 생성------------------

    # 비디오 불러오기
    video = cv2.VideoCapture(local_videopath)

    # 모델 불러오기
    interpreter = tf.lite.Interpreter(model_path=modelpath)
    interpreter.allocate_tensors()

    # 비디오를 열 수 없다면 Could not Open 출력
    if not video.isOpened():
        print("Could not Open :", local_videopath)
        exit(0)

    # 비디오가 정상적으로 open된 경우
    else:
        # 불러온 비디오 파일의 정보 출력
        length = int(video.get(cv2.CAP_PROP_FRAME_COUNT))
        width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = video.get(cv2.CAP_PROP_FPS)

        print("length :", length)
        print("width :", width)
        print("height :", height)
        print("fps :", fps)

        # 결과를 저장할 변수
        result = [15]

        # 프레임 체크
        frame_interval = round(fps / 15)

        while(video.isOpened()):
            ret, image = video.read()
            if not ret:
                print('완료')
                break

            # dancer_x_y로 이미지의 스켈레톤 좌표를 출력합니다.
            if(int(video.get(1)) % frame_interval == 0):
                # print('Saved coordinate :', int(video.get(1)))
                result.append(dancer_x_y(interpreter, image))

        video.release()

        # json파일로 저장
        encode_file = json.dumps(result, indent=4, ensure_ascii=False)

    # ------------------s3에 저장 후 비디오 파일 삭제-----------------
    s3_savepath = 'video/dancer_video/json/' + jsonname + '.json'
    client.put_object(Bucket=bucket, Key=s3_savepath, Body=encode_file)

    # 편집에 사용되었던 비디오 파일 삭제
    # os.remove(local_videopath)


# -----------------------------------------------

def dancer_x_y(interpreter, image):
    '''
    movenet 함수로 x,y,confidence score의 값을 추출하도록 하고,
    실시간 스켈레톤의 출력값과 동일하도록 수정하는 함수입니다.
    '''
    KEYPOINT_REVERSE = {
        0: "nose",
        1: "left_eye",
        2: "right_eye",
        3: "left_ear",
        4: "right_ear",
        5: "left_shoulder",
        6: "right_shoulder",
        7: "left_elbow",
        8: "right_elbow",
        9: "left_wrist",
        10: "right_wrist",
        11: "left_hip",
        12: "right_hip",
        13: "left_knee",
        14: "right_knee",
        15: "left_ankle",
        16: "right_ankle"
    }

    result = [{"keypoints": []}]

    tmp = []
    input_size = 192

    y, x, _ = image.shape
    input_image = tf.expand_dims(image, axis=0)
    input_image = tf.image.resize_with_pad(input_image, input_size, input_size)

    # movenet 함수로 키포인트를 추출합니다.
    keypoints = movenet(interpreter, input_image)

    # movenet 출력값에 맞게 변경해줍니다.
    cnt = 0
    total_score = 0
    for keypoint in keypoints[0, 0, :, :]:
        keypoint = keypoint.astype(float)
        total_score += keypoint[2]

        yc = keypoint[0] * y
        xc = keypoint[1] * x

        data = {"y": yc,
                "x": xc,
                "score": keypoint[2],
                "name": KEYPOINT_REVERSE[cnt]}

        tmp.append(data)
        cnt += 1
    result[0]["keypoints"] = tmp
    result[0]["score"] = total_score / 17

    return result


# -----------------------------------------------

def movenet(interpreter, input_image):
    '''
    * 이미지의 x,y 좌표와 confidence score를 출력합니다.

    * interperter : 모델
    * image : 이미지
    '''

    # TF Lite format expects tensor type of uint8.
    input_image = tf.cast(input_image, dtype=tf.uint8)
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    interpreter.set_tensor(input_details[0]['index'], input_image.numpy())
    # Invoke inference.
    interpreter.invoke()
    # Get the model prediction.
    keypoints_with_scores = interpreter.get_tensor(output_details[0]['index'])
    return keypoints_with_scores
