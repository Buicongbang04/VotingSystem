import UserNavbar from "../../../components/UserNavbar"
import AuthGuard from "../../../components/AuthGuard"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className='flex h-screen'>
        <UserNavbar />
        <main className='flex-1 overflow-auto'>{children}</main>
      </div>
    </AuthGuard>
  )
}
