"use client"

import { useState } from "react"
import { NavBarItems } from "@/src/constants/NavBar"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className='fixed top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-md'>
      <div className='w-full mx-auto sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16 px-4 sm:px-6'>
          {/* Logo */}
          <div className='flex items-center space-x-2 gap-4'>
            <Image src='/images/Logo.png' alt='logo' width={110} height={110} />
            <Image
              src='/images/iia_logo.png'
              alt='logo'
              width={80}
              height={80}
            />
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center space-x-8'>
            {NavBarItems.map((item) => (
              <Link
                key={item.label}
                href={item.to}
                className='text-white hover:bg-white/20 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200'
              >
                {item.label}
              </Link>
            ))}
            <Link
              href='/login'
              // className="text-white px-3 py-2 rounded-full text-lg font-medium transition-colors duration-200 border-4 hover:border-pink-500 hover:bg-pink-500/20"
              className='button1 relative transition-all duration-300'
            >
              Đăng nhập
            </Link>
          </div>

          {/* Mobile Burger */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={toggleMenu}
              className='text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white'
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-black/90 backdrop-blur-lg fixed top-16 left-0 w-full h-screen flex flex-col items-center justify-start pt-8 space-y-6 z-40'>
          {NavBarItems.map((item) => (
            <Link
              key={item.label}
              href={item.to}
              onClick={() => setIsOpen(false)}
              className='text-white text-xl font-semibold hover:text-pink-400 transition-colors duration-200'
            >
              {item.label}
            </Link>
          ))}
          <Link
            href='/login'
            onClick={() => setIsOpen(false)}
            className='text-white px-6 py-3 rounded-full text-lg font-medium border-2 border-white hover:border-pink-500 hover:bg-pink-500/20 transition-all duration-200'
          >
            Đăng nhập
          </Link>
        </div>
      )}
    </nav>
  )
}
