export default function VideoListWrapper({children}: {children: React.ReactNode}) {
  return (
    <ul className="grid w-full grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {children}
    </ul>
  )
}