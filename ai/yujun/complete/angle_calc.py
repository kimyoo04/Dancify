import numpy as np
import json

from typing import Any, Dict, List

# get_keypoints(json_data): json_data에서 얼굴 부분을 제외한 keypoint 정보 추출하는 함수
# compute_vector_angle(p1, p2, p3): 추출한 keypoint의 세 점을 입력하여 세 점의 벡터 사이 끼인 각을 구하는 함수
# calculate_joint_angles(keypoint_list): 추출한 keypoint 간 벡터 방향(관절의 방향)을 고려하여 관절의 각도를 구하는 함수


def get_keypoints(json_data: List[Dict]) -> List[List[Any]]:
    """
    주어진 json_data에서 fps를 제외한 모든 keypoint 정보를 추출하여 반환합니다.

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
    for idx in range(1, len(json_data)):
        nth_kp = []
        keypoint = json_data[idx]

        for i in range(5, 17):
            keypoint_info = keypoint[0]['keypoints']
            x = keypoint_info[i]['x']
            y = keypoint_info[i]['y']
            name = keypoint_info[i]['name']
            nth_kp.append([x, y, name])
        kps.append(nth_kp)

    return kps


def compute_vector_angle(p1: np.ndarray, p2: np.ndarray, p3: np.ndarray) -> float:
    """
    주어진 세 점 p1, p2, p3를 이용하여 벡터의 각도를 계산합니다.

    Args:
        p1 (numpy.ndarray): 첫 번째 점의 좌표 배열
        p2 (numpy.ndarray): 두 번째 점의 좌표 배열
        p3 (numpy.ndarray): 세 번째 점의 좌표 배열

    Returns:
        float: 계산된 각도를 도수(degree)로 변환하여 반환 (angle_deg)
    """
    # 벡터 생성
    L1 = p2 - p1                        # p2에서 p1 방향으로의 벡터
    L2 = p2 - p3                        # p2에서 p3 방향으로의 벡터

    # 벡터 크기
    magnitude1 = np.linalg.norm(L1)
    magnitude2 = np.linalg.norm(L2)

    # 벡터 내적
    dot_product = np.dot(L1, L2)

    # 각도를 radian과 degree로 계산
    angle_rad = np.arccos(dot_product / (magnitude1 * magnitude2))
    angle_deg = np.degrees(angle_rad)

    return angle_deg


def calculate_joint_angles(keypoint_list: List[List[List[float]]]) -> List[Dict[str, float]]:
    """
    주어진 키포인트 리스트를 이용하여 관절의 각도를 계산합니다.

    Args:
        keypoint_list (List[List[List[float]]]): 키포인트 리스트.
            각 키포인트는 좌표값 [x, y]로 이루어진 2차원 리스트입니다.

    Returns:
        List[Dict[str, float]]: 계산된 관절 각도 리스트.
            각 관절의 각도는 도수(degree)로 이루어진 float로 반환됩니다.
            관절 각도 정보와 프레임 번호를 담은 딕셔너리의 리스트 형태로 반환됩니다.
    """
    joint_angle_list = []
    frame_no = 0

    for kps in keypoint_list:
        p00, p01 = np.array([kps[0][0], kps[0][1]]), np.array(
            [kps[1][0], kps[1][1]])
        p02, p03 = np.array([kps[2][0], kps[2][1]]), np.array(
            [kps[3][0], kps[3][1]])
        p04, p05 = np.array([kps[4][0], kps[4][1]]), np.array(
            [kps[5][0], kps[5][1]])
        p06, p07 = np.array([kps[6][0], kps[6][1]]), np.array(
            [kps[7][0], kps[7][1]])
        p08, p09 = np.array([kps[8][0], kps[8][1]]), np.array(
            [kps[9][0], kps[9][1]])
        p10, p11 = np.array([kps[10][0], kps[10][1]]), np.array(
            [kps[11][0], kps[11][1]])

        nth_joint = {
            "left_pelvic_joint": compute_vector_angle(p00, p06, p08),
            "right_pelvic_joint": compute_vector_angle(p01, p07, p09),
            "left_shoulder_joint": compute_vector_angle(p02, p00, p06),
            "right_shoulder_joint": compute_vector_angle(p03, p01, p07),
            "left_elbow_joint": compute_vector_angle(p00, p02, p04),
            "right_elbow_joint": compute_vector_angle(p01, p03, p05),
            "left_knee_joint": compute_vector_angle(p06, p08, p10),
            "right_knee_joint": compute_vector_angle(p07, p09, p11),
            "frame_no": frame_no
        }
        joint_angle_list.append(nth_joint)
        frame_no += 1

    return joint_angle_list


def load_keypoints_from_json(file_path: str) -> List[Dict[str, Any]]:
    """
    주어진 파일 경로로부터 JSON 파일을 읽고, 키포인트 정보를 추출하여 리스트로 반환합니다.

    Args:
        file_path (str): JSON 파일의 경로

    Returns:
        List[Dict[str, Any]]: 키포인트 정보를 담고 있는 딕셔너리의 리스트
    """
    with open(file_path, 'r') as f:
        data = json.load(f)
        keypoints = get_keypoints(data)
    return keypoints                        # type: ignore


def calculate_angle_difference(dancer_json_path: str, danceable_json_path: str) -> List[List[float]]:
    """
    두 개의 JSON 파일로부터 키포인트 정보를 로드하여 관절 각도 차이를 계산합니다.

    Args:
        dancer_json_path (str): 춤추는 사람의 JSON 파일 경로
        danceable_json_path (str): 춤을 추는 사람의 JSON 파일 경로

    Returns:
        List[List[float]]: 관절 각도의 차이를 담고 있는 리스트
    """
    dancer = load_keypoints_from_json(dancer_json_path)
    danceable = load_keypoints_from_json(danceable_json_path)

    dancer_joint = calculate_joint_angles(dancer)           # type: ignore
    danceable_joint = calculate_joint_angles(danceable)     # type: ignore

    joint_list = ['left_pelvic_joint', 'right_pelvic_joint', 'left_shoulder_joint', 'right_shoulder_joint',
                  'left_elbow_joint', 'right_elbow_joint', 'left_knee_joint', 'right_knee_joint']

    diff_list = []

    for dancer_joint_item, danceable_joint_item in zip(dancer_joint, danceable_joint):
        diff = [abs(dancer_joint_item[joint] - danceable_joint_item[joint])
                for joint in joint_list]
        diff_list.append(list(diff))

    return diff_list
