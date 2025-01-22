import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
import Home from './components/home/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="home" element={<Navbar><Home /></Navbar> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
