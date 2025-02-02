import './App.css'
import { BrowserRouter, Route , Routes } from 'react-router-dom'
import Home from './Frontend/views/Home'
function App() {
  return (
    <>
      <Routes>
        <Route path='/nanomarket' element={<Home></Home>}></Route>
      </Routes>
    </>
  )
}

export default App
