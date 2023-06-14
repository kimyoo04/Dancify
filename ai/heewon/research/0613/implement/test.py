from face_mosaic import *
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
print("Current path:", script_dir)

videopath = os.path.join(script_dir, 'test_data\spicy_karina.mp4')
savepath = os.path.join(script_dir, 'karina_result.mp4')
face_mosaic(videopath, savepath)

print("Done")