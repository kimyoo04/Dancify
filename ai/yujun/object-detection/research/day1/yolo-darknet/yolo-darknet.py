import cv2
import numpy as np
import time

# 사용할 영상 경로
video_path = "/Users/yujunwon/Desktop/before.mp4"
output_path = "/Users/yujunwon/Desktop/after.mp4"
min_confidence = 0.5


def detectAndDisplay(frame, video_writer):
    start_time = time.time()
    img = cv2.resize(frame, None, fx=0.8, fy=0.8)
    height, width, channels = img.shape

    # 창 크기 설정
    blob = cv2.dnn.blobFromImage(
        img, 0.00392, (416, 416), (0, 0, 0), True, crop=False)

    net.setInput(blob)
    outs = net.forward(output_layers)

    # 탐지한 객체의 클래스 예측
    class_ids = []
    confidences = []
    boxes = []

    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > min_confidence:
                # 탐지한 객체 박싱
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)

                x = int(center_x - w / 2)
                y = int(center_y - h / 2)

                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)

    indexes = cv2.dnn.NMSBoxes(boxes, confidences, min_confidence, 0.4)
    font = cv2.FONT_HERSHEY_DUPLEX
    for i in range(len(boxes)):
        if i in indexes:
            x, y, w, h = boxes[i]
            label = "{}: {:.2f}".format(
                classes[class_ids[i]], confidences[i]*100)
            color = colors[i]
            cv2.rectangle(img, (x, y), (x + w, y + h),  # type: ignore
                          color, 2)  # type: ignore
            cv2.putText(img, label, (x, y - 5), font, 1, color, 1)

    end_time = time.time()
    process_time = end_time - start_time
    print("=== A frame took {:.3f} seconds".format(process_time))
    cv2.imshow("YOLO test", img)

    # 영상 저장
    video_writer.write(img)


# yolo 포맷 및 클래스명 불러오기(.weights와 .cfg)
model_file = "/Users/yujunwon/Project/dancify/ai/yujun/object-detection/research/day1/yolo-darknet/yolov3.weights"
config_file = "/Users/yujunwon/Project/dancify/ai/yujun/object-detection/research/day1/yolo-darknet/yolov3.cfg"
net = cv2.dnn.readNet(model_file, config_file)

# 클래스 파일 오픈
classes = []
with open("/Users/yujunwon/Project/dancify/ai/yujun/object-detection/research/day1/yolo-darknet/coco.names", "r") as f:
    classes = [line.strip() for line in f.readlines()]

layer_names = net.getLayerNames()
output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]
colors = np.random.uniform(0, 255, size=(len(classes), 3))

# 비디오 활성화
cap = cv2.VideoCapture(video_path)
if not cap.isOpened:
    print('--(!)Error opening video capture')
    exit(0)

# 영상 저장 설정
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
fps = cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
video_writer = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

while True:
    ret, frame = cap.read()
    if frame is None:
        print('--(!) No captured frame -- Break!')
        break
    detectAndDisplay(frame, video_writer)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# 영상 저장 종료
video_writer.release()
cv2.destroyAllWindows()
