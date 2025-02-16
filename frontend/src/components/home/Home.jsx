import React,{useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import bundeno  from '../../assets/bundeno.png'
import { BiLike, BiDislike } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";

function Home() {

    // useEffect()


    return (
        <div>
            <Navbar />
            <div className='flex justify-center sm:w-full md:w-[70%] items-center flex-row m-auto bg-[#D9EAFD] rounded-xl h-auto p-2'>
                <img src={bundeno} alt="bundeno" className='w-1/3 m-2 h-auto rounded-xl sm:h-auto' />
                <div>
                    <h1 className='text-2xl font-bold font-mono text-blue-700'>Bun vs Deno</h1>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime assumenda et distinctio, at officiis, earum cum delectus corporis ratione odio deserunt, nostrum voluptatibus est ad doloribus consectetur inventore sed sint omnis quas rem libero. Mollitia quibusdam consequuntur veniam blanditiis maxime excepturi ipsam. Commodi quam ad accusantium fuga similique modi atque. Saepe excepturi accusamus tenetur mollitia, neque eum culpa id aut eveniet dolor sed, eius deserunt sit debitis laborum aspernatur itaque ullam.</p>
                <div className='flex m-2'> 
                    <BiLike className='mx-1 text-blue-700 cursor-pointer' />
                    <BiDislike className='mx-1 text-blue-700 cursor-pointer' />
                    <FaRegCommentAlt className='mx-1 text-blue-700 cursor-pointer' />
                    {/* <CiShare2 className='mx-1 text-blue-700 cursor-pointer  ' /> */}
                </div>
                </div>
            </div>

        </div>
    )
}

export default Home
