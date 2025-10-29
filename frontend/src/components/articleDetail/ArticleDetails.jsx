import React,{useEffect, useState} from "react"
import Navbar from "../Navbar/Navbar"
// import bundeno  from '../../assets/bundeno.png'
import { BiLike, BiDislike } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ArticleDetails = () => {

    const [blog, setBlog] = useState({})

    const {slug} = useParams()

    const {userId, token} = useAuth()
    
   const notify = (message) => {
            toast(message);
        }

    const following = ()=>{
        if (blog.author?.followers?.includes(userId)){
            return true
        }
        else{
            return false
        }
    }

    const handleFollow = async () => {
        const authorId = blog.author._id
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
    
    const handleUnFollow = async () =>{
        const authorId = blog.author._id
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
                console.log("Slug: ", slug)
                const response = await fetch(`http://localhost:3000/blog/getBySlug/${slug}`,
                    {
                        method: "GET"
                    }
                )
                const data = await response.json()
                console.log(data)
                if(response.status == 200){
                    console.log("Data: ",data.blog)
                    notify(data.message)
                    setBlog(data.blog)

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
    },[slug])

    console.log("Following ", following())

    return (
        <>
            <Navbar/>
            <div>
                <div className="text-center p-5">
                    <h2 className="font-bold text-3xl">{blog.title}</h2>
                </div>
                <div className="flex justify-center  w-[100%] h-auto p-5"> 
                    <img src={blog.image ? `http://localhost:3000/`+blog.image.replace("/uploads/", ""): ""} alt="" className=" md:w-[70%] h-auto rounded-md border-2 border-blue-500 hover:scale-105 cursor-pointer sm:w-[100%]" />
                </div>
                <div className="p-2 text-center mx-8 ">
                    <p className="text-gray-500 m-2">{blog.content}</p>
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
            <div className="flex justify-center gap-4 my-6 ">
                <BiLike className='mx-4 text-blue-700 cursor-pointer text-xl'  />
                <BiDislike className='mx-4 text-blue-700 cursor-pointer text-xl' />
                <FaRegCommentAlt className='mx-4 text-blue-700 cursor-pointer text-xl' /> 
                <CiShare2 className='mx-4 text-blue-700 cursor-pointer text-xl' />
            </div>
            <div className="flex justify-around gap-5 my-4">
              <div className="flex gap-2">
                <Avatar name={blog.author?.username} round={true} size="40" />
                <div className="flex flex-col">
                    <Link to={`/authorDetails/${blog.author?.username}`} className="text-md font-bold hover:underline cursor-pointer">{blog.author?.username}</Link>
                    <div className="flex gap-2 text-gray-500 text-sm">
                        <p>{blog.author?.followers?.length} followers</p>
                        <p>{blog.author?.following?.length} following</p>
                    </div>
                </div>
              </div>  
              {following() == true?
              <button onClick={handleUnFollow} className="bg-blue-700 text-white p-2 rounded-md cursor-pointer hover:bg-blue-200 hover:text-blue-700 hover:font-bold">Unfollow</button>
              :
              <button onClick={handleFollow} className="bg-blue-700 text-white p-2 rounded-md cursor-pointer hover:bg-blue-200 hover:text-blue-700 hover:font-bold">Follow</button>  
              }

            </div>
          
        </>           
    )
}

export default ArticleDetails