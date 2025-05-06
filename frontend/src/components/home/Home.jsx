import React,{useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import bundeno  from '../../assets/bundeno.png'
import { BiLike, BiDislike } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
// import { CiShare2 } from "react-icons/ci";
import { Link } from 'react-router-dom';

function Home() {

    // useEffect()


    return (
        <div>
            <Navbar />
            
            <div className='flex justify-center sm:w-full md:w-[60%] items-center flex-col m-auto bg-[#D9EAFD] rounded-xl h-auto p-2'>
            
                <img src={bundeno} alt="bundeno" className='w-full m-2 h-auto rounded-xl sm:h-auto' />
                <div>
                    <Link to="/articleDetails">
                        <h1 className='text-2xl font-bold font-mono text-blue-700 text-center hover:underline'>Bun vs Deno</h1>
                    </Link>
                    <p className='text-center'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime assumenda et distinctio, at officiis, earum cum delectus corporis ratione odio deserunt, nostrum voluptatibus est ad doloribus consectetur inventore sed sint omnis quas rem libero. Mollitia quibusdam consequuntur veniam blanditiis maxime excepturi ipsam. Commodi quam ad accusantium fuga similique modi atque. Saepe excepturi accusamus tenetur mollitia, neque eum culpa id aut eveniet dolor sed, eius deserunt sit debitis laborum aspernatur itaque ullam.</p>
                <div className='flex m-2'> 
                    <BiLike className='mx-1 text-blue-700 cursor-pointer' />
                    <BiDislike className='mx-1 text-blue-700 cursor-pointer' />
                    <FaRegCommentAlt className='mx-1 text-blue-700 cursor-pointer' />
                    {/* <CiShare2 className='mx-1 text-blue-700 cursor-pointer  ' /> */}
                </div>
                </div>
            
            </div>
        	<Link to="/createBlog">
                <div className='right-2 bottom-2 text-4xl font-bold text-white bg-blue-500 hover:bg-blue-600 cursor-pointer p-2 rounded-full w-16 h-16 text-center fixed'>+</div>
            </Link>
            
        </div>
    )
}

export default Home
