import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function BackButton() {
  const navigate = useNavigate();

  return (
     <Button onClick={() => navigate(-1)} variant={"outline"} className='z-50 rounded-full fixed top-24 right-10' size={"icon"} >
        <ArrowLeft className='text-primary' size={44}/>
     </Button>
  )
}
