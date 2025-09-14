"use client"

import { Vote, Menu } from "lucide-react"
import { NavBarItems } from "@/src/constants/NavBar"
import { Button } from "../ui"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className='sticky top-0 z-50 h-0'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex items-center space-x-2'>
            <Vote className='h-8 w-8 text-primary' />
            <span className='text-xl font-bold text-foreground'>
              FPT University
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {NavBarItems.map((item) => (
              <Link
                key={item.label}
                href={item.to}
                className='text-white hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 border-b-4 '
              >
                {item.label}
              </Link>
            ))}
            <div className='hidden md:flex items-center space-x-4'>
              <Link
                href='/login'
                className='text-white px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 border-4 hover:border-pink-500'
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
