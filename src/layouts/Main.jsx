

import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../routes/ScrollToTop'


const Main = () => {
  return (
    <div className='bg-white'>
      <ScrollToTop></ScrollToTop>
      
      <Navbar></Navbar>
      
      <div>
        <div className='max-w-7xl mx-auto '>
        <Outlet />
        </div>
      </div>
      
      <Footer></Footer>
    </div>
  )
}

export default Main

