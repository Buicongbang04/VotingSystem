import UserNavbar from "../../../components/UserNavbar"
import AuthGuard from "../../../components/AuthGuard"
import AppNavbar from "@/src/components/AppNavbar"
import LenisProvider from "@/src/utils/lenis"
import Image from "next/image"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <LenisProvider>
        <div className='absolute top-0 left-0 w-full h-full -z-1'>
          <Image
            src='/images/bgAppUser.png'
            alt='bg'
            width={2000}
            height={2000}
            className='w-full h-full object-cover absolute bg-gradient-to-b from-[black] to-[#65002F]'
          />
          <Image
            src='/images/bgLeaf.png'
            alt='bg'
            width={2000}
            height={2000}
            className='w-full h-full object-cover absolute top-0 left-0'
          />
        </div>

        <main className='md:flex h-screen w-screen backdrop-blur-xs'>
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
