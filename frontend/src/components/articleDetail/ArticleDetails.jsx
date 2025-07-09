import React from "react"
import Navbar from "../Navbar/Navbar"
import bundeno  from '../../assets/bundeno.png'

const ArticleDetails = () => {
    return (
        <>
            <Navbar/>
            <div>
                <div className="text-center p-5">
                    <h2 className="font-bold text-3xl">I am Heading ....</h2>
                </div>
                <div className="flex justify-center  w-[100%] h-auto p-5"> 
                    <img src={bundeno} alt="" className=" md:w-[70%] h-auto rounded-md border-2 border-blue-500 hover:scale-105 cursor-pointer sm:w-[100%]" />
                </div>
                <div className="p-2 text-center mx-8 ">
                    <p className="text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat et sint, ratione at magnam molestias minima sit, assumenda doloribus id, laudantium perspiciatis atque! Saepe quae temporibus blanditiis ipsa quos cum quod quasi natus sed, tempore autem cumque repudiandae dolor! Porro ullam iusto, dignissimos dicta perferendis mollitia doloribus nisi in unde totam magnam, quo repellendus ducimus necessitatibus nulla laboriosam sequi ipsa possimus id eius et aperiam, alias adipisci? Laudantium nihil eum porro similique itaque maxime expedita at sequi rerum nesciunt distinctio magni, nobis facere aliquid iste quaerat incidunt asperiores neque totam assumenda. Temporibus animi facere debitis repudiandae aperiam vero tenetur minus?</p>
                </div>
            </div>
        </>           
    )
}

export default ArticleDetails