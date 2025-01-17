import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
import Home from './components/home/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
