
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
        <Route element={<GuestLayout />}>
           <Route path="news" element={<News />} />
        <Route index element={<LandingPage />} />

        </Route>
      </Routes>
      
      
      </BrowserRouter>
    </>
  )
}

export default App
