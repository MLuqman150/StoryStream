import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
import Home from './components/home/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import ProtectedRoutes from './components/routes/ProtectedRoutes'
import PublicRoutes from './components/routes/PublicRoutes.jsx'
import {AuthProvider} from './context/AuthContext.jsx'

function App() {


  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<ProtectedRoutes/>}>
              <Route path="home" element={<Home />} />
            </Route>
            <Route element={<PublicRoutes/>}>
              <Route path="/" element={<Login />} />
            </Route>            
            {/* <Route index path='/' element={<Login />} /> */}
            <Route path="signup" element={<SignUp />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
