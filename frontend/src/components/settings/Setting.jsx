import React,{useState} from "react"
import Navbar from "../Navbar/Navbar"
import DeleteModal from "./deleteModal"
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useLoading } from '../../context/LoadingContext';

const Setting = ()=>{

    const {token, logout} = useAuth()

    const [showPassword,setShowPassword] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    })

    const [errorMessage, setErrorMessage] = useState("")

    const notify = (message) => {
                toast(message);
            }

    const {showLoading, hideLoading} = useLoading()        

    const handleUpdate = async () => {
        console.log("Update");
        console.log(userInfo);
        if(userInfo.username === "" && userInfo.password === "" && userInfo.confirmPassword === "") {
            setErrorMessage("Please fill all fields");
            return;
        }
        if(userInfo.password !== userInfo.confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try{
            showLoading()
            const response = await fetch("http://localhost:3000/auth/updateUserInfo",{
                method: "PATCH",
                headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                body: JSON.stringify(userInfo)        
            })
            const {status: statusCode} = response
            const data = await response.json()
            if(statusCode === 200) {
                hideLoading()
                notify(data.message)
            }
        }
        catch(error){
            hideLoading()
            notify(error.message)
            console.log(error);
        }
    }
     
    return (
        <>
            <Navbar/>
            <div className="flex justify-center mt-4 md:w-[75%] sm:w-[90%]">
                <h2 className="text-xl font-extrabold">Settings</h2>
            </div>
            <div className="flex flex-col justify-center items-center p-4 sm:w-[50%] md:w-[100%]">
                <h2 className="text-lg font-bold">Update User Info:</h2>
                <h2 className="text-md font-bold mt-2">Username: </h2>
                <div className="flex items-center gap-2 mt-2">
                    <label htmlFor="username" className="cursor-pointer">Change Username: </label>
                    <input type="text" id="username" className="border-2 border-blue-500 rounded focus:outline-none" placeholder="New Username" value={userInfo.username} onChange={(e)=> {setErrorMessage(""); setUserInfo({...userInfo, username: e.target.value})}} />
                </div>
                <h2 className="text-md font-bold mt-2">Password: </h2>
                <div className="flex items-center gap-2 mt-2">
                    <label htmlFor="password" className="cursor-pointer">Change Password: </label>
                    <input type={showPassword ? "text" : "password"} id="password" className="border-2 border-blue-500 rounded focus:outline-none" placeholder="New Password" value={userInfo.password} onChange={(e)=> {setErrorMessage(""); setUserInfo({...userInfo, password: e.target.value})}} />
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <label htmlFor="confirmpassword" className="cursor-pointer">Confirm Password: </label>
                    <input type={showPassword ? "text" : "password"} id="confirmpassword" className="border-2 border-blue-500 rounded focus:outline-none" placeholder="Confirm Password" value={userInfo.confirmPassword} onChange={(e)=> {setUserInfo({...userInfo, confirmPassword: e.target.value})}} />
                </div>
                <div className="flex items-center mx-10 gap-2 mt-2">
                    <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                    <label htmlFor="showPassword">Show Password</label>
                </div>
                <div className="text-red-500 mt-2 text-md">{errorMessage}</div>
                <div className="flex items-center mx-20 gap-2 mt-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold mt-2 px-2 py-2 rounded" onClick={handleUpdate}>Update</button>
                </div>

                <h2 className="text-lg font-bold mt-8 text-red-500">Delete Account:</h2>
                <div className="flex items-center mx-20 gap-2 mt-2">
                    <button onClick={() => setOpenModal(true)} className="bg-red-500 hover:bg-red-600 text-white font-bold mt-2 px-2 py-2 rounded">Delete</button>
                </div>
                <ToastContainer
                                position="top-right"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick={false}
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                />    
                <DeleteModal open={openModal} setOpen={setOpenModal} />
            </div>
        </>
    )
}

export default Setting