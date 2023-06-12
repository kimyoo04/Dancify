from typing import Any, Dict, List

def get_keypoint_info(keypoint_list: Dict[str, Any], index: int) -> List[Any]:
    """
    주어진 sample에서 지정된 인덱스의 키포인트 정보를 가져옵니다.

    Args:
        sample (Dict[str, Any]): 키포인트 정보를 포함한 샘플 데이터
        index (int): 가져올 키포인트의 인덱스

    Returns:
        List[Any]: 키포인트 정보 [x, y, name]
    """
    y = keypoint_list['keypoints'][index]['y']
    x = keypoint_list['keypoints'][index]['x']
    name = keypoint_list['keypoints'][index]['name']
    return [x, y, name]


def get_keypoint_info_list(sample: List[Any]) -> List[Any]:
    """
    주어진 샘플에서 관절 정보를 추출하여 리스트로 반환합니다.

    Args:
        sample (List[Any]): 관절 정보를 포함하는 샘플

    Returns:
        List[Any]: 관절 정보가 포함된 리스트
    """
    keypoints = []
    for i in range(5, 17):
        keypoints.append(get_keypoint_info(sample[0], i))
    return keypoints