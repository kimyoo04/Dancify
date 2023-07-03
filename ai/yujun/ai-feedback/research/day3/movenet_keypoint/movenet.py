import tensorflow as tf
import tensorflow_hub as hub
import cv2
import numpy as np
import time

# TF Hub에서 모델 MoveNet-singlepose-thunder 로드
model = hub.load('https://tfhub.dev/google/movenet/singlepose/thunder/3')
movenet = model.signatures['serving_default']

# Threshold 설정
threshold = 0.3

# 비디오 소스 로드
video_source = 1                        # Windows=0 / Mac=1
cam = cv2.VideoCapture(video_source)

# 비디오 캡쳐 중 오류 확인
if not cam.isOpened():
    print('Error loading video')
    quit()

# 목표 fps 설정 및 이에 기반하여 frame 간의 딜레이 계산
fps = 30
delay = int(1000 / fps)

success, img = cam.read()

if not success:
    print('Error reading frame')
    quit()

y, x, _ = img.shape             # (x, y) = (1920, 1080)

while success:
    start_time = time.time()

    # 비디오 or 이미지 한 프레임은 int32의 tensor로 출력됨
    # shape: 256x256x3 / channel 순서와 범위: RGB, [0, 255]
    tf_img = cv2.resize(img, (256, 256))
    tf_img = cv2.cvtColor(tf_img, cv2.COLOR_BGR2RGB)
    tf_img = np.asarray(tf_img)
    tf_img = np.expand_dims(tf_img, axis=0)

    # tf_img를 정수형 데이터로 변환 -> 비율 유지하여 size를 맞추기 위해 resize & padding
    image = tf.cast(tf_img, dtype=tf.int32)

    outputs = movenet(image)                # 모델 추론
    keypoints = outputs['output_0']         # Output is a [1, 1, 17, 3] tensor

    keypoints_coordinates = []

    for k in keypoints[0, 0, :, :]:
        k = k.numpy()                       # Numpy array로 변환

        if k[2] > threshold:                # 관절이 감지되었는지 확인
            # 마지막 차원의 첫 번째 두 채널은 17개 관절의 y, x 좌표
            # (이미지 프레임에 대해 정규화된 값, 즉 [0.0, 1.0] 범위)를 나타냄
            yc = int(k[0] * y)
            xc = int(k[1] * x)
        else:
            # 감지되지 않은 관절의 좌표를 (0, 0)으로 설정
            xc, yc = 0, 0

        keypoints_coordinates.append((xc, yc))

    # Print the keypoints coordinates in the terminal
    print(keypoints_coordinates)

    # 각 keypoint에 circle로 마킹
    for (xc, yc) in keypoints_coordinates:
        img = cv2.circle(img, (xc, yc), 3, (0, 255, 0), 5)
        '''
        img: 원형 마커를 그릴 이미지
        (xc, yc): 원형 마커의 중심 좌표
        3: 원형 마커의 반지름
        (0, 255, 0): 원형 마커의 색상 (BGR 형식)
        5: 원형 마커의 두께
        '''
    cv2.imshow('MoveNet', img)
    if cv2.waitKey(1) == ord("q"):          # q가 입력되면 종료
        break

    success, img = cam.read()

    end_time = time.time()                      # 현재 frame 처리가 완료된 시점 기록
    processing_time = end_time - start_time     # 프레임 처리에 소요된 시간을 계산

    # 지정된 딜레이 시간과 프레임 처리 시간과의 차이를 계산. delay[ms]
    remaining_time = max(0, delay / 1000 - processing_time)
    # 남은 대기 시간만큼 스레드를 일시 정지합니다. 이를 통해 프레임 간의 딜레이 시간을 제어하고, 일정한 프레임 속도로 처리
    time.sleep(remaining_time)

cam.release()
