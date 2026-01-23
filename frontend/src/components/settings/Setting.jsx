import React,{useState} from "react"
import Navbar from "../Navbar/Navbar"
import DeleteModal from "./deleteModal"

const Setting = ()=>{

    const [showPassword,setShowPassword] = useState(false)

    const [openModal, setOpenModal] = useState(false)
     
    return (
        <>
            <Navbar/>
            <div className="flex justify-center mt-4 w-[75%]">
                <h2 className="text-xl font-extrabold">Settings</h2>
            </div>
            <div className="flex flex-col justify-center items-center p-4 ">
                <h2 className="text-lg font-bold">Update User Info:</h2>
                <h2 className="text-md font-bold mt-2">Username: </h2>
                <div className="flex items-center gap-2 mt-2">
                    <label htmlFor="username" className="cursor-pointer">Change Username: </label>
                    <input type="text" id="username" className="border-2 border-blue-500 rounded focus:outline-none" placeholder="New Username" />
                </div>
                <h2 className="text-md font-bold mt-2">Password: </h2>
                <div className="flex items-center gap-2 mt-2">
                    <label htmlFor="password" className="cursor-pointer">Change Password: </label>
                    <input type={showPassword ? "text" : "password"} id="password" className="border-2 border-blue-500 rounded focus:outline-none" placeholder="New Password" />
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <label htmlFor="confirmpassword" className="cursor-pointer">Confirm Password: </label>
                    <input type={showPassword ? "text" : "password"} id="confirmpassword" className="border-2 border-blue-500 rounded focus:outline-none" placeholder="Confirm Password" />
                </div>
                <div className="flex items-center mx-10 gap-2 mt-2">
                    <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                    <label htmlFor="showPassword">Show Password</label>
                </div>
                <div className="flex items-center mx-20 gap-2 mt-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold mt-2 px-2 py-2 rounded">Update</button>
                </div>

                <h2 className="text-lg font-bold mt-8 text-red-500">Delete Account:</h2>
                <div className="flex items-center mx-20 gap-2 mt-2">
                    <button onClick={() => setOpenModal(true)} className="bg-red-500 hover:bg-red-600 text-white font-bold mt-2 px-2 py-2 rounded">Delete</button>
                </div>

            <DeleteModal open={openModal} setOpen={setOpenModal} />
            </div>
        </>
    )
}

export default Setting