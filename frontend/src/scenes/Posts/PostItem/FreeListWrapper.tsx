export default function FreeListWrapper({children}: {children: React.ReactNode}) {
  return (
    <ul className="grid w-full grid-cols-1 gap-4 p-0">
      {children}
    </ul>
  )
}