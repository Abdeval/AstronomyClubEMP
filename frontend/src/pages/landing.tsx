
import Spline from '@splinetool/react-spline';




const LandingPage = () => {
  return (
    <>
        <div className="h-full w-full"> 

          <p className="text-8xl text-white text-center ">Astronomy Club</p>
          <p className="text-3xl text-white text-center"> EMP</p>
          <Spline className="h-screen absolute top-0 left-0 -z-10 w-screen" scene="https://prod.spline.design/v4Si4zH9B-UDndwk/scene.splinecode" />
          

        </div>
        
    </>
  )
}

export default LandingPage;