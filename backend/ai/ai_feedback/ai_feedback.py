from typing import List, Dict, Any
import numpy as np
import json

JOINT_LIST = ['left_pelvic_angle', 'right_pelvic_angle', 'left_shoulder_angle', 'right_shoulder_angle',
              'left_elbow_angle', 'right_elbow_angle', 'left_knee_angle', 'right_knee_angle']

EIGHT_PART_LIST = ['left_pelvis', 'right_pelvis', 'left_shoulder', 'right_shoulder',
                   'left_forearm', 'right_forearm', 'left_leg', 'right_leg']

FPS = 15
SCORE_THRESHOLD = 85


# JSON 파일의 경로를 입력받아, 해당 JSON에서 keypoint를 추출하여 반환
def get_keypoints_from_json(file_path: str) -> List[List[Any]]:
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

    # 2. JSON에서 keypoint를 추출하고 이를 리턴
    try:
        kps = []
        for idx in range(len(data)):
            nth_kp = []
            keypoint = data[idx]

            for i in range(5, 17):
                keypoint_info = keypoint[0]["keypoints"]
                x = keypoint_info[i]['x']
                y = keypoint_info[i]['y']
                name = keypoint_info[i]["name"]
                nth_kp.append([x, y, name])
            kps.append(nth_kp)
    except Exception as e:
        print(f"Error occurred while extracting keypoints: {e}")
        raise
    return kps


# 추출한 keypoint 간 벡터 방향(관절의 방향)을 고려하여 관절의 각도를 구하는 함수
def calculate_joint_angles(file_path: str) -> List[Dict[str, float]]:
    """
    주어진 파일 경로에서 키포인트를 추출하고, 이를 이용하여 관절의 각도를 계산합니다.

    Args:
        file_path (str): 키포인트가 저장된 JSON 파일의 경로.

    Returns:
        List[Dict[str, float]]: 계산된 관절 각도 리스트.
            각 관절의 각도는 도수(degree)로 이루어진 float로 반환됩니다.
            관절 각도 정보와 프레임 번호를 담은 딕셔너리의 리스트 형태로 반환됩니다.
            반환되는 딕셔너리의 각 키는 다음과 같은 관절을 나타냅니다:
            'left_pelvic_angle': 왼쪽 골반 관절, 'right_pelvic_angle': 오른쪽 골반 관절,
            'left_shoulder_angle': 왼쪽 어깨 관절, 'right_shoulder_angle': 오른쪽 어깨 관절,
            'left_elbow_angle': 왼쪽 팔꿈치 관절, 'right_elbow_angle': 오른쪽 팔꿈치 관절,
            'left_knee_angle': 왼쪽 무릎 관절, 'right_knee_angle': 오른쪽무릎 관절,
            'frame_no': 프레임 번호
    """
    # 세 점을 입력하여 세 점의 벡터 사이 끼인 각을 구하는 함수
    def compute_vector_angle(p1: np.ndarray, p2: np.ndarray, p3: np.ndarray) -> float:
        L1 = p2 - p1                        # p2에서 p1 방향으로의 벡터 생성
        L2 = p2 - p3                        # p2에서 p3 방향으로의 벡터 생성

        magnitude1 = np.linalg.norm(L1)
        magnitude2 = np.linalg.norm(L2)

        epsilon = 1e-7                      # epsilon을 추가하여 0으로 나눠지는 것을 방지

        # 각도를 degree로 계산
        angle_deg = np.degrees(
            np.arccos(np.dot(L1, L2) / (magnitude1 * magnitude2 + epsilon)))

        return angle_deg
    # 1. keypoint_list의 형식이 맞지 않을 때에 대한 예외 처리
    keypoint_list = get_keypoints_from_json(file_path)

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
            "left_pelvic_angle": compute_vector_angle(p00, p06, p08),
            "right_pelvic_angle": compute_vector_angle(p01, p07, p09),
            "left_shoulder_angle": compute_vector_angle(p02, p00, p06),
            "right_shoulder_angle": compute_vector_angle(p03, p01, p07),
            "left_elbow_angle": compute_vector_angle(p00, p02, p04),
            "right_elbow_angle": compute_vector_angle(p01, p03, p05),
            "left_knee_angle": compute_vector_angle(p06, p08, p10),
            "right_knee_angle": compute_vector_angle(p07, p09, p11),
            "frame_no": frame_no,
        }
        joint_angle_list.append(nth_joint)
        frame_no += 1

    return joint_angle_list


# calculate_joint_angles 함수의 결과를 입력으로 넣어 초 단위로 변환
def frame_to_sec(data: List[Dict], role: str = 'dancer') -> List[Dict[str, float]]:
    """
    주어진 관절 각도 데이터를 이용하여 초 단위로 평균 관절 각도를 계산합니다.

    Args:
        data (List[Dict]): 관절 각도 데이터. 각 딕셔너리는 특정 프레임에서의 관절 각도 정보를 담고 있습니다.
        role (str, optional): 관절 각도 데이터의 출처 역할. 기본값은 'dancer'입니다.

    Returns:
        List[Dict[str, float]]: 초 단위로 계산된 평균 관절 각도 리스트.
            각 딕셔너리는 특정 초에서의 평균 관절 각도 정보를 담고 있습니다.
            딕셔너리의 키는 'sec'와 'role_관절명'으로 구성되며, 'sec'는 초 단위 시간 정보,
            'role_관절명'은 해당 관절의 평균 각도 정보를 나타냅니다.
    """
    result = []
    frames = [data[i:i+FPS] for i in range(0, len(data), FPS)]  # 15프레임씩 분할

    for i, frame_set in enumerate(frames):
        avg_dict: Dict[str, float] = {'sec': i+1}  # 초 단위 시간 정보 추가
        for joint in ['left_pelvic_angle', 'right_pelvic_angle', 'left_shoulder_angle', 'right_shoulder_angle', 'left_elbow_angle', 'right_elbow_angle', 'left_knee_angle', 'right_knee_angle']:
            avg_dict[f'{role}_' + joint] = float(
                round(np.mean([frame[joint] for frame in frame_set]), 3))
        result.append(avg_dict)

    return result


# 댄서와 댄서블의 JSON에서 관절 각도차 계산하여 반환
def angle_difference_list(dancer_json_path: str, danceable_json_path: str) -> List[List[float]]:
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
    # 1. keypoints가 들은 리스트에서 관절 각도만 추출하여 딕셔너리 생성
    try:
        dancer_joint = calculate_joint_angles(dancer_json_path)
        danceable_joint = calculate_joint_angles(danceable_json_path)
    except Exception as e:
        print(f"Error occurred while calculating joint angles: {e}")
        raise

    # 2. 댄서와 댄서블의 관절 딕셔너리에서 대응되는 것을 추출하여 차를 구하고 리스트로 저장
    diff_list = []

    for dancer_joint_item, danceable_joint_item in zip(dancer_joint, danceable_joint):
        diff = [abs(dancer_joint_item[joint] - danceable_joint_item[joint])
                for joint in JOINT_LIST]
        diff_list.append(diff)

    if not diff_list:
        raise ValueError("The difference list is empty.")
    return diff_list


# 2D 리스트를 입력으로 넣어 0~100의 범위로 정규화
def angle_to_score(data_2d: List[List[float]], new_min: int = 0, new_max: int = 100) -> List[List[int]]:
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


# 댄서와 댄서블의 JSON 경로를 입력받아 두 JSON의 차를 구하고 초 단위로 묶어서 반환
def calculate_scores(dancer_json_path: str, danceable_json_path: str) -> List[Dict[str, int]]:
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
    difference = angle_difference_list(dancer_json_path, danceable_json_path)

    # 1. 0~180 범위의 각도차 리스트를 점수로 환산하기 위해 0~100의 범위로 정규화
    scaled_score = angle_to_score(difference)

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
        for part in ['pelvis', 'shoulder', 'forearm', 'leg']:
            angle_dict[part] = int((angles[EIGHT_PART_LIST.index(
                'left_'+part)] + angles[EIGHT_PART_LIST.index('right_'+part)]) / 2)
        angle_dict_list.append(angle_dict)

    return angle_dict_list


# calculate_scores의 결과를 입력으로 넣어 부위별 점수를 집계
def calculate_scores_by_body_part(data):
    """
    주어진 데이터에서 각 신체 부위별 점수를 계산합니다.

    Args:
        data (List[Dict[str, Union[int, float]]]): 각 신체 부위의 점수가 포함된 사전의 리스트입니다.
            각 사전에는 'sec' 키와 신체 부위 이름이 키로, 해당 신체 부위의 점수가 int 또는 float 값으로 포함되어 있습니다.
            예: [{'sec': 1, 'pelvis': 90, 'shoulder': 85, 'forearm': 95, 'leg': 90}, ...]

    Returns:
        Dict[str, List[Union[int, float]]] 또는 List[str]: 각 신체 부위별 점수 리스트를 포함하는 사전을 반환합니다.
            각 신체 부위 이름이 키로, 해당 신체 부위의 점수 리스트가 값으로 포함됩니다.
            예: {'pelvis': [90, 85, ...], 'shoulder': [85, 90, ...], 'forearm': [95, 90, ...], 'leg': [90, 85, ...]}
            데이터가 제공되지 않거나 오류가 발생한 경우, 오류 메시지를 포함하는 문자열 리스트를 반환합니다.

    Raises:
        ValueError: 신체 부위의 점수가 int 또는 float이 아닌 경우 발생합니다.
    """
    if not data:
        return ["Error: No data provided"]

    scores = {"pelvis": [], "shoulder": [], "forearm": [], "leg": []}

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

    return scores


# calculate_scores_by_body_part의 결과를 입력으로 넣어 부위별 평균 점수 도출
def get_average_scores(score_dict):
    """
    주어진 점수 사전에서 각 신체 부위의 평균 점수를 계산합니다.

    Args:
        scores (dict): 각 신체 부위의 점수 리스트를 값으로 가지는 사전입니다.
            예: {"pelvis": [90, 85, 88], "shoulder": [92, 89, 90], ...}

    Returns:
        dict: 각 신체 부위의 평균 점수를 값으로 가지는 사전입니다.
            예: {"pelvis_score": 87.67, "shoulder_score": 90.33, ...}

    Raises:
        ValueError: scores 사전이 비어있거나, 신체 부위의 점수 리스트가 비어있는 경우 발생합니다.
    """
    avg_score_dict = {}

    for body_part, scores in score_dict.items():
        if not scores:
            raise ValueError(f"No scores for {body_part}")
        score = round(sum(scores) / len(scores), 2)
        avg_score_dict[f"{body_part}_score"] = score

    return avg_score_dict


# calculate_scores_by_body_part의 결과를 입력으로 넣어 임계값 이하의 점수를 가진 시간 도출
def find_error_time(score_dict, threshold=SCORE_THRESHOLD):
    """
    주어진 점수 사전에서 임계값 이하의 점수를 가진 시간을 찾습니다.

    Args:
        score_dict (dict): 각 신체 부위의 점수를 값으로 가지는 사전입니다.
            예: {"pelvis": [87, 90, 92, ...], "shoulder": [88, 89, 91, ...], ...}
        threshold (int, optional): 임계값입니다. 이 값 이하의 점수를 가진 시간을 찾습니다.
            기본값은 SCORE_THRESHOLD입니다.

    Returns:
        dict: 각 신체 부위의 임계값 이하의 점수를 가진 시간을 값으로 가지는 사전입니다.
            예: {"pelvis_error_time": ["1~3", "5~7"], "shoulder_error_time": ["2~4"], ...}

    Raises:
        ValueError: score_dict가 사전이 아닌 경우 발생합니다.
    """
    if not score_dict:
        raise ValueError("No data provided")

    try:
        if not isinstance(score_dict, dict):
            raise ValueError("Invalid input data")
    except (IndexError, TypeError, ValueError):
        raise

    result = {}

    for body_part, scores in score_dict.items():
        scores = score_dict.get(body_part, [])
        low_score_indices = [i + 1 for i,
                             score in enumerate(scores) if score <= threshold]
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

            # 범위를 텍스트로 변환 (예: [(1, 3), (5, 7)] -> ["1~3", "5~7"])
            range_texts = []
            for start, end in ranges:
                if start == end:
                    range_texts.append(f"{start}")
                else:
                    range_texts.append(f"{start}~{end}")

            result[body_part + "_error_time"] = range_texts
        else:
            result[body_part + "_error_time"] = []

    return result


# get_average_scores의 결과를 입력으로 넣어 피드백 메세지 반환
def generate_messages(average_scores):
    """
    주어진 평균 점수 사전을 바탕으로 메시지를 생성합니다.

    Args:
        average_scores (dict): 각 신체 부위의 평균 점수를 값으로 가지는 사전입니다.
            예: {"pelvis_score": 87.67, "shoulder_score": 90.33, ...}

    Returns:
        list: 생성된 메시지의 리스트입니다. 각 메시지는 가장 높은 평균 점수를 가진 신체 부위와
              가장 낮은 평균 점수를 가진 신체 부위에 대한 정보를 포함합니다.

    Raises:
        ValueError: average_scores 사전이 비어있는 경우 발생합니다.
    """
    messages = []

    if not average_scores:
        raise ValueError("No average scores provided")

    best_part = max(average_scores, key=average_scores.__getitem__)
    worst_part = min(average_scores, key=average_scores.__getitem__)

    for body_part in [best_part, worst_part]:
        if body_part == best_part:
            if body_part == "pelvis_score":
                messages.append(f"골반이 가장 높은 평균 점수를 가졌습니다.")
            elif body_part == "upperarm_score":
                messages.append(f"어깨가 가장 높은 평균 점수를 가졌습니다.")
            elif body_part == "forearm_score":
                messages.append(f"팔이 가장 높은 평균 점수를 가졌습니다.")
            elif body_part == "leg_score":
                messages.append(f"다리가 가장 높은 평균 점수를 가졌습니다.")
        elif body_part == worst_part:
            if body_part == "pelvis_score":
                messages.append(f"골반이 가장 낮은 평균 점수를 가졌습니다.")
            elif body_part == "upperarm_score":
                messages.append(f"어깨가 가장 낮은 평균 점수를 가졌습니다.")
            elif body_part == "forearm_score":
                messages.append(f"팔이 가장 낮은 평균 점수를 가졌습니다.")
            elif body_part == "leg_score":
                messages.append(f"다리가 가장 낮은 평균 점수를 가졌습니다.")

    return messages


# 위의 함수를 종합하여 JSON으로 정리하여 반환
def create_json(dancer_json_path, danceable_json_path, message_feedback_score_threshold=SCORE_THRESHOLD):
    """
    댄서와 댄서블의 JSON 파일 경로를 입력받아, 두 JSON 파일의 각도 차이를 계산하고,
    이를 바탕으로 점수를 계산하여 JSON 형태로 반환합니다.

    Args:
        dancer_json_path (str): 댄서의 JSON 파일 경로입니다.
        danceable_json_path (str): 댄서블의 JSON 파일 경로입니다.
        message_feedback_score_threshold (int, optional): 메시지 피드백 점수 임계값입니다.
            이 값 이하의 점수를 가진 경우 메시지 피드백을 생성합니다. 기본값은 SCORE_THRESHOLD(=85)입니다.

    Returns:
        dict: 계산된 점수와 메시지 피드백을 포함하는 사전입니다.
            'data' 키는 각 초마다의 점수를 포함하는 사전의 리스트입니다.
            'error' 키는 각 신체 부위별 점수가 임계값 이하인 시간을 포함하는 사전입니다.
            'avg_score' 키는 각 신체 부위별 평균 점수를 포함하는 사전입니다.
            'message' 키는 메시지 피드백을 포함하는 문자열 리스트입니다.
    """
    # 1. 각도 관련 함수
    dancer_angle = calculate_joint_angles(dancer_json_path)
    danceable_angle = calculate_joint_angles(danceable_json_path)

    dancer_angle_sec = frame_to_sec(dancer_angle, 'dancer')
    danceable_angle_sec = frame_to_sec(danceable_angle, 'danceable')

    # 2. 점수 관련 함수
    data = calculate_scores(dancer_json_path, danceable_json_path)

    scores = calculate_scores_by_body_part(data)

    avg_score_dict = get_average_scores(scores)
    message = generate_messages(avg_score_dict)
    error_time = find_error_time(scores, message_feedback_score_threshold)

    new_data = []
    for d in data:
        sec_data = {
            "sec": d["sec"],
            "pelvis": {
                "score": d["pelvis"],
                "dancer_left_pelvic_angle": dancer_angle_sec[d["sec"] - 1]["dancer_left_pelvic_angle"],
                "dancer_right_pelvic_angle": dancer_angle_sec[d["sec"] - 1]["dancer_right_pelvic_angle"],
                "danceable_left_pelvic_angle": danceable_angle_sec[d["sec"] - 1]["danceable_left_pelvic_angle"],
                "danceable_right_pelvic_angle": danceable_angle_sec[d["sec"] - 1]["danceable_right_pelvic_angle"]
            },
            "shoulder": {
                "score": d["shoulder"],
                "dancer_left_shoulder_angle": dancer_angle_sec[d["sec"] - 1]["dancer_left_shoulder_angle"],
                "dancer_right_shoulder_angle": dancer_angle_sec[d["sec"] - 1]["dancer_right_shoulder_angle"],
                "danceable_left_shoulder_angle": danceable_angle_sec[d["sec"] - 1]["danceable_left_shoulder_angle"],
                "danceable_right_shoulder_angle": danceable_angle_sec[d["sec"] - 1]["danceable_right_shoulder_angle"]
            },
            "forearm": {
                "score": d["forearm"],
                "dancer_left_elbow_angle": dancer_angle_sec[d["sec"] - 1]["dancer_left_elbow_angle"],
                "dancer_right_elbow_angle": dancer_angle_sec[d["sec"] - 1]["dancer_right_elbow_angle"],
                "danceable_left_elbow_angle": danceable_angle_sec[d["sec"] - 1]["danceable_left_elbow_angle"],
                "danceable_right_elbow_angle": danceable_angle_sec[d["sec"] - 1]["danceable_right_elbow_angle"]
            },
            "leg": {
                "score": d["leg"],
                "dancer_left_knee_angle": dancer_angle_sec[d["sec"] - 1]["dancer_left_knee_angle"],
                "dancer_right_knee_angle": dancer_angle_sec[d["sec"] - 1]["dancer_right_knee_angle"],
                "danceable_left_knee_angle": danceable_angle_sec[d["sec"] - 1]["danceable_left_knee_angle"],
                "danceable_right_knee_angle": danceable_angle_sec[d["sec"] - 1]["danceable_right_knee_angle"]
            }
        }
        new_data.append(sec_data)

    json_data = {
        "data": new_data,
        "error": error_time,
        "avg_score": avg_score_dict,
        "message": message
    }

    return json_data
