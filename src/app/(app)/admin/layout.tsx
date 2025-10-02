import AdminNavbar from "@/src/components/AdminNavbar"
import AuthGuard from "../../../components/AuthGuard"
import AppNavbar from "@/src/components/AppNavbar"
import LenisProvider from "@/src/utils/lenis"
import ParallaxBackground from "@/src/components/ParallaxBackground"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <LenisProvider>
        <ParallaxBackground />

        <main className='md:flex h-screen w-screen backdrop-blur-xs'>
          <AdminNavbar />
          <div className='flex-1 overflow-y-scroll' data-lenis-prevent>
            <AppNavbar />
            {children}
          </div>
        </main>
      </LenisProvider>
    </AuthGuard>
  )
}
