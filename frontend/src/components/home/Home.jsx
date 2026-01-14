import React,{useEffect,useState} from 'react'
import Navbar from '../Navbar/Navbar'
// import bundeno  from '../../assets/bundeno.png'
// import { BiLike, BiDislike } from "react-icons/bi";
// import { FaRegCommentAlt } from "react-icons/fa";
// import { CiShare2 } from "react-icons/ci";
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {FaArrowUp} from "react-icons/fa"
import { useLoading } from '../../context/LoadingContext';

function Home() {

    const [showButton, useShowButton] = useState(false)

    const {showLoading, hideLoading} = useLoading()

    const onScroll = () =>{
        window.scrollY > 500 ? useShowButton(true) : useShowButton(false)
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    })

    const scrollToTop = () =>{
        window.scrollTo({top: 0, behavior: "smooth"})
    }

    const {token, logout} = useAuth()

    const navigate = useNavigate();
    
    const notify = (message) => {
            toast(message);
        }
    const [blogs, setBlogs] = useState([])
    
    useEffect(()=>{
        showLoading()
        const fetchBlogs = async () =>{
            try{
                const response = await fetch("http://localhost:3000/blog/getAllBlogs",
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
                    hideLoading()
                    notify(data.message)
                    setBlogs(data.blogs)
                }
                else if(response.status == 401){
                    logout()
                    navigate("/")
                }
                else{
                    hideLoading()
                    notify(data.message)
                }
            }
            catch(err){
                // if(err.message == "Invalid token"){
                //     logout()
                //     navigate("/")
                // }
                hideLoading()
                notify(err.message)
                console.log(err)
            }    
        }
        fetchBlogs()
        
    },
    [token]   
    )


    return (
        <div>
            <Navbar />
            {
                blogs ? blogs.map((blog,index)=> (
                    <div key={index} className='flex justify-center sm:w-full md:w-[60%] items-center flex-col  bg-[#D9EAFD] rounded-xl h-auto p-2 mb-4 mx-auto'>
            
                        <img src={blog.image ? `http://localhost:3000/`+blog.image.replace("/uploads/", ""): ""} alt={blog.title} className='w-full m-2 h-auto rounded-xl sm:h-auto' />
                        <div>
                            <Link to={`/articleDetails/${blog.slug}`}>
                                <h1 className='text-2xl font-bold font-mono text-blue-700 text-center hover:underline'>{blog.title}</h1>
                            </Link>
                            <p className='text-center' dangerouslySetInnerHTML={{__html: blog.content.split(" ").slice(0, 10).join(" ")}}></p>
                            <div className='flex m-2'> 
                            {/* <BiLike className='mx-1 text-blue-700 cursor-pointer' />
                            <BiDislike className='mx-1 text-blue-700 cursor-pointer' />
                            <FaRegCommentAlt className='mx-1 text-blue-700 cursor-pointer' /> */}
                            {/* <CiShare2 className='mx-1 text-blue-700 cursor-pointer  ' /> */}
                            </div>
                        </div>
            
                    </div>
                    )
                ) : <div className="text-center m-4 text-lg font-extrabold cursor-pointer"> No Blog Found. </div> 
            }

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
        	<Link to="/createBlog">
                <div className='right-2 bottom-2 text-4xl font-bold text-white bg-blue-500 hover:bg-blue-600 cursor-pointer p-2 rounded-full w-16 h-16 text-center fixed'>+</div>
            </Link>
            <FaArrowUp onClick={scrollToTop} className={showButton ? "fixed bottom-20 right-2 text-white bg-blue-500 hover:bg-blue-600 cursor-pointer p-2 rounded-full w-10 h-10 text-center" : "hidden"}/>
            
        </div>
    )
}

export default Home
