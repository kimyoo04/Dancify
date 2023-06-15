import numpy as np
import json

from typing import Any, Dict, List

# get_keypoints(json_data): json_data에서 얼굴 부분을 제외한 keypoint 정보 추출하는 함수
# compute_vector_angle(p1, p2, p3): 추출한 keypoint의 세 점을 입력하여 세 점의 벡터 사이 끼인 각을 구하는 함수
# calculate_joint_angles(keypoint_list): 추출한 keypoint 간 벡터 방향(관절의 방향)을 고려하여 관절의 각도를 구하는 함수
# load_keypoints_from_json(file_path): JSON 파일의 경로를 입력받아, 해당 JSON에서 keypoint를 추출하여 리턴하는 함수
# calculate_angle_difference(dancer_json_path, danceable_json_path): 댄서의 JSON 경로와 댄서블의 JSON 경로를 입력하여 두 JSON의 joint angle의 차를 구하는 함수


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

    # index=1부터 끝까지 순회하며 JSON 원본 데이터의 5~16번째에 있는 keypoint의 x, y, "name" 추출
    for idx in range(1, len(json_data)):
        nth_kp = []
        keypoint = json_data[idx]

        for i in range(5, 17):
            keypoint_info = keypoint[0]["keypoints"]
            x = keypoint_info[i]['x']
            y = keypoint_info[i]['y']
            name = keypoint_info[i]["name"]
            nth_kp.append([x, y, name])
        kps.append(nth_kp)

    return kps


def compute_vector_angle(p1: np.ndarray, p2: np.ndarray, p3: np.ndarray) -> float:
    """
    주어진 세 점 p1, p2, p3를 이용하여 벡터의 각도를 계산합니다. 각 점은 2D 좌표를 가진 numpy.ndarray여야 합니다.

    Args:
        p1 (numpy.ndarray): 첫 번째 점의 2D 좌표 배열
        p2 (numpy.ndarray): 두 번째 점의 2D 좌표 배열
        p3 (numpy.ndarray): 세 번째 점의 2D 좌표 배열

    Returns:
        float: 계산된 각도를 도수(degree)로 변환하여 반환 (angle_deg)
    """
    L1 = p2 - p1                        # p2에서 p1 방향으로의 벡터 생성
    L2 = p2 - p3                        # p2에서 p3 방향으로의 벡터 생성

    # 벡터 크기
    magnitude1 = np.linalg.norm(L1)
    magnitude2 = np.linalg.norm(L2)

    # 각도를 radian과 degree로 계산
    angle_rad = np.arccos(np.dot(L1, L2) / (magnitude1 * magnitude2))
    angle_deg = np.degrees(angle_rad)

    return angle_deg


def calculate_joint_angles(keypoint_list: List[List[List[float]]]) -> List[Dict[str, float]]:
    """
    주어진 키포인트 리스트를 이용하여 관절의 각도를 계산합니다.

    Args:
        keypoint_list (List[List[List[float]]]): 키포인트 리스트.
            각 키포인트는 좌표값 [x, y]로 이루어진 2차원 리스트입니다.
            각 키포인트의 인덱스는 다음과 같은 부분을 나타냅니다:
            0: 왼쪽 어깨, 1: 오른쪽 어깨, 2: 왼쪽 팔꿈치, 3: 오른쪽 팔꿈치,
            4: 왼쪽 손목, 5: 오른쪽 손목, 6: 왼쪽 엉덩이, 7: 오른쪽 엉덩이,
            8: 왼쪽 무릎, 9: 오른쪽 무릎, 10: 왼쪽 발목, 11: 오른쪽 발목

    Returns:
        List[Dict[str, float]]: 계산된 관절 각도 리스트.
            각 관절의 각도는 도수(degree)로 이루어진 float로 반환됩니다.
            관절 각도 정보와 프레임 번호를 담은 딕셔너리의 리스트 형태로 반환됩니다.
            반환되는 딕셔너리의 각 키는 다음과 같은 관절을 나타냅니다:
            'left_pelvic_joint': 왼쪽 골반 관절, 'right_pelvic_joint': 오른쪽 골반 관절,
            'left_shoulder_joint': 왼쪽 어깨 관절, 'right_shoulder_joint': 오른쪽 어깨 관절,
            'left_elbow_joint': 왼쪽 팔꿈치 관절, 'right_elbow_joint': 오른쪽 팔꿈치 관절,
            'left_knee_joint': 왼쪽 무릎 관절, 'right_knee_joint': 오른쪽무릎 관절,
            'frame_no': 프레임 번호
    """
    # 1. keypoint_list의 형식이 맞지 않을 때에 대한 예외 처리
    if not all(len(kp) == 3 for frame in keypoint_list for kp in frame):
        raise ValueError(
            "Each keypoint should be a 2D coordinate[x, y] + keypoint(e.g. 'left_shoulder').")

    joint_angle_list = []
    frame_no = 0

    for kps in keypoint_list:
        # 2. keypoint를 담은 리스트에서 관절 생성에 사용할 keypoint에 대해 변수 할당
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

        # 3. 관절의 각도를 구하기 위해 벡터의 내적을 통해 사이 끼인 각을 구해 관절명에 할당
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


def load_keypoints_from_json(file_path: str) -> List[List[Any]]:
    """
    주어진 파일 경로로부터 JSON 파일을 읽고, 키포인트 정보를 추출하여 리스트로 반환합니다.

    Args:
        file_path (str): JSON 파일의 경로

    Returns:
        List[List[Any]]: 키포인트 정보를 담고 있는 딕셔너리의 리스트

    Raises:
        FileNotFoundError: 입력된 파일 경로가 존재하지 않을 때
        json.JSONDecodeError: JSON 파일의 구조나 내용이 예상과 다를 때
    """
    # 1. JSON 파일 경로 오류 또는 JSON 파일 포맷 오류에 대한 예외 처리
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"No file found at {file_path}")
        raise
    except json.JSONDecodeError:
        print(f"Error occurred while parsing the JSON file at {file_path}")
        raise

    # 2. get_keypoints()를 통해 JSON에서 keypoint를 추출하고 이를 리턴
    try:
        keypoints = get_keypoints(data)
    except Exception as e:
        print(f"Error occurred while extracting keypoints: {e}")
        raise

    return keypoints


def calculate_angle_difference(dancer_json_path: str, danceable_json_path: str) -> List[List[float]]:
    """
    두 개의 JSON 파일로부터 키포인트 정보를 로드하여 관절 각도 차이를 계산합니다.

    Args:
        dancer_json_path (str): 춤추는 사람의 JSON 파일 경로
        danceable_json_path (str): 춤을 추는 사람의 JSON 파일 경로

    Returns:
        List[List[float]]: 관절 각도의 차이를 담고 있는 리스트

    Raises:
        FileNotFoundError: 입력된 파일 경로가 존재하지 않을 때
        json.JSONDecodeError: JSON 파일의 구조나 내용이 예상과 다를 때
    """

    # 1. dancer의 JSON과 danceable의 JSON을 입력받아 파일 경로 오류 또는 JSON 포맷 오류에 대한 예외 처리
    try:
        dancer = load_keypoints_from_json(dancer_json_path)
        danceable = load_keypoints_from_json(danceable_json_path)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"Error occurred while loading keypoints: {e}")
        raise

    # 2. 이외에 발생할 수 있는 calculate_joint_angle 계산에서의 예외 처리
    #    (e.g. 두 벡터가 정반대 방향 또는 같은 방향 → 180도 또는 0도로 나옴을 이미 확인하여 문제 X)
    try:
        dancer_joint = calculate_joint_angles(dancer)
        danceable_joint = calculate_joint_angles(danceable)
    except Exception as e:
        print(f"Error occurred while calculating joint angles: {e}")
        raise

    # 3. dancer_joint와 danceable_joint 중 짧은 것에 맞춰 for문을 돌며 각도의 차이를 계산하여 diff_list로 리턴
    joint_list = ['left_pelvic_joint', 'right_pelvic_joint', 'left_shoulder_joint', 'right_shoulder_joint',
                  'left_elbow_joint', 'right_elbow_joint', 'left_knee_joint', 'right_knee_joint']

    diff_list = []

    for dancer_joint_item, danceable_joint_item in zip(dancer_joint, danceable_joint):
        diff = [abs(dancer_joint_item[joint] - danceable_joint_item[joint])
                for joint in joint_list]
        diff_list.append(list(diff))

    return diff_list


def average_angle_difference(dancer_json_path: str, danceable_json_path: str) -> List[float]:
    """
    두 JSON 파일의 키포인트 정보를 이용하여 각 관절 각도의 평균 차이를 계산합니다.

    Args:
        dancer_json_path (str): 댄서의 JSON 파일 경로
        danceable_json_path (str): 댄서블의 JSON 파일 경로

    Returns:
        List[float]: 각 관절 각도의 평균 차이를 담고 있는 리스트.
                     리스트의 각 요소는 다음의 관절을 나타냅니다:
                     0: 왼쪽 골반, 1: 오른쪽 골반, 2: 왼쪽 어깨, 3: 오른쪽 어깨,
                     4: 왼쪽 팔꿈치, 5: 오른쪽 팔꿈치, 6: 왼쪽 무릎, 7: 오른쪽 무릎

    Raises:
        ValueError: `difference` 리스트가 비어 있거나, `difference` 리스트의 길이가 0인 경우 발생
    """
    difference = calculate_angle_difference(
        dancer_json_path, danceable_json_path)

    # difference 리스트가 비어 있는지 확인
    if not difference:
        raise ValueError("The difference list is empty.")

    angle_sums = [0.0] * 8

    for diff in difference:
        for i in range(len(diff)):
            angle_sums[i] += diff[i]

    # difference 리스트의 길이가 0인지 확인 (0으로 나누는 오류 방지)
    if len(difference) == 0:
        raise ValueError("Cannot divide by zero.")

    angle_difference = [x / len(difference) for x in angle_sums]

    return angle_difference
