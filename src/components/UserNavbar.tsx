"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Megaphone,
  Clock,
  Trophy,
  BarChart3,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Menu,
  X,
  User,
  Settings,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useUser, useLogout } from "../stores/tokenStore"

const navigationItems = [
  {
    href: "/all-show",
    label: "Tất cả chương trình",
    icon: Megaphone,
  },
  {
    href: "/lich-su-hoat-dong",
    label: "Lịch sử hoạt động",
    icon: Clock,
  },
  {
    href: "/lich-su-top-10",
    label: "Lịch sử Top 10",
    icon: Trophy,
    subItems: [
      { href: "/nam-2024", label: "Năm 2024", icon: BarChart3 },
      { href: "/nam-2023", label: "Năm 2023", icon: BarChart3 },
    ],
  },
  {
    href: "/feedback",
    label: "Đánh giá",
    icon: MessageCircle,
  },
]

export default function UserNavbar() {
  const pathname = usePathname()
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set())
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleDropdown = (href: string) => {
    setOpenDropdowns((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(href)) newSet.delete(href)
      else newSet.add(href)
      return newSet
    })
  }

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const user = useUser()
  const logout = useLogout()
  const router = useRouter()

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
    setIsProfileOpen(false)
  }

  const handleUserInformation = () => {
    router.push("/user-information")
    setIsProfileOpen(false)
  }

  return (
    <>
      {/* ===== MOBILE + TABLET NAVBAR ===== */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-vibrant-pink/80 backdrop-blur-md flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/Logo.png"
            alt="Logo"
            width={150}
            height={60}
            className='
                      h-auto
                      w-[25vw] max-w-[580px]
                      sm:w-[80vw] sm:max-w-[640px]
                      md:w-[25vw] md:max-w-[720px]
                      lg:w-[20vw] lg:max-w-[700px]
                      xl:w-[15vw] xl:max-w-[877px]
                    '
            sizes='
                      (min-width:1280px) 877px,
                      (min-width:1024px) 700px,
                      (min-width:768px) 55vw,
                      (min-width:640px) 70vw,
                      80vw
                    '
          />
          <Image
            src="/images/iia_logo.png"
            alt="Logo"
            width={100}
            height={60}
            className='ml-0
                      h-auto
                      w-[20vw] max-w-[580px]
                      sm:w-[40vw] sm:max-w-[640px]
                      md:w-[18vw] md:max-w-[720px]
                      lg:w-[20vw] lg:max-w-[700px]
                      xl:w-[15vw] xl:max-w-[877px]
                    '
            sizes='
                      (min-width:1280px) 877px,
                      (min-width:1024px) 700px,
                      (min-width:768px) 55vw,
                      (min-width:640px) 70vw,
                      80vw
                    '
          />
        </div>
        <div className="absolute right-5">
          <div className='flex items-center space-x-4 z-20'>
            <div className='absolute right-0 z-10 -translate-x-10'>
              <button
                onClick={toggleProfile}
                className='flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200'

              >
                <div className='w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center'>
                  <User className='w-5 h-5 text-black' />
                </div>
                <div className='hidden sm:block text-left'>
                  <p className='text-md text-white'>
                    {user?.isAdmin == "True" ? "Admin" : "Sinh viên"}
                  </p>
                </div>
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className='fixed inset-0 z-40'
                    onClick={() => setIsProfileOpen(false)}
                  />

                  <div className='absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20'>
                    <div className='p-4 border-b border-gray-100'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-12 h-12 bg-[#8B1538] rounded-full flex items-center justify-center'>
                          <User className='w-6 h-6 text-white' />
                        </div>
                        <div>
                          <p className='text-sm text-gray-500'>{user?.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className='py-2'>
                      <button
                        onClick={handleUserInformation}
                        className='w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200'
                      >
                        <Settings className='w-4 h-4' />
                        <span className='text-sm'>Thông tin cá nhân</span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className='w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200'
                      >
                        <LogOut className='w-4 h-4' />
                        <span className='text-sm'>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={toggleMenu}
          className="text-white p-2 rounded-lg hover:bg-white/20 transition"
        >
          {menuOpen
            ? <X className="w-8 h-8 sm:w-10 sm:h-10" />
            : <Menu className="w-8 h-8 sm:w-10 sm:h-10" />
          }
        </button>
      </div>

      {/* ===== DESKTOP SIDEBAR ===== */}
      <div className="hidden lg:flex lg:h-screen lg:w-64 bg-gradient-to-b from-vibrant-pink/80 to-vibrant-pink/0 backdrop-blur-md flex-col rounded-tr-[30px] border-light-pink border-1">
        <div className="pt-30 flex justify-center items-center space-x-4"></div>

        <nav className="flex flex-col p-4 space-y-2 justify-start">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            const hasSubItems = item.subItems && item.subItems.length > 0

            return (
              <div key={item.href} className="space-y-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 w-full",
                    isActive
                      ? "bg-gradient-to-r from-vibrant-pink to-white text-white shadow-lg ring-2 ring-white/20"
                      : "text-white/90 hover:bg-vibrant-pink hover:text-white hover:shadow-md"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>

                {hasSubItems && (
                  <div className="ml-6 space-y-1">
                    {item.subItems.map((sub) => {
                      const SubIcon = sub.icon
                      const isSubActive = pathname === sub.href
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={cn(
                            "flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-300 w-full text-sm",
                            isSubActive
                              ? "bg-gradient-to-r from-vibrant-pink/80 to-white/80 text-white shadow-md"
                              : "text-white/70 hover:bg-vibrant-pink/60 hover:text-white"
                          )}
                        >
                          <SubIcon className="w-4 h-4" />
                          <span>{sub.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>

      {/* ===== MOBILE + TABLET MENU OVERLAY ===== */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-[70] backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="lg:hidden fixed top-[70px] sm:top-[114px] left-0 right-0 bg-vibrant-pink/90 p-4 rounded-b-3xl space-y-2 max-h-[80vh] overflow-y-auto z-[80]">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              const hasSubItems = item.subItems && item.subItems.length > 0
              const isDropdownOpen = openDropdowns.has(item.href)

              return (
                <div key={item.href}>
                  {/* Nếu có subItems thì dùng button, nếu không thì Link */}
                  {hasSubItems ? (
                    <button
                      onClick={() => toggleDropdown(item.href)}
                      className={cn(
                        "flex w-full items-center justify-between px-3 py-2 rounded-xl text-white/90 hover:bg-white/20 transition-all",
                        isActive && "bg-white/20 text-white"
                      )}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      {isDropdownOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-xl text-white/90 hover:bg-white/20 transition-all",
                        isActive && "bg-white/20 text-white"
                      )}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  )}

                  {/* Hiển thị subItems nếu dropdown mở */}
                  {hasSubItems && isDropdownOpen && (
                    <div className="ml-6 space-y-1 mt-1">
                      {item.subItems.map((subItem) => {
                        const SubIcon = subItem.icon
                        const isSubActive = pathname === subItem.href
                        return (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setMenuOpen(false)}
                            className={cn(
                              "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/20 transition-all",
                              isSubActive && "bg-white/20 text-white"
                            )}
                          >
                            <SubIcon className="w-4 h-4" />
                            <span>{subItem.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}