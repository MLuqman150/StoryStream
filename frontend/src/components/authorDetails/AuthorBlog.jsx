import { useEffect } from "react" 

const AuthorBlog = (data) =>{

    useEffect(()=>{

    },[data])

    console.log("data",data.data.authorId)

    return (
        <>
            <div className="flex justify-center m-4">
                <div className="bg-[#D9EAFD] w-[75%] transition duration-300 ease-in-out rounded-md text-center hover:scale-[1.025]">
                    title
                    {/* {data.data?.authorId} */}
                </div>
            </div>
        </>
    )
}

export default AuthorBlog