import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setError } = useForm();

    const navigate = useNavigate();

    const notify = (message) => {
        toast(message);
    }

    const onSubmit = async (data) => {
        try {
            console.log(isSubmitting)
            const response = await fetch("http://localhost:3000/auth/login",
                {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )

            const responseData = await response.json()

            console.log(responseData);

            if (response.status == 200 && responseData.message == "Login successful") {
                notify(responseData.message)
                setTimeout(() => {
                    navigate('/home')
                }, 2000)
            }

            else if (response.status == 200 && responseData.message != "Login successful") {
                notify(responseData.message)
                reset()
            }

        }

        catch (error) {
            console.log("Error: ", error);
            reset()
            notify(error.message)
            setError("root", {
                message: error.message
            })
        }
        console.log(data);
    }

    return (
        <div className="flex h-screen items-center justify-center bg-[#]">
            <div className="md:w-[40%] w-full h-auto  rounded-xl flex flex-col items-center justify-center p-4 bg-[#D9EAFD]">
                <h1 className="font-bold text-2xl">Login </h1>
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
                        <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white p-2 rounded-xl mt-4 w-[40%] hover:bg-blue-600 hover:cursor-pointer">
                            {isSubmitting ? 'loading...' : 'Submit'}
                        </button>
                    </div>

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
                </form>

                <p className="mt-4">Don&apos;t have an account. <Link to="/signup" className="underline hover:text-red-600">Sign Up</Link> </p>
            </div>

        </div>
    )
}

export default Login