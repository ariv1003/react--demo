import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Navbar() {
    const { isUserLoggedIn } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("userauth");
        window.location.reload()
    };

    return (
        <nav className="shadow bg-white border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div>
                    <Link to={"/"} className="font-medium text-sm">
                        Home
                    </Link>
                    {typeof isUserLoggedIn !== "undefined" && isUserLoggedIn && (
                        <Link to={"/dashboard"} className="ml-5 font-medium text-sm">
                            Dashboard
                        </Link>
                    )}
                </div>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    {typeof isUserLoggedIn !== "undefined" && !isUserLoggedIn && (
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                            <li>
                                <NavLink
                                    to="/sign-in"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-blue-900 font-bold text-sm"
                                            : "text-sm text-black"
                                    }
                                >
                                    Sign in
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/sign-up"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-blue-900 font-bold text-sm"
                                            : "text-sm text-black"
                                    }
                                >
                                    Sign Up
                                </NavLink>
                            </li>
                        </ul>
                    )}
                    {typeof isUserLoggedIn !== "undefined" && isUserLoggedIn && (
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                            <li
                                onClick={handleLogout}
                                className="cursor-pointer text-blue-900 font-bold text-sm text-black"
                            >
                                Logout
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
