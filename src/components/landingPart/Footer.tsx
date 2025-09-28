import React from "react"
import ContactInfo from "./ContactInfo"

const Footer = () => {
  return (
    <footer
      id='footer'
      className='
        bg-gradient-to-t from-vibrant-pink to-transparent snap-section
        w-full max-w-[100vw]
        overflow-x-hidden 
        flex items-end justify-start
        px-4 sm:px-6 lg:px-8
        min-h-[15rem]   /* ~h-60 nhưng flexible hơn */
      '
    >
      <div className='w-full min-w-0'>
        <ContactInfo />
      </div>
    </footer>
  )
}

export default Footer
