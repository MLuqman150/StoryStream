import React,{useEffect, useState} from "react"
import Navbar from "../Navbar/Navbar"
// import bundeno  from '../../assets/bundeno.png'
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const ArticleDetails = () => {

    const [blog, setBlog] = useState({})

    const {slug} = useParams()
    
   const notify = (message) => {
            toast(message);
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
                    console.log("Data: ",data)
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
        </>           
    )
}

export default ArticleDetails