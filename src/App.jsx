import './App.css'
import { BrowserRouter, Route , Routes } from 'react-router-dom'
import Home from './Frontend/views/Home/Home'
import LoginPage from './Frontend/views/LoginPage/LoginPage.jsx'
import Navbar from './Frontend/components/Navbar/Navbar.jsx'
import RegisterPage from './Frontend/views/RegisterPage/RegisterPage.jsx'
import Cart from './Frontend/views/Cart/Cart.jsx'
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/nanomarket' element={<Home></Home>}></Route>
        <Route path='/nanomarket/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/nanomarket/register' element={<RegisterPage></RegisterPage>}></Route>
        <Route path='/nanomarket/cart' element={<Cart></Cart>}></Route>
      </Routes>
    </>
  )
}

export default App
