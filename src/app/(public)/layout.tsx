import { Navbar } from "@/src/components/landingPart"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}
