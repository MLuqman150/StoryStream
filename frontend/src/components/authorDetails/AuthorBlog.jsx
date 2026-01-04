import { useEffect, useState, useRef } from "react"
import { toast } from 'react-toastify'; 
import PropTypes from 'prop-types'

const AuthorBlog = ({authorId}) =>{
    const [currentPage, setCurrentPage] = useState(1)
    let pageSize = 5
    // let totalNumber = useRef(0)
    let [totalNumber, setTotalNumber] = useState(0)

    const [blogs, setBlogs] = useState([])

    const notify = (message) => {
                toast(message);
    }

    useEffect(()=>{
        if (!authorId) return;
        const fetchBlogs = async() =>{
            try{
                const response = await fetch(`http://localhost:3000/blog/getBlogByAuthor/${authorId}?page=${currentPage}&pageSize=${pageSize}`,
                    { 
                        method: "GET",
                        headers: {
                                "Content-Type": "application/json",
                                // "Authorization": `Bearer ${token}`
                        },
                        // body: JSON.stringify({"author": data.data?.authorId})
                    }
                )
                const result = await response.json()
                    console.log(result)
                    if(response.status == 200){
                        notify(result.message)
                        setBlogs(result.blogs[0].data)
                        setTotalNumber(result.blogs[0].metadata.totalCount)
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
    },[authorId, currentPage, pageSize])

    // console.log("data in author blog: ",authorId)

    const increment = () => {
        setCurrentPage(prev => {
            const totalPages = Math.ceil(totalNumber / pageSize); // totalCount must be state, not ref
            return prev < totalPages ? prev + 1 : prev;
        });
    }

    const decrement = () => {
        setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
    }

    return (
        <>
            <div className="flex justify-center m-4 flex-col">
                <div className="bg-[#D9EAFD] w-[75%] transition duration-300 ease-in-out rounded-md text-center hover:scale-[1.025]">
                    title
                    {/* {data.data?.authorId} */}
                    
                </div>
                <div className="flex justify-center">
                    <button className="text-blue-500 cursor-pointer px-2 text-sm font-bold" onClick={decrement} >Previous</button>
                    <div className="text-sm font-bold">{currentPage}</div>
                    <button className="text-blue-500 cursor-pointer px-2 text-sm font-bold" onClick={increment}>Next</button>
                </div>
                
            </div>
        </>
    )
}

AuthorBlog.propTypes = {
  authorId: PropTypes.string.isRequired
}

export default AuthorBlog