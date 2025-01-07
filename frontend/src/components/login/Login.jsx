
const Login = () => {
    return (
        <div className="flex h-screen items-center justify-center ">
            <div className="w-[40%] rounded-xl flex flex-col items-center p-4 bg-[#D9EAFD]">
                <h1 className="font-bold text-2xl">Login </h1>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" />
            </div>

        </div>
    )
}

export default Login