import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
function Navbar() {
    const { isUserLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("usertoken");
        window.location.reload();
    }

    return (
        <nav className=" shadow bg-white border-gray-200 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div>
                    <Link to="/" className='font-medium text-sm'>Home</Link>
                    {isUserLoggedIn && typeof isUserLoggedIn !== "undefined" && <Link to="/dashboard" className='mx-5 font-medium text-sm'>DashBoard</Link>}
                    
                </div>

                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    {!isUserLoggedIn && typeof isUserLoggedIn !== "undefined" ? <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
                        <li>
                            <NavLink to="/signin" className={({ isActive }) => isActive ? "text-blue-500 font-bold text-sm" : "text-sm text-black font-bold"}>Sign In</NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup" className={({ isActive }) => isActive ? "text-sm text-blue-500 font-bold" : "text-black font-bold text-sm"}>Sign Up</NavLink>
                        </li>
                    </ul> :
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
                            <li
                                className=" cursor-pointer text-blue-500 font-bold text-sm"
                                onClick={handleLogout}>LogOut
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </nav>

    )
}

export default Navbar;