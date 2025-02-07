
import { BrowserRouter , Routes, Route} from "react-router";
import './App.css'
import LandingPage from './pages/landing';
import News from './pages/news';
import GuestLayout from "./layouts/guest";

function App() {

  return (
    <>
    <BrowserRouter>
     
      <Routes>
        <Route index element={<LandingPage />} />
        <Route element={<GuestLayout />}>
           <Route path="news" element={<News />} />

        </Route>
      </Routes>
      
      
      </BrowserRouter>
    </>
  )
}

export default App
