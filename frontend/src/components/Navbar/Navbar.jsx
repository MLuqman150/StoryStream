import { Link, useNavigate } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const isAuthenticated = useAuth().token

    console.log(isAuthenticated)
    const navigate = useNavigate();

    const {logout} = useAuth()

    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        logout()
        navigate("/");
    }

    const handleRegister = () => {
        navigate("/signup");
    }

    const dropDown = () =>{
        setOpen(!open);
    }

    return (
        
        <div className="m-4 w-[95%] p-2 flex justify-between overflow-hidden position-relative border-b-2 border-blue-300">
            <Link to="/home">
                <h1 className="text-2xl font-bold font-mono cursor-pointer">StoryStream</h1>
            </Link>
            
            {
            isAuthenticated===null ? <div className="flex gap-2"> <Link to="/" className='md:block hidden cursor-pointer hover:font-bold p-2'>Login</Link> <button className='md:block hidden bg-blue-500 text-white p-2 rounded-md font-bold hover:bg-blue-600 hover:cursor-pointer' onClick={handleRegister}>Get Started</button> </div> : 
            <>
            <ul className="md:flex hidden justify-between w-[30%]">
                <Link to="/home"><li className="cursor-pointer hover:font-bold">Home</li></Link>
                <Link to="/following"><li className="cursor-pointer hover:font-bold">Following</li></Link>
                <Link to="/settings"><li className="cursor-pointer hover:font-bold">Settings</li></Link>
            </ul>
            <button className="md:block hidden bg-blue-500 text-white p-2 rounded-md font-bold hover:bg-blue-600 hover:cursor-pointer" onClick={logout}>Logout</button>
            </>
            }
            {/* <div> */}
             
            <IoMenu className="md:hidden block fixed right-0 mx-2 cursor-pointer text-2xl"  onClick={dropDown}  />
            {open ?<div className={open ? 'sm:block mt-5 right-0 shadow-[5px_5px_5px_rgba(0,0,0,0.25)]  border-2 p-2 rounded-xl position-absolute z-100' : 'hidden'}>
                {
                    isAuthenticated === null? <></>:
                    <>
                        <Link to="/home"><option className="cursor-pointer hover:font-bold list-none">Home</option></Link>
                        <Link to="/following"><li className="cursor-pointer hover:font-bold list-none">Following</li></Link>
                        <Link to="/settings"><li className="cursor-pointer hover:font-bold list-none">Settings</li></Link>                   
                    </>
                }

                {isAuthenticated === null ? 
                <>
                <li className='list-none'><Link to="/" className="cursor-pointer hover:font-bold list-none">Login</Link></li>
                <li className='list-none'><Link to="/signup" className="cursor-pointer hover:font-bold list-none">Create an account</Link></li>
                </> : <li className="cursor-pointer hover:font-bold list-none" onClick={handleLogout}>Logout</li>}
                
                
            </div> : <></> }
            
            {/* </div> */}
        </div>
        
    )
}

export default Navbar