import React from "react"
import Navbar from "../Navbar/Navbar"
import { useForm } from "react-hook-form";
import { useAuth } from '../../context/AuthContext';

const CreateBlog = () =>{

    const {token, userId} = useAuth()    

    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setError } = useForm();

    const postBlog =(data) =>{
        console.log("IsSubmitting: ",isSubmitting)
        console.log("Data: ",data)
        console.log("Token: ",token)
        console.log("UserId: ",userId)
        reset()
        
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
            </form>

        </>
    )
}

export default CreateBlog
