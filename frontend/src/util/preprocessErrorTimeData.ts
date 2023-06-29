import { TError } from "@type/feedbacks";

interface TimeData {
  start: number;
  end?: number;
}

// 데이터 예시
// [
//   "2~3",
//   "15~19",
//   "22~25",
//   "28~29",
//   "31~32",
//   "35~36",
//   "41",
//   "45",
//   "49~52",
// ];

export function preprocessErrorTimeData(data: string[]): TimeData[] {
  const processedData: TimeData[] = [];

  for (const item of data) {
    if (!item.includes("~")) {
      processedData.push({ start: Number(item) });
    } else {
      const [start, end] = item.split("~").map(Number);
      processedData.push({ start, end });
    }
  }
  return processedData;
}

export function convertKey(key: TError) {
  const convertedKeys = {
    pelvis_error_time: "골반",
    shoulder_error_time: "어깨",
    forearm_error_time: "팔",
    leg_error_time: "다리",
  };

  return convertedKeys[key];
};