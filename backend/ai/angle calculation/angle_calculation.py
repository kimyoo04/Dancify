from typing import List, Dict, Union, Any
import numpy as np
import json

JOINT_LIST = ['left_pelvic_joint', 'right_pelvic_joint', 'left_shoulder_joint', 'right_shoulder_joint',
              'left_elbow_joint', 'right_elbow_joint', 'left_knee_joint', 'right_knee_joint']

FPS = 15

EIGHT_PART_LIST = ['left_pelvis', 'right_pelvis', 'left_upperarm', 'right_upperarm',
                   'left_forearm', 'right_forearm', 'left_leg', 'right_leg']


# get_keypoints(json_data): JSON 포맷에서 얼굴 부분을 제외한 keypoint 정보 추출하는 함수
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


# load_keypoints_from_json(file_path): JSON 파일의 경로를 입력받아, 해당 JSON에서 keypoint를 추출하여 리턴하는 함수
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

    # 2. get_keypoints 함수를 통해 JSON에서 keypoint를 추출하고 이를 리턴
    try:
        keypoints = get_keypoints(data)
    except Exception as e:
        print(f"Error occurred while extracting keypoints: {e}")
        raise
    return keypoints


# compute_vector_angle(p1, p2, p3): 세 점을 입력하여 세 점의 벡터 사이 끼인 각을 구하는 함수
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


# calculate_joint_angles(keypoint_list): 추출한 keypoint 간 벡터 방향(관절의 방향)을 고려하여 관절의 각도를 구하는 함수
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


# normalize_data(data_2d): 2D 리스트를 입력으로 넣어 0~100의 범위로 정규화
def normalize_data(data_2d: List[List[float]], new_min: int = 0, new_max: int = 100) -> List[List[int]]:
    """
    임의의 범위를 갖는 2차원 리스트를 0부터 100 사이의 범위로 정규화합니다.

    Args:
        data_2d (List[List[int]]): 정규화할 2차원 리스트 데이터입니다.
        new_min (int, optional): 정규화할 새로운 범위의 최솟값입니다. 기본값은 0입니다.
        new_max (int, optional): 정규화할 새로운 범위의 최댓값입니다. 기본값은 100입니다.

    Returns:
        List[List[int]]: 지정된 범위로 정규화된 데이터입니다.

    """
    old_min = 0
    old_max = 180

    normalized_data = [[100 - int(new_min + ((x - old_min) * (new_max - new_min)) / (
        old_max - old_min)) for x in sublist] for sublist in data_2d]

    return normalized_data


# make_angle_diff_list(dancer_json_path, danceable_json_path): 댄서와 댄서블의 JSON에서 관절 각도차 계산하여 반환
def make_angle_diff_list(dancer_json_path: str, danceable_json_path: str) -> List[List[float]]:
    """
    주어진 댄서와 댄서블의 JSON 파일에서 관절 각도 차이를 계산하여 리스트로 반환합니다.

    Args:
        dancer_json_path (str): 댄서의 JSON 파일 경로입니다.
        danceable_json_path (str): 댄서블의 JSON 파일 경로입니다.

    Returns:
        List[List[float]]: 관절 각도 차이가 저장된 리스트입니다. 각 요소는 리스트 형태이며,
                           관절별 각도 차이 값을 포함합니다.

    Raises:
        FileNotFoundError: JSON 파일을 찾을 수 없는 경우 발생합니다.
        json.JSONDecodeError: JSON 파일을 파싱하는 동안 오류가 발생한 경우 발생합니다.
        ValueError: 계산된 관절 각도 차이 리스트가 비어있는 경우 발생합니다.

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
        diff_list.append(diff)

    if not diff_list:
        raise ValueError("The difference list is empty.")
    return diff_list


# calculate_score(dancer_json_path, danceable_json_path): 댄서와 댄서블의 JSON 경로를 입력받아 두 JSON의 차를 구하고, 초 단위로 묶어서 반환하는 함수
def calculate_score(dancer_json_path: str, danceable_json_path: str) -> List[Dict[str, int]]:
    """
    댄서와 댄서블 키포인트 간의 평균 차이를 계산하고 사전을 생성합니다.

    Args:
        dancer_json_path (str): 댄서 키포인트가 포함된 JSON 파일의 경로.
        danceable_json_path (str): 댄서블 키포인트가 포함된 JSON 파일의 경로.

    Returns:
        List[Dict[str, float]]: 각 사전은 특정 시간 간격에 대한 댄서와 댄서블 키포인트 간의 차를 점수로 환산하여 나타냅니다.
        각 사전에는 신체 부위 이름이 키로, 점수가 int 값으로 포함됩니다.
        'sec' 키는 초 단위의 시간 간격을 나타냅니다.
    """
    difference = make_angle_diff_list(dancer_json_path, danceable_json_path)

    # 1. 0~180 범위의 각도차 리스트를 점수로 환산하기 위해 0~100의 범위로 정규화
    scaled_score = normalize_data(difference)

    # 2. 차가 저장된 리스트에서 1초 단위로 추출하여 딕셔너리로 만들어 리스트로 반환
    total_angle_diff_per_sec = []

    for i in range(FPS - 1, len(scaled_score), FPS):
        group = scaled_score[i - FPS + 1: i + 1]           # fps에 맞춰 초단위 그룹 생성
        group_average = [int(sum(col) / len(col))
                         for col in zip(*group)]           # 각 그룹마다 평균을 계산
        total_angle_diff_per_sec.append(group_average)

    # 3. total_angle_diff_per_sec의 리스트에서 초, 팔, 다리, 어깨, 골반 순으로 리스트 만들어 반환
    angle_dict_list = []
    for i, angles in enumerate(total_angle_diff_per_sec, start=1):
        angle_dict = {'sec': i}
        for part in ['forearm', 'leg', 'upperarm', 'pelvis']:
            angle_dict[part] = int((angles[EIGHT_PART_LIST.index(
                'left_'+part)] + angles[EIGHT_PART_LIST.index('right_'+part)]) / 2)
        angle_dict_list.append(angle_dict)

    return angle_dict_list


# analyze_scores(data):
def analyze_scores(data: List[Dict[str, int]]) -> List[Union[Dict[str, List[int]], str]]:
    """
    주어진 데이터를 분석하여 각 부위별 평균 점수, 최대/최소 평균 점수를 가진 부위,
    그리고 각 부위의 초당 점수를 딕셔너리 형태로 반환합니다.

    Parameters:
    data (List[Dict[str, Union[str, int]]]): 각 초마다 각 부위의 점수를 담고 있는 리스트

    Returns:
    List[Union[Dict[str, List[int]], str]]: 각 부위의 초당 점수를 담은 딕셔너리와
    평균 점수, 최대/최소 평균 점수를 가진 부위에 대한 정보를 담은 문자열 리스트
    """
    if not data:
        return ["Error: No data provided"]

    scores = {"forearm": [], "leg": [], "upperarm": [], "pelvis": []}

    try:
        for entry in data:
            for body_part, score in entry.items():
                if body_part != "sec":
                    if not isinstance(score, (int, float)):
                        raise ValueError(
                            f"Error: Invalid score {score} for {body_part}")
                    scores[body_part].append(score)
    except KeyError as e:
        return [f"Error: Missing key {e} in data entry"]

    average_scores = {body_part: sum(scores) / len(scores)
                      for body_part, scores in scores.items()}

    best_part = max(average_scores, key=average_scores.__getitem__)
    worst_part = min(average_scores, key=average_scores.__getitem__)

    name_translation = {"forearm": "팔", "leg": "다리",
                        "upperarm": "어깨", "pelvis": "골반"}

    result = []

    score_per_second = {
        name_translation[body_part]: scores for body_part, scores in scores.items()}
    result.append(score_per_second)

    for body_part, scores in scores.items():
        result.append(
            f"{name_translation[body_part]}의 평균 점수: {average_scores[body_part]:.2f}점")

    for body_part in [best_part, worst_part]:
        if body_part == best_part:
            if name_translation[body_part] == "골반" or name_translation[body_part] == "팔":
                result.append(
                    f"{name_translation[body_part]}이 가장 높은 평균 점수를 가졌습니다.")
            else:
                result.append(
                    f"{name_translation[body_part]}가 가장 높은 평균 점수를 가졌습니다.")
        elif body_part == worst_part:
            if name_translation[body_part] == "골반" or name_translation[body_part] == "팔":
                result.append(
                    f"{name_translation[body_part]}이 가장 낮은 평균 점수를 가졌습니다.")
            else:
                result.append(
                    f"{name_translation[body_part]}가 가장 낮은 평균 점수를 가졌습니다.")

    return result


def analyze_detail_scores(input_list: List[Union[Dict[str, List[int]], str]]) -> List[str]:
    """
    주어진 데이터를 분석하여 각 부위별로 점수가 85점 이하로 내려가는 부분을 텍스트로 만들고,
    그 외의 정보는 그대로 반환합니다.

    Parameters:
        input_list (List[Union[Dict[str, List[int]], str]]): 각 부위의 초당 점수를 담은 딕셔너리와
        평균 점수, 최대/최소 평균 점수를 가진 부위에 대한 정보를 담은 문자열 리스트

    Returns:
        List[str]: 각 부위별로 점수가 85점 이하로 내려가는 부분을 텍스트로 만든 리스트와
        그 외의 정보를 담은 문자열 리스트
    """
    if not input_list:
        return ["Error: No data provided"]

    # 1. 딕셔너리를 분리
    try:
        score_dict = input_list[0]
        if not isinstance(score_dict, dict):
            raise ValueError
    except (IndexError, TypeError, ValueError):
        return ["Error: Invalid input data"]

    result = []

    # 2. 각 부위별로 점수가 85점 이하로 내려가는 부분을 찾음
    for body_part, scores in score_dict.items():
        low_score_indices = [i + 1 for i,
                             score in enumerate(scores) if score <= 85]
        if low_score_indices:
            # 연속된 숫자를 범위로 변환 (예: [1, 2, 3, 5, 6, 7] -> [(1, 3), (5, 7)])
            ranges = []
            start = end = low_score_indices[0]
            for i in low_score_indices[1:]:
                if i == end + 1:
                    end = i
                else:
                    ranges.append((start, end))
                    start = end = i
            ranges.append((start, end))

            # 범위를 텍스트로 변환 (예: [(1, 3), (5, 7)] -> "1~3초, 5~7초")
            range_texts = []
            for start, end in ranges:
                if start == end:
                    range_texts.append(f"{start}초")
                else:
                    range_texts.append(f"{start}~{end}초")
            range_text = ", ".join(range_texts)

            result.append(f"{body_part} 동작의 오류가 높은 지점: {range_text}")

    # 3. 나머지 텍스트를 결과에 추가
    result.extend(input_list[1:])

    return result
