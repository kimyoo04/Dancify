export default function checkS3Url(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          clearInterval(intervalId);
          resolve(true); // 성공한 경우 Promise를 이용하여 값을 전달
        } else {
          console.error("GET 요청이 실패하였습니다.");
        }
      } catch (error) {
        console.error("GET 요청 중 오류가 발생하였습니다.", error);
      }
    }, 3000); // 3초 마다 요청 보내기
  });
}
