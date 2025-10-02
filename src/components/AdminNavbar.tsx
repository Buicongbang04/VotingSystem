"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Users,
  BarChart3,
  UserCheck,
  Database,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: BarChart3,
  },
  {
    href: "/admin/users",
    label: "Quản lý người dùng",
    icon: Users,
  },
  {
    href: "/admin/lecturers",
    label: "Quản lý giảng viên",
    icon: UserCheck,
  },
  {
    href: "/admin/feedback",
    label: "Phản hồi người dùng",
    icon: MessageSquare,
  },
  {
    href: "/admin/data",
    label: "Quản lý dữ liệu",
    icon: Database,
  },
]

export default function AdminNavbar() {
  const pathname = usePathname()

  return (
    <div className='md:h-screen md:w-64 w-screen h-50 bg-gradient-to-b from-vibrant-pink/80 to-vibrant-pink/0 backdrop-blur-md flex flex-col rounded-tr-[30px] md:border-1 border-light-pink md:border-l-0 md:border-b-0'>
      {/* Header Section */}
      <div className='h-30'></div>

      {/* Navigation Items */}
      <nav className='flex md:flex-col p-4 space-y-2 justify-between'>
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 w-full",
                isActive
                  ? "bg-gradient-to-r from-vibrant-pink to-white text-white shadow-lg shadow-vibrant-pink/50 ring-2 ring-white/20"
                  : "text-white/90 hover:bg-vibrant-pink hover:text-white hover:shadow-md hover:shadow-vibrant-pink/30"
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
