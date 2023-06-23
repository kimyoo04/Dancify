from moviepy.editor import VideoFileClip, AudioFileClip


def extract_audio(video_file, audio_file):
    video = VideoFileClip(video_file)
    audio = video.audio
    audio.write_audiofile(audio_file)


def merge_video_audio(video_file, audio_file, output_file):
    video = VideoFileClip(video_file)
    audio = AudioFileClip(audio_file)

    # Make sure the audio is long enough for the video
    audio = audio.subclip(0, video.duration)

    video = video.set_audio(audio)
    video.write_videofile(output_file, codec='libx264')
