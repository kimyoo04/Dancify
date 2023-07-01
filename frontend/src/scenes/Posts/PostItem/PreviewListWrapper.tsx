// 댄서, 자랑 게시판의 가로 스크롤 Wrapper
export default function PreviewListWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ul className="flex space-x-4 px-0 pb-4">{children}</ul>;
}
