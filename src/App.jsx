import './App.css'
import {Route , Routes } from 'react-router-dom'
import Home from './views/Home/Home'
import LoginPage from './views/LoginPage/LoginPage.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import RegisterPage from './views/RegisterPage/RegisterPage.jsx'
import Cart from './views/Cart/Cart.jsx'
import Posts from './views/Posts/Posts.jsx'
import Profile from './views/Profile/Profile.jsx'
import Producto from './views/Producto/Producto.jsx'
import Orders from './views/Orders/Orders.jsx'
import Purchases from './views/Purchases/Purchases.jsx'
import Footer from './components/Footer/Footer.jsx'
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
        <Route path='/producto/:id' element={<Producto></Producto>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/posts' element={<Posts></Posts>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='/orders' element={<Orders></Orders>}></Route>
        <Route path='/purchases' element={<Purchases></Purchases>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App