import UserNavbar from "../../../components/UserNavbar"
import AuthGuard from "../../../components/AuthGuard"
import AppNavbar from "@/src/components/AppNavbar"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className='flex h-screen w-screen'>
        <UserNavbar />
        <main className='flex-1 overflow-auto'>
          <AppNavbar />
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}
