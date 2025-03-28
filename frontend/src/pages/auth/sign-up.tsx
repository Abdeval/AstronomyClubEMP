
import SignUpPage from '@/components/auth/sign-up'
import HelpButton from '@/components/buttons/help-button'
import { BorderBeam } from '@/components/magicui/border-beam'

function SignUp() {
  return (
    <div className='w-screen h-screen bg-[url("/images/albattani-3.jpg")] bg-cover flex items-center justify-center'>
      <div className="bg-secondary/5 backdrop-blur w-full h-full absolute"/>
      <div className="relative z-50 md:w-[70%] flex md:h-[90%] rounded-[20px] items-center justify-center overflow-hidden">
        <BorderBeam />
        <SignUpPage />
        {/* background image */}
        <img
          src="/images/albattani-4.jpg"
          className="h-full lg:w-2/3 md:w-1/2 object-cover md:flex hidden "
        />
        <HelpButton />
      </div>
    </div>
  )
}

export default SignUp