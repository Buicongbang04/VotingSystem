import React, { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface DropdownOption {
  value: string
  label: string
}

interface CustomDropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='w-full px-4 py-3 bg-pink-500 text-white rounded-full flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200 hover:bg-pink-600'
      >
        <span className='text-left'>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className='absolute top-full left-0 right-0 w-80 mt-2 bg-gradient-to-r from-black to-vibrant-pink rounded-2xl shadow-lg z-50 overflow-hidden border-2 border-white'>
          {options.map((option) => (
            <button
              key={option.value}
              type='button'
              onClick={() => handleOptionClick(option.value)}
              className={`w-full px-4 py-3 text-left text-white hover:bg-pink-600 transition-colors duration-200 ${
                option.value === value ? "bg-pink-600" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomDropdown
