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
    href: "/nam-2025",
    label: "Năm 2025",
    icon: BarChart3,
  },
]

export default function UserNavbar() {
  const pathname = usePathname()

  return (
    <div className='h-screen w-64 bg-[#8B1538] flex flex-col'>
      {/* Header Section */}
      <div className='p-6 border-b border-[#A01A42]'>
        <div className='flex items-center space-x-2 mb-2'>
          <div className='w-8 h-8 bg-white rounded flex items-center justify-center'>
            <span className='text-[#8B1538] font-bold text-sm'>FPT</span>
          </div>
          <span className='text-white text-sm font-medium'>Education</span>
        </div>
        <h1 className='text-white text-lg font-bold'>FPT UNIVERSITY</h1>
      </div>

      {/* Navigation Items */}
      <nav className='flex-1 p-4 space-y-2'>
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200",
                isActive
                  ? "bg-[#6B0F2A] text-white"
                  : "text-white/90 hover:bg-[#7A1232] hover:text-white"
              )}
            >
              <Icon className='w-5 h-5' />
              <span className='font-medium'>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
