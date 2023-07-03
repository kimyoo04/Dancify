import cv2
import mediapipe as mp
import os
import numpy as np
import uuid
from numpy import ndarray
from moviepy.editor import VideoFileClip, AudioFileClip
from typing import Optional


# 현재 스크립트의 절대 경로를 얻음
abs_path = os.path.abspath(__file__)

# 현재 스크립트의 디렉토리를 얻음
dir_name = os.path.dirname(abs_path)

# 작업 디렉토리를 현재 스크립트의 디렉토리로 설정
os.chdir(dir_name)


# 음성 추출 함수
def extract_audio(video_file: str, audio_file: str) -> bool:
    """
    비디오 파일에서 오디오를 추출합니다.

    매개변수:
        video_file (str): 오디오를 추출할 비디오 파일의 경로입니다.
        audio_file (str): 추출된 오디오를 저장할 파일의 경로입니다.

    반환값:
        bool: 오디오 추출이 성공적이면 True, 그렇지 않으면 False를 반환합니다.
    """
    try:
        video = VideoFileClip(video_file)
        audio = video.audio

        if audio is not None:
            audio.write_audiofile(audio_file)
            return True                     # 성공적으로 음성을 추출했음을 나타내기 위해 True 반환
        else:
            print("동영상에서 오디오를 추출할 수 없습니다.")
            return False                    # 오디오 추출 실패를 나타내기 위해 False 반환

    except Exception as e:
        print(f"음성 추출 중 오류 발생: {str(e)}")
        return False                        # 예외가 발생했음을 나타내기 위해 False 반환


# 음성 합성 함수
def merge_audio(video_file: str, audio_file: str, output_file: str) -> bool:
    """
    비디오와 오디오를 병합합니다.

    매개변수:
        video_file (str): 병합할 비디오 파일의 경로입니다.
        audio_file (str): 병합할 오디오 파일의 경로입니다.
        output_file (str): 병합된 파일을 저장할 경로입니다.

    반환값:
        bool: 병합이 성공적이면 True, 그렇지 않으면 False를 반환합니다.
    """
    try:
        video = VideoFileClip(video_file)
        audio = AudioFileClip(audio_file)

        # 영상의 길이에 맞게 음성을 자름
        audio = audio.subclip(0, video.duration)

        video = video.set_audio(audio)
        video.write_videofile(output_file, codec='libx264')
        return True                         # 합성이 성공적으로 완료됨을 나타내기 위해 True 반환

    except Exception as e:
        print(f"음성 합성 중 오류 발생: {str(e)}")
        return False                        # 예외가 발생했음을 나타내기 위해 False 반환


# mediapipe 기능 불러오기
mp_drawing = mp.solutions.drawing_utils     # type: ignore
mp_pose = mp.solutions.pose                 # type: ignore


# mediapipe pose estimation을 이용하여 11번, 12번 키포인트 추출
def calculate_keypoints(video_path: str) -> tuple:
    """
    mediapipe 포즈 추정을 사용하여 비디오에서 키포인트를 추출합니다.

    매개변수:
        video_path (str): 비디오 파일의 경로입니다.

    반환값:
        tuple: 총 프레임 수와 각 프레임의 키포인트가 들어있는 사전입니다.
    """
    try:
        cap = cv2.VideoCapture(video_path)

        total_frame_no = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        keypoints_dict = {}

        with mp_pose.Pose(min_detection_confidence=0.5,
                          min_tracking_confidence=0.5) as pose:
            frame_num = 0
            last_valid_keypoints = None
            while cap.isOpened():
                ret, frame = cap.read()

                if not ret:
                    break

                height, width, _ = frame.shape
                image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                image.flags.writeable = False
                results = pose.process(image)

                if results.pose_landmarks:
                    keypoints = results.pose_landmarks.landmark
                    keypoints_dict[frame_num] = [
                        (int(keypoints[11].x * width),
                         int(keypoints[11].y * height)),
                        (int(keypoints[12].x * width),
                         int(keypoints[12].y * height))]
                    last_valid_keypoints = keypoints_dict[frame_num]
                else:
                    keypoints_dict[frame_num] = last_valid_keypoints

                frame_num += 1

        cap.release()
        return total_frame_no, keypoints_dict

    except Exception as e:
        print(f"키포인트 추출 중 오류 발생: {str(e)}")
        return None, None


# 추출한 키포인트 딕셔너리에서 빈 곳이 있다면 보간법으로 채워넣어 영상 프레임 수와 일치시킴
def interpolate_keypoints(total_frame_no: int,
                          keypoints_dict: dict) -> Optional[dict]:
    """
    사전에 있는 키포인트를 보간합니다.

    매개변수:
        total_frame_no (int): 비디오의 총 프레임 수입니다.
        keypoints_dict (dict): 각 프레임의 키포인트가 들어있는 사전입니다.

    반환값:
        dict: 각 프레임의 보간된 키포인트가 들어있는 사전입니다.
    """
    try:
        for i in range(total_frame_no):
            if keypoints_dict[i] is not None:
                for j in range(i):
                    keypoints_dict[j] = keypoints_dict[i]
                break

        start_frame = None
        for i in range(total_frame_no):
            if keypoints_dict[i] is None:
                if start_frame is None:
                    start_frame = i - 1
            else:
                if start_frame is not None:
                    start = np.array(keypoints_dict[start_frame])
                    end = np.array(keypoints_dict[i])
                    for j in range(start_frame + 1, i):
                        temp = (j - start_frame) / (i - start_frame)
                        keypoints_dict[j] = tuple(
                            int(start + (end - start) * temp))  # type: ignore
                    start_frame = None

        for i in range(total_frame_no - 1, -1, -1):
            if keypoints_dict[i] is not None:
                for j in range(i + 1, total_frame_no):
                    keypoints_dict[j] = keypoints_dict[i]
                break

        return keypoints_dict

    except Exception as e:
        print(f"키포인트 보간 중 오류 발생: {str(e)}")
        return None


# 매끄러운 영상을 위해 이동 평균을 구해 적용
def calculate_moving_average(numbers: list,
                             window_size: int) -> Optional[list]:
    """
    이동 평균을 계산합니다.

    매개변수:
        numbers (list): 숫자들의 리스트입니다.
        window_size (int): 이동 창의 크기입니다.

    반환값:
        list: 이동 평균이 계산된 리스트입니다.
    """
    try:
        moving_averages = []
        for i in range(len(numbers)):
            if i < window_size - 1:
                window_sum = sum(numbers[:i + 1])
                moving_averages.append(int(window_sum / (i + 1)))
            else:
                window_sum = sum(numbers[i - window_size + 1:i + 1])
                moving_averages.append(int(window_sum / window_size))
        return moving_averages

    except Exception as e:
        print(f"이동 평균 계산 중 오류 발생: {str(e)}")
        return None


# 원본 영상을 pose estimation에 의해 구한 x_centers를 기준으로 crop
def crop_video(video_path: str, x_centers: ndarray, output_path: str) -> None:
    """
    주어진 비디오를 Pose Estimation으로 얻은 x_centers를 기준으로 자르고 저장합니다.

    매개변수:
        video_path (str): 입력 비디오 파일의 경로입니다.
        x_centers (list): 각 프레임의 중앙 x 좌표를 나타내는 리스트입니다.
        output_path (str): 자른 비디오를 저장할 파일의 경로입니다.
    """
    try:
        cap = cv2.VideoCapture(video_path)
        x_centers = np.array(x_centers)

        fourcc = cv2.VideoWriter_fourcc(*"avc1")
        out = cv2.VideoWriter(output_path, fourcc, 30.0,
                              (int(1080 * (9 / 16)), 1080))

        frame_no = 0
        while (cap.isOpened()):
            ret, frame = cap.read()
            if ret is True:
                H, W = frame.shape[:2]
                x_center = x_centers[frame_no]
                start_x = max(0, int(x_center - (1080 * (9 / 16)) // 2))
                end_x = min(W, int(x_center + (1080 * (9 / 16)) // 2))
                start_y = 0
                end_y = H
                cropped_frame = frame[start_y:end_y, start_x:end_x]
                resized_frame = cv2.resize(
                    cropped_frame, (int(1080 * (9 / 16)), 1080))
                out.write(resized_frame)
                frame_no += 1
            else:
                break

        cap.release()
        out.release()

    except Exception as e:
        print(f"영상 생성 중 오류 발생: {str(e)}")


# 결과 영상 생성
def generate_video(video_path: str, output_path: str) -> None:
    """
    주어진 비디오에서 키포인트를 추출하고, 이를 기준으로 비디오를 자르고,
    오디오를 추출한 후 최종적으로 비디오와 오디오를 병합하여 새로운 비디오를 생성합니다.

    매개변수:
        video_path (str): 입력 비디오 파일의 경로입니다.
        output_path (str): 생성된 비디오를 저장할 경로입니다.
    """
    try:
        # 폴더 경로
        audio_folder_path = "./audio_video"
        temp_folder_path = "./temp"

        # 폴더가 없다면 생성
        os.makedirs(audio_folder_path, exist_ok=True)
        os.makedirs(temp_folder_path, exist_ok=True)
        os.makedirs(output_path, exist_ok=True)

        # 고유한 식별자 생성
        keyword = str(uuid.uuid4())

        # 파일명 추출
        filename = os.path.splitext(os.path.basename(video_path))[0]

        audio_path = os.path.join(audio_folder_path, f"{keyword}.mp3")
        temp_path = os.path.join(temp_folder_path, f"{keyword}.mp4")
        final_output_path = os.path.join(output_path, f"{filename}.mp4")

        # 1. 음성 추출 및 저장
        if extract_audio(video_path, audio_path):
            print("음성 추출이 성공적으로 완료되었습니다.")
        else:
            print("음성 추출에 실패하였습니다.")
            return

        # 2. 키포인트 추출 & 영상 크롭
        total_frame_no, keypoints_dict = calculate_keypoints(video_path)
        if total_frame_no is None or keypoints_dict is None:
            print("키포인트 추출에 실패하였습니다.")
            return

        keypoints_dict = interpolate_keypoints(total_frame_no, keypoints_dict)
        if keypoints_dict is None:
            print("키포인트 보간에 실패하였습니다.")
            return

        x_centers = [
            ((keypoints_dict[idx][0][0] + keypoints_dict[idx][1][0]) // 2)
            for idx in range(len(keypoints_dict))
        ] if keypoints_dict is not None else None
        if x_centers is None:
            print("x_centers 계산에 실패하였습니다.")
            return

        x_centers_movavg = calculate_moving_average(x_centers, 30)
        if x_centers_movavg is None:
            print("이동 평균 계산에 실패하였습니다.")
            return

        x_centers_movavg = np.array(x_centers_movavg)  # list를 ndarray로 변환

        crop_video(video_path, x_centers_movavg, temp_path)

        # 3. 음성 합성
        if merge_audio(temp_path, audio_path, final_output_path):
            print("음성 합성이 성공적으로 완료되었습니다.")
        else:
            print("음성 합성에 실패하였습니다.")
            return

        # 4. 임시 파일 삭제
        os.remove(audio_path)
        os.remove(temp_path)

        print("Processing of video is complete.")

    except Exception as e:
        print(f"영상 생성 중 오류 발생: {str(e)}")
