"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Megaphone, Clock, Trophy, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

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
  },
  {
    href: "/nam-2024",
    label: "Năm 2024",
    icon: BarChart3,
  },
]

export default function UserNavbar() {
  const pathname = usePathname()

  return (
    <div className='md:h-screen md:w-64 w-screen h-50 bg-gradient-to-b from-vibrant-pink/80 to-vibrant-pink/0 backdrop-blur-md flex flex-col rounded-tr-[30px] md:border-1 border-light-pink md:border-l-0 md:border-b-0'>
      {/* Header Section */}
      <div className='h-30'></div>

      {/* Navigation Items */}
      <nav className='flex md:flex-col md:flex-1 p-4 space-y-2'>
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-2xl transition-colors duration-200 w-full",
                isActive
                  ? "bg-gradient-to-r from-vibrant-pink to-white text-white"
                  : "text-white/90 hover:bg-vibrant-pink   hover:text-white"
              )}
            >
              <Icon className='w-5 h-5' />
              <span className='md:block hidden font-medium'>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
