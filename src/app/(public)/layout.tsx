import { Navbar } from "@/src/components/landingPart"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex h-screen'>
      <main className='flex-1'>
        <Navbar />
        {children}
      </main>
    </div>
  )
}
