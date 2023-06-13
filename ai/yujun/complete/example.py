import angle_calc
import numpy as np
import matplotlib.pyplot as plt
import json
import sys

sys.path.append('/Users/yujunwon/Project/dancify/ai/yujun/complete/')

with open("ai/yujun/complete/point_sample/sample.json", 'r') as f:
    json_data = json.load(f)

# 1. JSON에서 사용할 keypoint를 추출
keypoints = angle_calc.get_keypoints(json_data)

print(keypoints)
print(f"keypoints 리스트의 길이: {len(keypoints)}")
print('-' * 100)

# 2. 추출한 keypoint를 이용하여 골격의 arctan2를 계산
skeletons = angle_calc.calculate_skeleton_angles(keypoints)

print(skeletons)
print(f"skeletons 리스트의 길이: {len(skeletons)}")
print('-' * 100)

# 3. 추출한 keypoint를 이용하여 관절의 arctan2를 계산
joints = angle_calc.calculate_joint_angles(keypoints)

print(joints)
print(f"joints 리스트의 길이: {len(joints)}")
