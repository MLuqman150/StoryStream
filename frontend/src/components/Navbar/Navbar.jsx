import { Link, useNavigate } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const logout = () => {
        navigate("/");
    }

    const dropDown = () =>{
        setOpen(!open);
    }

    return (
        
        <div className="m-4 w-[90%] flex justify-between overflow-hidden position-relative">
            <Link to="/home">
                <h1 className="text-2xl font-bold font-mono cursor-pointer">StoryStream</h1>
            </Link>
            
            
            <ul className="md:flex hidden justify-between w-[30%]">
                <Link to="/home"><li className="cursor-pointer hover:font-bold">Home</li></Link>
                <Link to="/home"><li className="cursor-pointer hover:font-bold">Following</li></Link>
                <Link to="/home"><li className="cursor-pointer hover:font-bold">Settings</li></Link>
            </ul>
            <button className="md:block hidden bg-blue-500 text-white p-2 rounded-md font-bold hover:bg-blue-600 hover:cursor-pointer" onClick={logout}>Logout</button>
            {/* <div> */}
            <IoMenu className="md:hidden block fixed right-0 mx-2 cursor-pointer text-2xl"  onClick={dropDown}  />
            {open ?<div className={open ? 'sm:block mt-5 right-0 shadow-[5px_5px_5px_rgba(0,0,0,0.25)]  border-2 p-2 rounded-xl position-absolute z-100' : 'hidden'}>
                <Link to="/home"><option className="cursor-pointer hover:font-bold list-none">Home</option></Link>
                <Link to="/home"><li className="cursor-pointer hover:font-bold list-none">Following</li></Link>
                <Link to="/home"><li className="cursor-pointer hover:font-bold list-none">Settings</li></Link>
                <li className="cursor-pointer hover:font-bold list-none" onClick={logout}>Logout</li>
            </div> : <></> }
            
            {/* </div> */}
        </div>
        
    )
}

export default Navbar