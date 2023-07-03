# pip install opencv-python
# pip install tensorflow

'''
# 사용 예시
from video_to_keypoint.vtk import *
videoname = video가 담긴 변수 이름
video_to_keypoint(videoname)
'''

import cv2
import os
import tensorflow as tf
import json


def video_to_keypoint(local_videopath):
    '''
    ---------------함수 설명---------------
    비디오의 프레임 단위로 각 부위별 x,y 좌표를 json 파일로 저장하는 함수입니다.

    ---------------parameter---------------
    - videoname : video가 담긴 변수 이름을 입력합니다.
    - video_path : 비디오의 경로(비동기 처리를 위해 videoname 대신 사용)

    ---------------return 값 설명---------------
    * type : json file (n번째 프레임의 keypoint 값)
    '''

    # def generate_random_string(length):
    #     letters = string.ascii_lowercase
    #     random_string = ''.join(random.choice(letters) for _ in range(length))
    #     return random_string

    # # 10자리의 랜덤 문자열 생성
    # random_string = generate_random_string(8)

    localpath = os.path.dirname(os.path.abspath(__file__))  # 현재 폴더
    modelpath = os.path.join(localpath, 'lightning_int8.tflite')  # 모델 경로

    # ------------------localpath에 videoname 변수로 mp4영상 저장하기------------------
    # local_videopath = os.path.join(videopath, f'{random_string}_original.mp4')  # original 비디오가 저장될 경로
    # 오리지널 비디오 파일 저장

    # bytes 객체이면
    # if isinstance(videoname, bytes):
    #     with open(local_videopath, 'wb') as file:
    #         # 파일 쓰기 작업 수행
    #         file.write(videoname)

    # # file 객체이면
    # else:
    #     with open(local_videopath, 'wb') as destination:
    #         for chunk in videoname.chunks():
    #             destination.write(chunk)

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
        result = []

        # 프레임 체크
        frame_interval = round(fps / 15)

        while (video.isOpened()):
            ret, image = video.read()
            if not ret:
                print('완료')
                break

            # dancer_x_y로 이미지의 스켈레톤 좌표를 출력합니다.
            if (int(video.get(1)) % frame_interval == 0):
                # print('Saved coordinate :', int(video.get(1)))
                result.append(dancer_x_y(interpreter, image))

        video.release()

        # json파일로 저장
        encode_file = json.dumps(result, indent=4, ensure_ascii=False)

    # 편집에 사용되었던 비디오 파일 삭제
    # os.remove(local_videopath)

    return encode_file

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

        yc = round(keypoint[0] * y, 3)
        xc = round(keypoint[1] * x, 3)
        score = round(keypoint[2], 3)

        data = {"y": yc,
                "x": xc,
                "score": score,
                "name": KEYPOINT_REVERSE[cnt]}

        tmp.append(data)
        cnt += 1
    result[0]["keypoints"] = tmp
    result[0]["score"] = round((total_score / 17), 3)

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
