import React,{useRef} from "react"
import Navbar from "../Navbar/Navbar"

const CreateBlog = () =>{

    const formRef = useRef()
    const postBlog =() =>{
        // console.log("Data: ",data)
    }

    return (
        <>
            <Navbar />
            <form action="" className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-4 m-4 w-[60%]">
                    <label htmlFor="title">Title:</label>
                    <input type="text" placeholder=" Title" id="title" className="placeholder-black rounded-md w-[75%] border-2 border-rgb(209,213,220) h-10"  />
                </div>

                <div className="flex flex-col justify-center items-center gap-4 m-4 w-[60%]">
                    <label htmlFor="img">Upload image:</label>
                    <input type="file" placeholder="Upload your image here" id="img" className="border-2 rounded-md w-[75%] text-center h-20"  />
                </div>

                <div className="flex flex-col justify-center items-center gap-4 m-4 w-[60%]">
                    <label htmlFor="content">Blog Content:</label>
                    <input type="text" placeholder=" Write you blog content here" id="content" className="placeholder-black rounded-md w-[75%] border-2 border-rgb(209,213,220) h-40" />
                </div>
                <div>
                    <button className="bg-blue-500 text-white font-bold p-2 rounded-xl mt-4 w-24 hover:bg-blue-600 hover:cursor-pointer" onClick={postBlog}>Post</button>
                </div>
            </form>

        </>
    )
}

export default CreateBlog
