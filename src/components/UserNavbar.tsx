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
    subItems: [
      {
        href: "/nam-2024",
        label: "Năm 2024",
        icon: BarChart3,
      },
      {
        href: "/nam-2023",
        label: "Năm 2023",
        icon: BarChart3,
      },
    ],
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
          const hasSubItems = item.subItems && item.subItems.length > 0

          return (
            <div key={item.href} className='space-y-1'>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 w-full",
                  isActive
                    ? "bg-gradient-to-r from-vibrant-pink to-white text-white shadow-lg shadow-vibrant-pink/50 ring-2 ring-white/20"
                    : "text-white/90 hover:bg-vibrant-pink hover:text-white hover:shadow-md hover:shadow-vibrant-pink/30"
                )}
              >
                <Icon className='w-5 h-5' />
                <span className='md:block hidden font-medium'>
                  {item.label}
                </span>
              </Link>

              {/* Sub-items */}
              {hasSubItems && (
                <div className='ml-6 space-y-1'>
                  {item.subItems.map((subItem) => {
                    const SubIcon = subItem.icon
                    const isSubActive = pathname === subItem.href

                    return (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-300 w-full text-sm",
                          isSubActive
                            ? "bg-gradient-to-r from-vibrant-pink/80 to-white/80 text-white shadow-md shadow-vibrant-pink/40 ring-1 ring-white/20"
                            : "text-white/70 hover:bg-vibrant-pink/60 hover:text-white hover:shadow-sm hover:shadow-vibrant-pink/20"
                        )}
                      >
                        <SubIcon className='w-4 h-4' />
                        <span className='md:block hidden font-medium'>
                          {subItem.label}
                        </span>
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
  )
}
