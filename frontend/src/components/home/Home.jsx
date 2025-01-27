import React from 'react'
import Navbar from '../Navbar/Navbar'

function Home() {
    return (
        <div>
            <Navbar />
            <div className='flex justify-center sm:w-full md:w-[80%] items-center flex-col m-auto bg-[#D9EAFD] rounded-xl h-auto p-2'>
                <h1 className='text-2xl font-bold font-mono text-blue-700'>Bun vs Deno</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, incidunt dolor hic sunt aut, officiis aliquid vel illum alias, voluptates veritatis nihil tempora pariatur in voluptatibus temporibus dolore consequuntur! Saepe excepturi accusamus tenetur mollitia, neque eum culpa id aut eveniet dolor sed, eius deserunt sit debitis laborum aspernatur itaque ullam.</p>
            </div>
        </div>
    )
}

export default Home
