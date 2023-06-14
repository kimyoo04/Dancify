export default function extractPTags(content: string): string {
  const pattern = /<p>.*?<\/p>/gs; // 정규식 패턴
  const matches = content.match(pattern); // 일치하는 모든 패턴 찾기

  if (!matches) return content;
  return matches.slice(0, 4).join(""); // 최대 4개의 <p> 태그 반환
}
