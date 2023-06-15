# pip install opencv-python
# pip install tensorflow

'''
#실행예시
from img_to_keypoint import *

filepath = './spicy_karina.mp4'
folderpath = './test/'
modelpath = 'models/lightning_int8.tflite'

video_to_xy(filepath, folderpath, modelpath, 'test_data')
'''


import cv2
import os
import tensorflow as tf
import json


def video_to_xy(filepath, folderpath, modelpath, post_id):
    '''
    * 비디오의 프레임 단위로 각 부위별 x,y 좌표를 json 파일로 저장하는 함수입니다.
    * filepath : 비디오가 있는 파일경로를 입력합니다. : 'spicy_karina.mp4'
    * folderpath : json파일을 저장할 폴더의 경로를 입력합니다. : './karina/'
    * modelpath : 모델이 들어있는 경로를 입력합니다. : 'models/lightning_int8.tflite'
    * post_id : '게시글 아이디.json'으로 json 파일을 저장합니다.

    * 출력값 설명
    video_to_xy[0] : FPS
    video_to_xy[1] ~ ... : n번째 이미지의 keypoint 값
    '''

    # 비디오 불러오기
    video = cv2.VideoCapture(filepath)

    # 모델 불러오기
    interpreter = tf.lite.Interpreter(model_path=modelpath)
    interpreter.allocate_tensors()

    # 비디오를 열 수 없다면 Could not Open 출력
    if not video.isOpened():
        print("Could not Open :", filepath)
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

        # 프레임을 저장할 디렉토리를 생성
        try:
            if not os.path.exists(folderpath):
                os.makedirs(folderpath)
        except OSError:
            print('Error: Creating directory. ' + folderpath)

        # 결과를 저장할 변수
        result = [round(fps)]

        while(video.isOpened()):
            ret, image = video.read()
            if not ret:
                print('완료')
                break

            # dancer_x_y로 이미지의 스켈레톤 좌표를 출력합니다.
            result.append(dancer_x_y(interpreter, image))

        # json파일로 저장
        with open(folderpath + str(post_id) + ".json", 'w') as file:
            json.dump(result, file, indent=4)


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
