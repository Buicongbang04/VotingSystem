import UserNavbar from "../../../components/UserNavbar"
import AuthGuard from "../../../components/AuthGuard"
import AppNavbar from "@/src/components/AppNavbar"
import LenisProvider from "@/src/utils/lenis"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <LenisProvider>
        <main className='md:flex h-screen w-screen '>
          <UserNavbar />
          <div className='flex-1 overflow-y-scroll' data-lenis-prevent>
            <AppNavbar />
            {children}
          </div>
        </main>
      </LenisProvider>
    </AuthGuard>
  )
}
