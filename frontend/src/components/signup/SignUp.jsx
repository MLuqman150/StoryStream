import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'

function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {

        console.log(data);
    }


    return (
        <div className="flex h-screen items-center justify-center bg-[#]">
            <div className="w-[40%] h-[60%]  rounded-xl flex flex-col items-center justify-center p-4 bg-[#D9EAFD]">
                <h1 className="font-bold text-2xl">Sign Up </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex align-center justify-center flex-col">
                    <div className="flex justify-center">
                        <label htmlFor="email" className="font-bold mr-4 mt-5">Email: </label>
                        <input id="email" type="email" {...register("email", { required: "Email Address is required" })} placeholder="Email" className="w-[60%] p-2 rounded-xl mt-4" aria-invalid={errors.mail ? "true" : "false"} />
                    </div>
                    {errors.email && <div className="text-red-500 text-center">{errors.email.message}</div>}

                    <div className="flex justify-center">
                        <label htmlFor="password" className="font-bold mr-4 mt-5">Password: </label>
                        <input id="password" type="password" {...register("password", { required: "Password is required" })} placeholder="Password" className="w-[60%] p-2 rounded-xl mt-4" />
                    </div>
                    {errors.password && <div className="text-red-500 text-center">{errors.password.message}</div>}
                    <div className="flex justify-center">
                        <input type="submit" className="bg-blue-500 text-white p-2 rounded-xl mt-4 w-[40%] hover:bg-blue-600 hover:cursor-pointer" />
                    </div>

                </form>

                <p className="mt-4">Already have an account. <Link to="/login" className="underline hover:text-red-600">Login</Link> </p>
            </div>

        </div>
    )
}

export default SignUp
