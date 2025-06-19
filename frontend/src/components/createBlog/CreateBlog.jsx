import React from "react"
import Navbar from "../Navbar/Navbar"
import { useForm } from "react-hook-form";
import { useAuth } from '../../context/AuthContext';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () =>{

    const {token, userId} = useAuth()    

    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setError } = useForm();

    const notify = (message) => {
        toast(message);
    }

    const navigate = useNavigate();

    const postBlog = async (data) =>{
        console.log("IsSubmitting: ",isSubmitting)
        console.log("Data: ",data)
        try{
            const response = await fetch("http://localhost:3000/blog/createBlog",{
                method: "Post",
                body: JSON.stringify({
                    title: data.title,
                    image: data.img,
                    content: data.content,
                    author: userId,
                    // tags: data.tags
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            console.log("Response: ",response)

            const responseData = await response.json()

            if(response.status == 200 && responseData.message == "Blog created successFully"){
                notify(responseData.message)
                setTimeout(() => {
                    navigate('/home')
                }, 2000)
                reset()
            }
   
        }
        catch(error){
            console.log("Error: ", error);
            notify(error.message)
            reset()
            setError("root", {
                message: error.message
            })
        }
        
    }

    return (
        <>
            <Navbar />
            <form onSubmit={handleSubmit(postBlog)} className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-4 m-4 w-[60%]">
                    <label htmlFor="title">Title:</label>
                    <input type="text" placeholder=" Title" id="title" {...register("title",{required:"Title is required"})} className="placeholder-black rounded-md w-[75%] border-2 border-rgb(209,213,220) h-10" />
                </div>
                {errors.title && <div className="text-red-500 text-center">{errors.title.message}</div>}

                <div className="flex flex-col justify-center items-center gap-4 m-4 w-[60%]">
                    <label htmlFor="img">Upload image:</label>
                    <input type="file" placeholder="Upload your image here" id="img" {...register("img")} className="border-2 rounded-md w-[75%] text-center h-20"  />
                </div>

                <div className="flex flex-col justify-center items-center gap-4 m-4 w-[60%]">
                    <label htmlFor="content">Blog Content:</label>
                    <input type="text" placeholder=" Write you blog content here" id="content" {...register("content",{required:"Content is required"})} className="placeholder-black rounded-md w-[75%] border-2 border-rgb(209,213,220) h-40" />
                </div>
                {errors.content && <div className="text-red-500 text-center">{errors.content.message}</div>}
                <div>
                    <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white font-bold p-2 rounded-xl m-4 w-24 hover:bg-blue-600 hover:cursor-pointer">
                        {isSubmitting ? 'Posting...' : 'Post'}
                    </button>
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
            </form>

        </>
    )
}

export default CreateBlog
