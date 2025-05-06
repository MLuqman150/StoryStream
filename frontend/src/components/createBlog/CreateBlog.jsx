import React from "react"
import Navbar from "../Navbar/Navbar"

const CreateBlog = () =>{

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
                    <input type="file" placeholder="Upload your image here" id="img"  />
                </div>

                <div className="flex flex-col justify-center items-center gap-4 m-4 w-[60%]">
                    <label htmlFor="content">Blog Content:</label>
                    <input type="text" placeholder=" Write you blog content here" id="content" className="placeholder-black rounded-md w-[75%] border-2 border-rgb(209,213,220) h-24" />
                </div>

            </form>

        </>
    )
}

export default CreateBlog
