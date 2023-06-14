from video_to_keypoint import *

script_dir = os.path.dirname(os.path.abspath(__file__))
print("Current path:", script_dir)

filepath = os.path.join(script_dir, 'spicy_karina.mp4')
folderpath = os.path.join(script_dir, 'test\\')
modelpath = os.path.join(script_dir, 'models\lightning_int8.tflite')

video_to_xy(filepath, folderpath, modelpath, 'test_data')