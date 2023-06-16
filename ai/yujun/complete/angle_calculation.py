from typing import List, Dict, Tuple, Any
import numpy as np
import json


# load_keypoints_from_json(file_path): JSON 파일의 경로를 입력받아, 해당 JSON에서 keypoint를 추출하여 리턴하는 함수
# ┗ get_keypoints(json_data): json_data에서 얼굴 부분을 제외한 keypoint 정보 추출하는 함수
# calculate_joint_angles(keypoint_list): 추출한 keypoint 간 벡터 방향(관절의 방향)을 고려하여 관절의 각도를 구하는 함수
# ┗ compute_vector_angle(p1, p2, p3): 추출한 keypoint의 세 점을 입력하여 세 점의 벡터 사이 끼인 각을 구하는 함수
# calculate_angle_difference(dancer_json_path, danceable_json_path): 댄서의 JSON 경로와 댄서블의 JSON 경로를 입력하여 두 JSON의 joint angle의 차를 구하는 함수

JOINT_LIST = ['left_pelvic_joint', 'right_pelvic_joint', 'left_shoulder_joint', 'right_shoulder_joint',
              'left_elbow_joint', 'right_elbow_joint', 'left_knee_joint', 'right_knee_joint']

FPS = 15

EIGHT_PART_LIST = ['left_pelvis', 'right_pelvis', 'left_upperarm', 'right_upperarm',
                   'left_forearm', 'right_forearm', 'left_leg', 'right_leg']


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
    # --------------------------------------------------------------------------------------
    # 1. JSON에서 keypoint를 추출
    def get_keypoints(json_data: List[Dict]):
        kps = []

        # index=1부터 끝까지 순회하며 JSON 원본 데이터의 5~16번째에 있는 keypoint의 x, y, "name" 추출
        for idx in range(len(json_data)):
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
    # --------------------------------------------------------------------------------------

    # 2. JSON 파일 경로 오류 또는 JSON 파일 포맷 오류에 대한 예외 처리
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"No file found at {file_path}")
        raise
    except json.JSONDecodeError:
        print(f"Error occurred while parsing the JSON file at {file_path}")
        raise

    # 3. get_keypoints 함수를 통해 JSON에서 keypoint를 추출하고 이를 리턴
    try:
        keypoints = get_keypoints(data)
    except Exception as e:
        print(f"Error occurred while extracting keypoints: {e}")
        raise
    return keypoints


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
    # --------------------------------------------------------------------------------------
    # 1. compute_vector_angle 함수를 중첩함수로 정의
    def compute_vector_angle(p1: np.ndarray, p2: np.ndarray, p3: np.ndarray) -> float:
        L1 = p2 - p1                        # p2에서 p1 방향으로의 벡터 생성
        L2 = p2 - p3                        # p2에서 p3 방향으로의 벡터 생성

        # 벡터 크기
        magnitude1 = np.linalg.norm(L1)
        magnitude2 = np.linalg.norm(L2)

        epsilon = 1e-7

        # 각도를 radian과 degree로 계산 (epsilon 추가하여 0으로 나누는 것을 방지)
        angle_deg = np.degrees(
            np.arccos(np.dot(L1, L2) / (magnitude1 * magnitude2 + epsilon)))

        return angle_deg
    # --------------------------------------------------------------------------------------

    # 2. keypoint_list의 형식이 맞지 않을 때에 대한 예외 처리
    if not all(len(kp) == 3 for frame in keypoint_list for kp in frame):
        raise ValueError(
            "Each keypoint should be a 2D coordinate[x, y] + keypoint(e.g. 'left_shoulder').")

    joint_angle_list = []
    frame_no = 0

    for kps in keypoint_list:
        # 3. keypoint를 담은 리스트에서 관절 생성에 사용할 keypoint에 대해 변수 할당
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

        # 4. 관절의 각도를 구하기 위해 벡터의 내적을 통해 사이 끼인 각을 구해 관절명에 할당
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


def calculate_average_difference(dancer_json_path: str, danceable_json_path: str) -> List[Dict[str, float]]:
    """
    댄서와 댄서블 키포인트 간의 평균 차이를 계산하고 사전을 생성합니다.

    Args:
        dancer_json_path (str): 댄서 키포인트가 포함된 JSON 파일의 경로.
        danceable_json_path (str): 댄서블 키포인트가 포함된 JSON 파일의 경로.

    Returns:
        List[Dict[str, float]]: 각 사전은 특정 시간 간격에 대한 댄서와 댄서블 키포인트 간의 평균 차이를 나타냅니다.
        각 사전에는 신체 부위 이름이 키로, 평균 차이 값이 float 값으로 포함됩니다.
        'sec' 키는 초 단위의 시간 간격을 나타냅니다.
    """
    # 1. load_keypoints_from_json 함수를 통해 JSON을 불러와 필요한 부분만 파싱
    try:
        dancer = load_keypoints_from_json(dancer_json_path)
        danceable = load_keypoints_from_json(danceable_json_path)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"Error occurred while loading keypoints: {e}")
        raise

    # 2. keypoints가 들은 리스트에서 관절 각도만 추출하여 딕셔너리 생성
    try:
        dancer_joint = calculate_joint_angles(dancer)
        danceable_joint = calculate_joint_angles(danceable)
    except Exception as e:
        print(f"Error occurred while calculating joint angles: {e}")
        raise

    # 3. 댄서와 댄서블의 관절 딕셔너리에서 대응되는 것을 추출하여 차를 구하고 리스트로 저장
    diff_list = []

    for dancer_joint_item, danceable_joint_item in zip(dancer_joint, danceable_joint):
        diff = [abs(dancer_joint_item[joint] - danceable_joint_item[joint])
                for joint in JOINT_LIST]
        diff_list.append(list(diff))

    if not diff_list:
        raise ValueError("The difference list is empty.")

    # 4. 차가 저장된 리스트에서 1초 단위로 추출하여 딕셔너리로 반환
    total_angle_diff_per_sec = []

    for i in range(FPS - 1, len(diff_list), FPS):
        group = diff_list[i - FPS + 1: i + 1]           # fps에 맞춰 초단위 그룹 생성
        group_average = [sum(col) / len(col)
                         for col in zip(*group)]        # 각 그룹마다 평균을 계산
        total_angle_diff_per_sec.append(group_average)

    angle_dict_list = [{**dict(zip(EIGHT_PART_LIST, angles)), 'sec': i}
                       for i, angles in enumerate(total_angle_diff_per_sec, start=1)]

    return angle_dict_list
