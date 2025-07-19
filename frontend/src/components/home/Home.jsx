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

function Home() {

    const {token, logout} = useAuth()

    const navigate = useNavigate();
    
    const notify = (message) => {
            toast(message);
        }
    const [blogs, setBlogs] = useState([])
    
    useEffect(()=>{
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
                    notify(data.message)
                    setBlogs(data.blogs)
                }
                else{
                    notify(data.message)
                }
            }
            catch(err){
                // if(err.message == "Invalid token"){
                //     logout()
                //     navigate("/")
                // }
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
                            <Link to="/articleDetails">
                                <h1 className='text-2xl font-bold font-mono text-blue-700 text-center hover:underline'>{blog.title}</h1>
                            </Link>
                            <p className='text-center'>{blog.content.split(" ").slice(0, 20).join(" ")}</p>
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
            
        </div>
    )
}

export default Home
