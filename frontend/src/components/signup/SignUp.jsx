import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";


// toast.configure();

function SignUp() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm();

    const navigate = useNavigate();

    const notify = (message) => {
        toast(message);
    }

    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:5000/auth/signup",
                {
                    method: "POST",
                    body: data
                }
            )

            if (response.status == 200) {
                await notify(response.message)
                navigate('/home')
            }

            console.log(response);

        }

        catch (error) {
            notify(error.message)
            setError("root", {
                message: error.message
            })
        }
        console.log(data);
    }

    return (
        <div className="flex h-screen items-center justify-center bg-[#]">
            <div className="w-[40%] h-auto  rounded-xl flex flex-col items-center justify-center p-4 bg-[#D9EAFD]">

                <h1 className="font-bold text-2xl">Sign Up </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex align-center justify-center flex-col">

                    <div className="flex justify-center">
                        <label htmlFor="name" className="font-bold mr-4 mt-5">Name: </label>
                        <input id="name" type="text" {...register("name", { required: "Name is required" })} placeholder="Name" className="w-[60%] p-2 rounded-xl mt-4" aria-invalid={errors.name ? "true" : "false"} />
                    </div>
                    {errors.name && <div className="text-red-500 text-center">{errors.name.message}</div>}

                    <div className="flex justify-center">
                        <label htmlFor="email" className="font-bold mr-4 mt-5">Email: </label>
                        <input id="email" type="email" {...register("email", {
                            required: "Email Address is required", validate: (value) => {
                                if (!value.includes('@') || !value.includes('.com')) {
                                    return "Email format is invalid"
                                }
                            }
                        })} placeholder="Email" className="w-[60%] p-2 rounded-xl mt-4" aria-invalid={errors.mail ? "true" : "false"} />
                    </div>
                    {errors.email && <div className="text-red-500 text-center">{errors.email.message}</div>}

                    <div className="flex justify-center">
                        <label htmlFor="password" className="font-bold mr-4 mt-5">Password: </label>
                        <input id="password" type="password" {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters long" } })} placeholder="Password" className="w-[60%] p-2 rounded-xl mt-4" />
                    </div>
                    {errors.password && <div className="text-red-500 text-center">{errors.password.message}</div>}

                    <div className="flex justify-center">
                        {/* <input type="submit" className="bg-blue-500 text-white p-2 rounded-xl mt-4 w-[40%] hover:bg-blue-600 hover:cursor-pointer" /> */}
                        <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white p-2 rounded-xl mt-4 w-[40%] hover:bg-blue-600 hover:cursor-pointer" >
                            {isSubmitting ? 'loading...' : 'Submit'}
                        </button>
                    </div>

                    {/* {errors.root && <div className="text-red-500 text-center">{errors.root.message}</div>} */}
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

                <p className="mt-4">Already have an account. <Link to="/" className="underline hover:text-red-600">Login</Link> </p>
            </div>

        </div>
    )
}

export default SignUp
