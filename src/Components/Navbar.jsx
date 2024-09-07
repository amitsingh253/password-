import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-gray-800 h-14 flex items-center justify-between px-5 text-white'>
            <span className="logo text-xl font-bold">
                <span className='text-green-500'>&lt;</span>
                <span>Pass</span>
                <span className='text-green-500'>OP/&gt;</span>
            </span>
            <span className='flex items-center justify-center gap-2 cursor-pointer hover:bg-green-700 px-4 py-1 rounded-full'>
                <img className='w-8 invert-[1]' src="icons/github.png" alt="" /> GitHub
            </span>
        </nav>
    )
}

export default Navbar