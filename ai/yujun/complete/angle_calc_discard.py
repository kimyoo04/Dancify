from typing import Any, Dict, List
import numpy as np

"""
1. get_keypoints(keypoint_list): json_data에서 얼굴 부분을 제외한 keypoint 정보 추출
2. calculate_angle(x1, y1, x2, y2): get_keypoints()에서 받아온 keypoint들 사이의 arctan2() 값 추출
3. calculate_skeleton_angles(keypoint_list): get_keypoints()에서 추출한 keypoint를 기반으로 10개의 골격의 arctan2() 값 추출
4. calculate_joint_angles(keypoint_list): calculate_skeleton_angles()에서 추출한 골격을 기반으로 8개의 관절의 arctan2() 값 추출
"""


def get_keypoints(keypoint_list: List[Dict]) -> List[List[Any]]:
    """주어진 json_data에서 fps를 제외한 모든 keypoint 정보를 추출하여 반환합니다.

    Args:
        json_data (List[Dict]): json 데이터가 포함된 리스트입니다. 리스트의 첫 번째 요소는 fps 정보이며, 이후 요소들은 keypoint 정보가 포함된 딕셔너리입니다.
            각 keypoint는 다음과 같은 키를 포함하는 딕셔너리여야 합니다:
            - 'keypoints' (List[Dict]): keypoint의 세부 정보가 포함된 리스트입니다. 각 keypoint는 다음과 같은 키를 포함하는 딕셔너리여야 합니다:
                - 'x' (float): keypoint의 x 좌표입니다.
                - 'y' (float): keypoint의 y 좌표입니다.
                - 'name' (str): keypoint의 이름입니다.

    Returns:
        List[List[Any]]: 추출된 관절 정보가 포함된 리스트 [x: float, y: float, 'name': str]
    """
    kps = []
    for idx in range(1, len(keypoint_list)):
        nth_kp = []
        keypoint = keypoint_list[idx]

        for i in range(5, 17):
            keypoint_info = keypoint[0]['keypoints']
            x = keypoint_info[i]['x']
            y = keypoint_info[i]['y']
            name = keypoint_info[i]['name']
            nth_kp.append([x, y, name])
        kps.append(nth_kp)

    return kps


def calculate_angle(x1: float, y1: float, x2: float, y2: float) -> float:
    """
    두 점 사이의 각도를 계산합니다.
    Args:
        x1 (float): 첫 번째 점의 x 좌표
        y1 (float): 첫 번째 점의 y 좌표
        x2 (float): 두 번째 점의 x 좌표
        y2 (float): 두 번째 점의 y 좌표

    Returns:
        float: 두 점 사이의 각도 (라디안)

    """
    angle = np.arctan2(y2 - y1, x2 - x1)
    return angle


def calculate_skeleton_angles(keypoint_list: List[List[List[float]]]) -> List[Dict[str, Any]]:
    """
    주어진 키포인트 리스트에서 스켈레톤 각도를 계산합니다.

    Args:
        keypoint_list (List[List[List[float]]]): 키포인트 정보를 포함한 리스트

    Returns:
        List[Dict[str, Any]]: 스켈레톤 각도 정보를 담은 리스트
    """
    skeleton_angle_list = []

    for i, kps in enumerate(keypoint_list):
        nth_skeleton = {
            "left_upperarm": calculate_angle(kps[0][0], kps[0][1], kps[2][0], kps[2][1]) * 180 / np.pi,
            "right_upperarm": calculate_angle(kps[1][0], kps[1][1], kps[3][0], kps[3][1]) * 180 / np.pi,
            "left_forearm": calculate_angle(kps[2][0], kps[2][1], kps[4][0], kps[4][1]) * 180 / np.pi,
            "right_forearm": calculate_angle(kps[3][0], kps[3][1], kps[5][0], kps[5][1]) * 180 / np.pi,
            "left_waist": calculate_angle(kps[0][0], kps[0][1], kps[6][0], kps[6][1]) * 180 / np.pi,
            "right_waist": calculate_angle(kps[1][0], kps[1][1], kps[7][0], kps[7][1]) * 180 / np.pi,
            "left_thigh": calculate_angle(kps[6][0], kps[6][1], kps[8][0], kps[8][1]) * 180 / np.pi,
            "right_thigh": calculate_angle(kps[7][0], kps[7][1], kps[9][0], kps[9][1]) * 180 / np.pi,
            "left_calf": calculate_angle(kps[8][0], kps[8][1], kps[10][0], kps[10][1]) * 180 / np.pi,
            "right_calf": calculate_angle(kps[9][0], kps[9][1], kps[11][0], kps[11][1]) * 180 / np.pi,
            "frame_no": i
        }
        skeleton_angle_list.append(nth_skeleton)

    return skeleton_angle_list


def calculate_joint_angles(keypoint_list: List[List[List[float]]]) -> List[Dict[str, Any]]:
    """
    주어진 키포인트 리스트에서 관절 각도 정보를 생성합니다.

    Args:
        keypoint_list (List[List[List[float]]]): 키포인트 정보를 포함한 리스트

    Returns:
        List[Dict[str, Any]]: 관절 각도 정보를 담고 있는 리스트
    """
    joint_angle_list = []
    frame_no = 0

    for kps in keypoint_list:
        left_upperarm = calculate_angle(
            kps[0][0], kps[0][1], kps[2][0], kps[2][1])
        right_upperarm = calculate_angle(
            kps[1][0], kps[1][1], kps[3][0], kps[3][1])
        left_forearm = calculate_angle(
            kps[2][0], kps[2][1], kps[4][0], kps[4][1])
        right_forearm = calculate_angle(
            kps[3][0], kps[3][1], kps[5][0], kps[5][1])
        left_waist = calculate_angle(
            kps[0][0], kps[0][1], kps[6][0], kps[6][1])
        right_waist = calculate_angle(
            kps[1][0], kps[1][1], kps[7][0], kps[7][1])
        left_thigh = calculate_angle(
            kps[6][0], kps[6][1], kps[8][0], kps[8][1])
        right_thigh = calculate_angle(
            kps[7][0], kps[7][1], kps[9][0], kps[9][1])
        left_calf = calculate_angle(
            kps[8][0], kps[8][1], kps[10][0], kps[10][1])
        right_calf = calculate_angle(
            kps[9][0], kps[9][1], kps[11][0], kps[11][1])

        nth_joint = {
            "left_pelvic_joint": abs(left_waist - left_thigh) * 180 / np.pi,
            "right_pelvic_joint": abs(right_waist - right_thigh) * 180 / np.pi,
            "left_shoulder_joint": abs(left_upperarm - left_waist) * 180 / np.pi,
            "right_shoulder_joint": abs(right_upperarm - right_waist) * 180 / np.pi,
            "left_elbow_joint": abs(left_upperarm - left_forearm) * 180 / np.pi,
            "right_elbow_joint": abs(right_upperarm - right_forearm) * 180 / np.pi,
            "left_knee_joint": abs(left_thigh - left_calf) * 180 / np.pi,
            "right_knee_joint": abs(right_thigh - right_calf) * 180 / np.pi,
            "frame_no": frame_no
        }
        joint_angle_list.append(nth_joint)
        frame_no += 1

    return joint_angle_list
