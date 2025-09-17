export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex h-screen'>
      <main className='flex-1 overflow-auto'>{children}</main>
    </div>
  )
}
