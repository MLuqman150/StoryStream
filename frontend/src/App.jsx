import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
import Home from './components/home/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import ProtectedRoutes from './components/routes/ProtectedRoutes'
import {AuthProvider} from './context/AuthContext'

function App() {


  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<ProtectedRoutes/>}>
          
              <Route path="home" element={<Home />} />
            </Route>
            <Route index path='/' element={<Login />} />
            <Route path="signup" element={<SignUp />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
