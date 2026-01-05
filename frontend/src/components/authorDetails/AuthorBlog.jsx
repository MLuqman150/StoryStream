import { useEffect, useState, useRef } from "react"
import { toast } from 'react-toastify'; 
import PropTypes from 'prop-types'
import { useLoading } from '../../context/LoadingContext';
import { Link } from 'react-router-dom';

const AuthorBlog = ({authorId}) =>{

    const { showLoading, hideLoading} = useLoading()

    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 5
    // let totalNumber = useRef(0)
    let [totalNumber, setTotalNumber] = useState(0)

    const [blogs, setBlogs] = useState([])

    const notify = (message) => {
                toast(message);
    }

    // useEffect to reset state on authorId change
    useEffect(()=>{
        setCurrentPage(1)
        setBlogs([])
        setTotalNumber(0)
    },[authorId])

    // useEffect to fetch blogs
    useEffect(()=>{
        if (!authorId) return;
        showLoading()
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
                        hideLoading()
                        setBlogs(result.blogs[0].data)
                        setTotalNumber(result.blogs[0].metadata.totalCount)
                        if(currentPage === 1){
                            notify(result.message)
                        }
                    }
                    else{
                        hideLoading()
                        notify(result.message)
                    }
            }
            catch(err){
                    hideLoading()
                    notify(err.message)
                    console.log(err)
                }
        }
        fetchBlogs()
    },[currentPage])

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

            {
                blogs.length === 0 ?
                    <div className="cursor-pointer flex justify-center m-4 text-blue-500 hover:text-blue-600 hover:font-bold transition duration-300 ease-in-out">No blog posted Yet!</div>
                    :
                    <div className="flex justify-center self-center items-center sm:w-full md:w-[80%] m-4 flex-col">
                        <div className="bg-[#D9EAFD] w-[75%] transition duration-300 ease-in-out rounded-md text-center hover:scale-[1.025]">
                            {blogs.map((blog,index)=>{
                                return(
                                    <div key={index} className="flex justify-center flex-col m-2">
                                        <img src={blog.image ? `http://localhost:3000/`+blog.image.replace("/uploads/", ""): ""} alt={blog.title} className='w-[98%] m-2 h-auto rounded-xl sm:h-auto' />
                                        <div>
                                            <Link to={`/articleDetails/${blog.slug}`}>
                                                <h1 className='text-2xl font-bold font-mono text-blue-700 text-center hover:underline'>{blog.title}</h1>
                                            </Link>
                                            <p className='text-center'>{blog.content.split(" ").slice(0, 20).join(" ")}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            
                        </div>
                        <div className="flex justify-center m-2">
                            <button className="text-blue-500 cursor-pointer px-2 text-sm font-bold" onClick={decrement} disabled={currentPage === 1 || totalNumber === 0}>Previous</button>
                            <div className="text-sm font-bold">{currentPage}</div>
                            <button className="text-blue-500 cursor-pointer px-2 text-sm font-bold" onClick={increment} disabled={currentPage === Math.ceil(totalNumber / pageSize) || totalNumber === 0 || blogs.length === 0}>Next</button>
                        </div>
                        
                    </div>
                    
                    }
            
        </>
    )
}

AuthorBlog.propTypes = {
  authorId: PropTypes.string.isRequired
}

export default AuthorBlog