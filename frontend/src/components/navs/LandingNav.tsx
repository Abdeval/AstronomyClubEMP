// import React from 'react'
import HoveredButton from '../buttons/HoveredButton'
import MenuButton from '../buttons/MenuButton'
import Logo from '../Logo'

export default function LandingNav() {
  return (
    <div className='absolute top-0 z-50 bg-black/10 backdrop-blur w-full p-4 px-8 flex items-center justify-between' > 
       <Logo />
       {/* <MenuButton /> */}
       <HoveredButton />
    </div>
  )
}
