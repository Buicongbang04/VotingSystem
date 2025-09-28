import { Navbar } from "@/src/components/landingPart"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='overflow-x-hidden'>
      <Navbar />
      {children}
    </main>
  )
}
