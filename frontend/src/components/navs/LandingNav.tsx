// import React from 'react'
import { Link } from 'react-router-dom'
import HoveredButton from '../buttons/HoveredButton'
import Logo from '../Logo'

export default function LandingNav() {
  return (
    <div className='fixed left-0 top-0 z-50 bg-black/10 backdrop-blur w-full p-4 px-8 flex items-center justify-between' > 
       <Logo type='nav'/>
       {/* <MenuButton /> */}
       <div className='flex items-center gap-4'>
          <Link to={'/guests/articles'} className='font-medium text-yellow-400 hover:text-white capitalize transition-all duration-200'>
            articles
          </Link>
          <Link to={'/dashboard'} className='font-medium text-yellow-400 hover:text-white capitalize transition-all duration-200'>
            dashboard
          </Link>
          <Link to={'/guests/articles'} className='font-medium text-yellow-400 hover:text-white capitalize transition-all duration-200'>
            members
          </Link>
       </div>
       <HoveredButton />
    </div>
  )
}
