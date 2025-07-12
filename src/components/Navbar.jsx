import React from 'react'

function Navbar() {
  return (
    <nav className='bg-slate-800  text-white flex justify-between items-center px-4 h-12'>
        <div className='font-bold text-2xl'>
          <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'>MAN/&gt;</span>
        </div>
        <a href="https://github.com/charankumbar07/PassMan.git" target='_blank'>
        <button className='flex justify-between items-center bg-green-800 rounded-full text-white hover:bg-green-700 ring-green-700 ring-1'>
          <img className='w-10' src="icon/github.svg" alt="Github" />
          <span className='font-bold p-2'>Github</span>
        </button></a>
    </nav>
  )
}

export default Navbar
