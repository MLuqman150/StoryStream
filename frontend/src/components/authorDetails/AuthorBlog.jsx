import { useEffect, useState, useRef } from "react"
import { toast, ToastContainer } from 'react-toastify'; 

const AuthorBlog = (data) =>{
    let currentPage = 1
    let pageSize = 5
    let totalNumber = useRef(0)

    const [blogs, setBlogs] = useState([])

    const notify = (message) => {
                toast(message);
    }

    useEffect(()=>{
        const fetchBlogs = async() =>{
            try{
                const response = await fetch(`http://localhost:3000/getBlogByAuthor?page=${currentPage}&pageSize=${pageSize}`,
                    { 
                        method: "GET",
                        headers: {
                                "Content-Type": "application/json",
                                // "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({"author": data.data?.authorId})
                    }
                )
                const result = await response.json()
                    console.log(result)
                    if(response.status == 200){
                        notify(result.message)
                        setBlogs( result.blogs.data)
                        totalNumber.current += result.blogs.metadata[0].totalCount
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
        fetchBlogs()
    },[data, currentPage, pageSize])

    console.log("data",data.data.authorId)

    return (
        <>
            <div className="flex justify-center m-4">
                <div className="bg-[#D9EAFD] w-[75%] transition duration-300 ease-in-out rounded-md text-center hover:scale-[1.025]">
                    title
                    {/* {data.data?.authorId} */}
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
        </>
    )
}

export default AuthorBlog