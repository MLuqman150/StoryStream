import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        navigate("/");
    }

    return (
        <div className="m-4 w-[90%] flex justify-between overflow-hidden">
            <h1 className="text-2xl font-bold font-mono">StoryStream</h1>
            <ul className="flex justify-between w-[30%]">
                <Link to="/home"><li className="cursor-pointer hover:font-bold">Home</li></Link>
                <Link to="/home"><li className="cursor-pointer hover:font-bold">Following</li></Link>
                <Link to="/home"><li className="cursor-pointer hover:font-bold">Settings</li></Link>
            </ul>
            <button className="bg-blue-500 text-white p-2 rounded-md font-bold hover:bg-blue-600 hover:cursor-pointer" onClick={logout}>Logout</button>
        </div>
    )
}

export default Navbar