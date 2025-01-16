import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='login' element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
