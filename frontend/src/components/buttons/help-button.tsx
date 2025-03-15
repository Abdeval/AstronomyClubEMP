import { Icon } from '@iconify/react'

function HelpButton() {
  return (
    <div className='md:flex hidden items-center justify-center px-2 gap-2 cursor-pointer hover:ring-1 transition-all duration-200 ring-secondary absolute bottom-2 right-2 h-[40px] w-[140px] rounded-full bg-white/10 backdrop-blur '>
       <Icon icon="formkit:help" fontSize={22} className="text-primary" />
       <span className='font-medium text-white text-sm'>Any Help ?</span>
    </div>
  )
}

export default HelpButton