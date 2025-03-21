import SignInPage from "@/components/auth/sign-in";

import HelpButton from "@/components/buttons/help-button";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useUser } from "@/hooks";

import { Navigate } from "react-router-dom";

function SignIn() {
  const { user } = useUser({});

  if(user && (user.role === 'ADMIN' || user.role === 'MEMBER')) return <Navigate to={'/members'}/>

  if(user && user.role === 'GUEST') return <Navigate to={'/guests'}/>
  return (
    <div className='w-screen h-screen bg-[url("/images/telescope1.jpg")] bg-cover flex items-center justify-center'>
      <div className="bg-secondary/5 backdrop-blur w-full h-full absolute"/>
      <div className="relative z-50 md:w-[70%] flex md:h-[85%] rounded-[24px] items-center justify-center overflow-hidden p-[1px]">
        <BorderBeam />
        <SignInPage />
        {/* background image */}
        <img
          src="/images/albattani-1.jpg"
          className="h-full lg:w-2/3 md:w-1/2 object-cover md:flex hidden "
        />
        <HelpButton />
      </div>
  </div>
  );
}

export default SignIn;