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
      </Routes>
    </>
  )
}

export default App