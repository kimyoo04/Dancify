# face_mosaic.py를 위해 작성된 파일입니다. 무시하셔도 됩니다.

import math
from typing import Tuple, Union

import cv2
import dataclasses
import numpy as np

from mediapipe.framework.formats import detection_pb2
from mediapipe.framework.formats import location_data_pb2

_PRESENCE_THRESHOLD = 0.5
_VISIBILITY_THRESHOLD = 0.5
_BGR_CHANNELS = 3

WHITE_COLOR = (224, 224, 224)
BLACK_COLOR = (0, 0, 0)
RED_COLOR = (0, 0, 255)
GREEN_COLOR = (0, 128, 0)
BLUE_COLOR = (255, 0, 0)


@dataclasses.dataclass
class DrawingSpec:
    # Color for drawing the annotation. Default to the white color.
    color: Tuple[int, int, int] = WHITE_COLOR
    # Thickness for drawing the annotation. Default to 2 pixels.
    thickness: int = 2
    # Circle radius. Default to 2 pixels.
    circle_radius: int = 2


def _normalized_to_pixel_coordinates(
        normalized_x: float, normalized_y: float, image_width: int,
        image_height: int) -> Union[None, Tuple[int, int]]:
    """Converts normalized value pair to pixel coordinates."""

    # Checks if the float value is between 0 and 1.
    def is_valid_normalized_value(value: float) -> bool:
        return (value > 0 or math.isclose(0, value)) and \
            (value < 1 or math.isclose(1, value))

    if not (is_valid_normalized_value(normalized_x)
            and is_valid_normalized_value(normalized_y)):
        # TODO: Draw coordinates even if it's outside of the image bounds.
        return None
    x_px = min(math.floor(normalized_x * image_width), image_width - 1)
    y_px = min(math.floor(normalized_y * image_height), image_height - 1)
    return x_px, y_px


def draw_detection(
        image: np.ndarray,
        detection: detection_pb2.Detection,
        bbox_drawing_spec: DrawingSpec = DrawingSpec()):

    if not detection.location_data:
        return

    if image.shape[2] != _BGR_CHANNELS:
        raise ValueError('Input image must contain three channel bgr data.')
    image_rows, image_cols, _ = image.shape

    location = detection.location_data
    if location.format != location_data_pb2.LocationData.RELATIVE_BOUNDING_BOX:
        raise ValueError(
            'LocationData must be relative for this drawing funtion to work.')

    # Draws bounding box if exists.
    if not location.HasField('relative_bounding_box'):
        return
    relative_bounding_box = location.relative_bounding_box

    # (x,y)
    rect_start_point = _normalized_to_pixel_coordinates(
        relative_bounding_box.xmin, relative_bounding_box.ymin, image_cols,
        image_rows)

    # (x+w,y+h)
    rect_end_point = _normalized_to_pixel_coordinates(
        relative_bounding_box.xmin + relative_bounding_box.width,
        relative_bounding_box.ymin + relative_bounding_box.height, image_cols,
        image_rows)

    # cv2.rectangle(image, rect_start_point, rect_end_point,
    #               bbox_drawing_spec.color, bbox_drawing_spec.thickness)

    try:
        if rect_start_point is None:
            x, y = 0, 0
        else:
            x = rect_start_point[0]
            y = rect_start_point[1]

        if rect_end_point is None:
            w, h = 0, 0
        else:
            w = rect_end_point[0] - x
            h = rect_end_point[1] - y

        mosaic = image[y: y + h, x: x + w]
        mosaic = cv2.resize(mosaic, dsize=(0, 0), fx=0.04, fy=0.04)
        mosaic = cv2.resize(mosaic, (w, h), interpolation=cv2.INTER_AREA)
        image[y: y + h, x: x + w] = mosaic

        return image

    except Exception:
        return image
