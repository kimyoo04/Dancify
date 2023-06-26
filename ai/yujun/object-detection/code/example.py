import os
import shortform_generator
import sys
sys.path.append(
    "/Users/yujunwon/Project/dancify/ai/yujun/object-detection/code/")

# 현재 스크립트의 절대 경로를 얻음
abs_path = os.path.abspath(__file__)

# 현재 스크립트의 디렉토리를 얻음
dir_name = os.path.dirname(abs_path)

# 작업 디렉토리를 현재 스크립트의 디렉토리로 설정
os.chdir(dir_name)

# 사용 예시
shortform_generator.generate_video(
    video_path="ai/yujun/object-detection/code/audio_video/omg.mp4",
    output_path="ai/yujun/object-detection/code/result", keyword="omg")
