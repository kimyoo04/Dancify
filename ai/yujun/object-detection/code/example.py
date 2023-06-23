import audio_editing

audio_editing.extract_audio(
    "./original_videos/hypeboy.mp4", './audios/hypeboy.mp3')

# ---------------------------------------------------------------------------------
# 1. 신체 인식
# 2. 크롭
# ---------------------------------------------------------------------------------

audio_editing.merge_video_audio(
    "./detected_videos/hypeboy.mp4", "./audios/hypeboy.mp3", "./results/hypeboy.mp4")


# 아직 미완성
