
import Navbar from "../Navbar/Navbar"
import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react"
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import Avatar from 'react-avatar';

const AuthorDetails = () => {
    
        const [author, setAuthor] = useState({})
    
        const {username} = useParams()

        const {token, logout, userId} = useAuth()
        
        const notify = (message) => {
                toast(message);
            }

        console.log("User ID: ", userId, "Author ID:", author._id, "Logic result: ",author?.followers?.includes(userId) )
        
        // function to follow the user
        const handleFollow = async () => {
            const authorId = author._id
                try{
                    const response = await fetch("http://localhost:3000/auth/followUser",
                        {
                            method: "PUT",
                            body: JSON.stringify({"authorId":authorId, "userId": userId}),
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            }
                        }
                    )
                    const result = await response.json()
                    console.log(result)
                    if(response.status == 200){
                        notify(result.message)
                    }
                    else{
                        notify(result.message)
                    } 
                }
                catch(err){
                    notify(err.message)
                    console.log(err)
                }
            }    
        
        // Function to unfollow the user 
        const handleUnFollow = async () =>{
            const authorId = author._id
            try{

                const response = await fetch("http://localhost:3000/auth/unFollowUser",
                    {
                        method: "PUT",
                        body: JSON.stringify({"authorId":authorId, "userId": userId}),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }
                )
                const result = await response.json()
                console.log(result)
                if(response.status == 200){
                    notify(result.message)
                }
                else{
                    notify(result.message)
                } 
            }
            catch(err){
                notify(err.message)
                console.log(err)
            }
        }    

        useEffect(()=>{
            const fetchBlog = async () =>{
                try{
                    console.log("Author Name: ", username)
                    const response = await fetch(`http://localhost:3000/auth/getAuthorByName/${username}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            }
                        }
                    )
                    const data = await response.json()
                    console.log(data)
                    if(response.status == 200){
                        console.log("Data: ",data)
                        notify(data.message)
                        setAuthor(data.user[0])
    
                    }
                    else{
                        notify(data.message)
                    }
                }
                catch(err){
                    notify(err.message)
                    console.log(err)
                }    
            }
            fetchBlog()
        },[username, token])


    return (
        <div>
            <Navbar/>`
            <div className="flex justify-center">
                <div className="flex flex-col gap-2 items-center">
                    <Avatar name={author?.username} round={true} size="60" />
                    <div className="flex flex-col items-center">
                        <p className="font-bold text-xl text-gray-500">@{author?.username}</p>
                        <p className="font-bold text-gray-400">{author?.name}</p>
                    </div>
                    <div className="flex gap-2">
                        <p className="text-blue-500">{author?.followers?.length} followers</p>
                        <p className="text-blue-500">{author?.following?.length} following</p>
                    </div>
                    <div>
                        {(author?.followers?.includes(userId)) ? 
                        <button className="bg-blue-700 text-white p-2 rounded-md cursor-pointer hover:bg-blue-200 hover:text-blue-700 hover:font-bold" onClick={handleUnFollow}>Unfollow</button>
                        : 
                        <button className="bg-blue-700 text-white p-2 rounded-md cursor-pointer hover:bg-blue-200 hover:text-blue-700 hover:font-bold" onClick={handleFollow}>Follow</button> }
                    </div>
                    <div>
                        {author?.createdBlogs}
                    </div>

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
            </div>
        </div>
    )
}

export default AuthorDetails