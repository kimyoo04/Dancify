// import * as tf from "@tensorflow/tfjs";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { Keypoint } from "@type/moveNet";

const model = poseDetection.SupportedModels.MoveNet;

const color = "aqua";
// const boundingBoxColor = "red";
const lineWidth = 2;

// export const tryResNetButtonName = "tryResNetButton";
// export const tryResNetButtonText = "[New] Try ResNet50";
// const tryResNetButtonTextCss = "width:100%;text-decoration:underline;";
// const tryResNetButtonBackgroundCss = "background:#e61d5f;";

function isAndroid(): boolean {
  return /Android/i.test(navigator.userAgent);
}

function isiOS(): boolean {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function isMobile(): boolean {
  return isAndroid() || isiOS();
}

// function setDatGuiPropertyCss(
//   propertyText: string,
//   liCssString: string,
//   spanCssString = ""
// ): void {
//   const spans = document.getElementsByClassName("property-name");
//   for (let i = 0; i < spans.length; i++) {
//     const text = spans[i].textContent || spans[i].innerText;
//     if (text === propertyText) {
//       spans[i].parentNode.parentNode.style = liCssString;
//       if (spanCssString !== "") {
//         spans[i].style = spanCssString;
//       }
//     }
//   }
// }

// export function updateTryResNetButtonDatGuiCss(): void {
//   setDatGuiPropertyCss(
//     tryResNetButtonText,
//     tryResNetButtonBackgroundCss,
//     tryResNetButtonTextCss
//   );
// }

/**
 * Toggles between the loading UI and the main canvas UI.
 */
// export function toggleLoadingUI(
//   showLoadingUI: boolean,
//   loadingDivId = "loading",
//   mainDivId = "main"
// ): void {
//   if (showLoadingUI) {
//     document.getElementById(loadingDivId)!.style.display = "block";
//     document.getElementById(mainDivId)!.style.display = "none";
//   } else {
//     document.getElementById(loadingDivId)!.style.display = "none";
//     document.getElementById(mainDivId)!.style.display = "block";
//   }
// }

// function toTuple({ y, x }: { y: number; x: number }): [number, number] {
//   return [y, x];
// }

export function drawPoint(
  ctx: CanvasRenderingContext2D,
  y: number,
  x: number,
  r: number,
  color: string
): void {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

/**
 * Draws a line on a canvas, i.e. a joint
 */
export function drawSegment(
  [ay, ax]: [number, number],
  [by, bx]: [number, number],
  color: string,
  scale: number,
  ctx: CanvasRenderingContext2D
): void {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
export function drawSkeleton(
  keypoints: poseDetection.Keypoint[],
  minConfidence: number,
  ctx: CanvasRenderingContext2D
): void {
  ctx.fillStyle = "White";
  ctx.strokeStyle = "White";
  ctx.lineWidth = 2;
  poseDetection.util.getAdjacentPairs(model).forEach(([i, j]) => {
    const kp1 = keypoints[i];
    const kp2 = keypoints[j];
    const score1 = kp1.score != null ? kp1.score : 1;
    const score2 = kp2.score != null ? kp2.score : 1;
    const scoreThreshold = minConfidence || 0;
    if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
      ctx.beginPath();
      ctx.moveTo(kp1.x, kp1.y);
      ctx.lineTo(kp2.x, kp2.y);
      ctx.stroke();
    }
  });
}
/**
 * Draw pose keypoints onto a canvas
 */
export function drawKeypoints(
  keypoints: Keypoint[],
  minConfidence: number,
  ctx: CanvasRenderingContext2D,
  scale = 1
) {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];

    if (keypoint.score < minConfidence) {
      continue;
    }

    drawPoint(ctx, keypoint.y * scale, keypoint.x * scale, 3, color);
  }
}

/**
 * Draw the bounding box of a pose. For example, for a whole person standing
 * in an image, the bounding box will begin at the nose and extend to one of
 * ankles
 */
// export function drawBoundingBox(
//   keypoints: any[],
//   ctx: CanvasRenderingContext2D
// ) {
//   const boundingBox = posenet.getBoundingBox(keypoints);

//   ctx.rect(
//     boundingBox.minX,
//     boundingBox.minY,
//     boundingBox.maxX - boundingBox.minX,
//     boundingBox.maxY - boundingBox.minY
//   );

//   ctx.strokeStyle = boundingBoxColor;
//   ctx.stroke();
// }

/**
 * Converts an array of pixel data into an ImageData object
 */
// export async function renderToCanvas(a: any, ctx: CanvasRenderingContext2D) {
//   const [height, width] = a.shape;
//   const imageData = new ImageData(width, height);

//   const data = await a.data();

//   for (let i = 0; i < height * width; ++i) {
//     const j = i * 4;
//     const k = i * 3;

//     imageData.data[j + 0] = data[k + 0];
//     imageData.data[j + 1] = data[k + 1];
//     imageData.data[j + 2] = data[k + 2];
//     imageData.data[j + 3] = 255;
//   }

//   ctx.putImageData(imageData, 0, 0);
// }

/**
 * Draw an image on a canvas
 */
// export function renderImageToCanvas(
//   image: HTMLImageElement,
//   size: [number, number],
//   canvas: HTMLCanvasElement
// ) {
//   canvas.width = size[0];
//   canvas.height = size[1];
//   const ctx = canvas.getContext("2d");

//   ctx.drawImage(image, 0, 0);
// }

/**
 * Draw heatmap values, one of the model outputs, on to the canvas
 * Read our blog post for a description of PoseNet's heatmap outputs
 * https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5
 */
// export function drawHeatMapValues(
//   heatMapValues: any,
//   outputStride: number,
//   canvas: HTMLCanvasElement
// ) {
//   const ctx = canvas.getContext("2d");
//   const radius = 5;
//   const scaledValues = heatMapValues.mul(tf.scalar(outputStride, "int32"));

//   drawPoints(ctx, scaledValues, radius, color);
// }

/**
 * Used by the drawHeatMapValues method to draw heatmap points on to
 * the canvas
 */
// function drawPoints(
//   ctx: CanvasRenderingContext2D,
//   points: any,
//   radius: number,
//   color: string
// ) {
//   const data = points.buffer().values;

//   for (let i = 0; i < data.length; i += 2) {
//     const pointY = data[i];
//     const pointX = data[i + 1];

//     if (pointX !== 0 && pointY !== 0) {
//       ctx.beginPath();
//       ctx.arc(pointX, pointY, radius, 0, 2 * Math.PI);
//       ctx.fillStyle = color;
//       ctx.fill();
//     }
//   }
// }

/**
 * Draw offset vector values, one of the model outputs, on to the canvas
 * Read our blog post for a description of PoseNet's offset vector outputs
 * https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5
 */
// export function drawOffsetVectors(
//     heatMapValues, offsets, outputStride, scale = 1, ctx) {
//   const offsetPoints =
//       posenet.singlePose.getOffsetPoints(heatMapValues, outputStride, offsets);

//   const heatmapData = heatMapValues.buffer().values;
//   const offsetPointsData = offsetPoints.buffer().values;

//   for (let i = 0; i < heatmapData.length; i += 2) {
//     const heatmapY = heatmapData[i] * outputStride;
//     const heatmapX = heatmapData[i + 1] * outputStride;
//     const offsetPointY = offsetPointsData[i];
//     const offsetPointX = offsetPointsData[i + 1];

//     drawSegment(
//         [heatmapY, heatmapX], [offsetPointY, offsetPointX], color, scale, ctx);
//   }
// }
