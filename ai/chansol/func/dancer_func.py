import tensorflow as tf
import tensorflow_hub as hub
import cv2
import numpy as np

KEYPOINT_DICT = {
    'nose': 0,
    'left_eye': 1,
    'right_eye': 2,
    'left_ear': 3,
    'right_ear': 4,
    'left_shoulder': 5,
    'right_shoulder': 6,
    'left_elbow': 7,
    'right_elbow': 8,
    'left_wrist': 9,
    'right_wrist': 10,
    'left_hip': 11,
    'right_hip': 12,
    'left_knee': 13,
    'right_knee': 14,
    'left_ankle': 15,
    'right_ankle': 16
}

KEYPOINT_REVERSE = {
    0: 'nose',
    1: 'left_eye',
    2: 'right_eye',
    3: 'left_ear',
    4: 'right_ear',
    5: 'left_shoulder',
    6: 'right_shoulder',
    7: 'left_elbow',
    8: 'right_elbow',
    9: 'left_wrist',
    10: 'right_wrist',
    11: 'left_hip',
    12: 'right_hip',
    13: 'left_knee',
    14: 'right_knee',
    15: 'left_ankle',
    16: 'right_ankle'
}

KEYPOINT_EDGE_INDS_TO_COLOR = {
    (0, 1): 'm',
    (0, 2): 'c',
    (1, 3): 'm',
    (2, 4): 'c',
    (0, 5): 'm',
    (0, 6): 'c',
    (5, 7): 'm',
    (7, 9): 'm',
    (6, 8): 'c',
    (8, 10): 'c',
    (5, 6): 'y',
    (5, 11): 'm',
    (6, 12): 'c',
    (11, 12): 'y',
    (11, 13): 'm',
    (13, 15): 'm',
    (12, 14): 'c',
    (14, 16): 'c'
}
input_size = 192

result = [{"keypoints": []}]

image_path = 'C:/Users/User/Documents/GitHub/dancify/ai/chansol/research/movenet_tensorflow/034_D00_001_F_00005496.jpg'

image = tf.io.read_file(image_path)
image = tf.image.decode_jpeg(image)
tmp = []


def dancer_x_y(img):
    y, x, _ = img.shape
    image = tf.expand_dims(img, axis=0)
    image = tf.image.resize_with_pad(image, input_size, input_size)

    # Download the model from TF Hub.
    model = hub.load('https://tfhub.dev/google/movenet/singlepose/lightning/4')
    movenet = model.signatures['serving_default']

    image = tf.cast(image, dtype=tf.int32)
    outputs = movenet(image)

    # Output is a [1, 1, 17, 3] tensor.
    keypoints = outputs['output_0']
    cnt = 0
    for k in keypoints[0, 0, :, :]:
        k = k.numpy()

        yc = k[0] * y
        xc = k[1] * x

        d = {"y": yc,
             "x": xc,
             "score": k[2],
             "name": KEYPOINT_REVERSE[cnt]}
        # result = [{'keypoints': []}]
        tmp.append(d)
        cnt += 1
    result[0]['keypoints'] = tmp

    return result


print(dancer_x_y(image))
