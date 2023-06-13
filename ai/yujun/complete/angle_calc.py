from typing import Any, Dict, List
import numpy as np
from typing import List, Dict, Any


def get_keypoints(keypoint_list: List[Dict[str, Any]], start_index: int = 5, end_index: int = 16) -> List[List[Any]]:
    """
    주어진 keypoint list에서 지정된 범위의 관절 정보를 추출하여 리스트로 반환합니다.

    Args:
        keypoint_list (List[Dict[str, Any]]): 관절 정보를 포함하는 샘플 리스트
        start_index (int): 추출할 관절 정보의 시작 인덱스 (기본값: 5)
        end_index (int): 추출할 관절 정보의 끝 인덱스 (기본값: 16)

    Returns:
        List[List[Any]]: 추출된 관절 정보가 포함된 리스트 [x: int, y: int, 'name': str]
    """
    kps = []

    for idx in range(len(keypoint_list)):
        nth_kp = []
        for i in range(start_index, end_index + 1):
            keypoint_info = keypoint_list[idx]['keypoints'][i]
            x = keypoint_info['x']
            y = keypoint_info['y']
            name = keypoint_info['name']
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
            # 왼쪽 어깨와 왼쪽 팔꿈치 점을 이은 선이 원점과 이루는 각도
            "left_upperarm": calculate_angle(kps[0][0], kps[0][1], kps[2][0], kps[2][1]),
            "right_upperarm": calculate_angle(kps[1][0], kps[1][1], kps[3][0], kps[3][1]),
            "left_forearm": calculate_angle(kps[2][0], kps[2][1], kps[4][0], kps[4][1]),
            "right_forearm": calculate_angle(kps[3][0], kps[3][1], kps[5][0], kps[5][1]),
            "left_waist": calculate_angle(kps[0][0], kps[0][1], kps[6][0], kps[6][1]),
            "right_waist": calculate_angle(kps[1][0], kps[1][1], kps[7][0], kps[7][1]),
            "left_thigh": calculate_angle(kps[6][0], kps[6][1], kps[8][0], kps[8][1]),
            "right_thigh": calculate_angle(kps[7][0], kps[7][1], kps[9][0], kps[9][1]),
            "left_calf": calculate_angle(kps[8][0], kps[8][1], kps[10][0], kps[10][1]),
            "right_calf": calculate_angle(kps[9][0], kps[9][1], kps[11][0], kps[11][1]),
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
            "frame_no": keypoint_list.index(kps)
        }
        joint_angle_list.append(nth_joint)

    return joint_angle_list
