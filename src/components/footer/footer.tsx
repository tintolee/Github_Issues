import React from 'react'

export const Footer = () => {
  return (
    <div className=" flex items-center justify-center bg-gray-600 w-screen lg:max-w-6xl mx-auto p-4 py-1 rounded-sm fixed bottom-0 left-0 right-0">
        <p className='text-gray-100'>&copy; {new Date().getFullYear()}</p>
    </div>
  )
}

export default Footer
