from typing import List, Dict, Any

def get_keypoint_information(keypoint_list: List[Dict[str, Any]], start_index: int = 5, end_index: int = 16) -> List[List[Any]]:
    """
    주어진 샘플에서 지정된 범위의 관절 정보를 추출하여 리스트로 반환합니다.

    Args:
        sample (List[Dict[str, Any]]): 관절 정보를 포함하는 샘플 리스트
        start_index (int): 추출할 관절 정보의 시작 인덱스 (기본값: 5)
        end_index (int): 추출할 관절 정보의 끝 인덱스 (기본값: 16)

    Returns:
        List[List[Any]]: 추출된 관절 정보가 포함된 리스트
    """
    keypoints = []
    for i in range(start_index, end_index + 1):
        keypoint_info = keypoint_list[0]['keypoints'][i]
        x = keypoint_info['x']
        y = keypoint_info['y']
        name = keypoint_info['name']
        keypoints.append([x, y, name])
    return keypoints




## Flow
# 1. sample에서 각도 계산에 필요한 keypoint만을 추출
# 2. 추출한 keypoint들을 리스트로 묶음
# -> 1과 2를 묶어 get_keypoint_information() 구현

# 3. keypoint를 연결하여 8개의 관절을 생성
# 4. 8개 관절의 각도를 계산하여 리스트 또는 튜플로 묶어 반환
# -> 일단 완료