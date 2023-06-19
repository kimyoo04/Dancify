export default async function encodeFileToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const encodedString = base64String.split(",")[1]; // Base64 문자열에서 "data:image/jpeg;base64,"와 같은 prefix 제거
      resolve(encodedString);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
