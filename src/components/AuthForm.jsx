import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { toast } from "react-toastify";

function AuthForm({ page }) {
    const navigate = useNavigate();
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    });
    const [SignUpDetails, setSignUpDetails] = useState({
        name: "",
        password: "",
        email: "",
    });
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (page === "signup" && regiesterValidation) {
            setIsSubmitted(true);
        } else {
            try {
                setIsLoading(true);
                const res = await axios.post(
                    "https://react-api-fp0j.onrender.com/api/login",
                    loginDetails
                );
                toast.success("Logged in Successfully !", {
                    position: "bottom-right",
                });
                localStorage.setItem("userauth", JSON.stringify(res.data));
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000)
                setIsLoading(false);
                setIsSubmitted(false);
            } catch (error) {
                setIsLoading(false);
                setIsSubmitted(false);
                if (error.response.data) {
                    setError(error.response.data.message);
                }
            }
        }
    };

    const handleRegister = async () => {
        if (page !== "signup" && loginValidation) {
            setIsSubmitted(true);
        } else {
            try {
                setIsLoading(true);
                const res = await axios.post(
                    "https://react-api-fp0j.onrender.com/api/register",
                    SignUpDetails
                );
                setIsLoading(false);
                if (res.status === 201) {
                    toast.success("Registered Successfully !", {
                        position: "bottom-right",
                    });
                    navigate("/");
                }
                setIsSubmitted(false);
            } catch (error) {
                setIsLoading(false);
                setIsSubmitted(false);
                if (error.response.data) {
                    setError(error.response.data.message);
                }
            }
        }
    };

    function handleUserDetails(e) {
        if (page === "signup") {
            setSignUpDetails({
                ...SignUpDetails,
                [e.target.name]: e.target.value,
            });
        } else {
            setLoginDetails({
                ...loginDetails,
                [e.target.name]: e.target.value,
            });
        }
    }

    const regiesterValidation =
        !SignUpDetails.email || !SignUpDetails.name || !SignUpDetails.password;
    const loginValidation = !loginDetails.email || !loginDetails.password;

    return (
        <div className="bg-[#D6D6D6] max-w-screen h-screen flex justify-center items-center">
            <div className="flex-col items-center">
                <h1 className="text-4xl	font-bold text-[#224957] text-center">
                    {page === "signup" ? "Sign Up" : "Sign In"}
                </h1>
                <p className="text-base	font-regular mt-8">
                    {page === "signup"
                        ? "Sign up and start managing your candidates!"
                        : "Sign In to view results"}
                </p>
                {page === "signup" && (
                    <div className="mt-6">
                        <label
                            for="first_name"
                            className="block mb-2 text-sm font-medium text-black"
                        >
                            Name
                        </label>
                        <input
                            name="name"
                            onChange={handleUserDetails}
                            type="text"
                            id="first_name"
                            className="bg-[#224957] min-w-[300px] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Enter your Name"
                            required
                        />
                    </div>
                )}
                <div className="mt-6">
                    <label
                        for="email"
                        className="block mb-2 text-sm font-medium text-black"
                    >
                        Email
                    </label>
                    <input
                        name="email"
                        onChange={handleUserDetails}
                        type="text"
                        id="email"
                        className="bg-[#224957]  min-w-[300px] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="mt-6">
                    <label
                        for="password"
                        className="block mb-2 text-sm font-medium text-black"
                    >
                        Password
                    </label>
                    <input
                        name="password"
                        onChange={handleUserDetails}
                        type="text"
                        id="password"
                        className="bg-[#224957] min-w-[300px] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <h1 className="my-2 font-semibold text-red-700 text-md">
                    {error ? error : ""}
                </h1>

                {page === "signup" && regiesterValidation && isSubmitted && (
                    <h1 className="my-2 font-semibold text-red-700 text-md">
                        Please fill all the fields
                    </h1>
                )}

                {page !== "signup" && loginValidation && isSubmitted && (
                    <h1 className="my-2 font-semibold text-red-700 text-md">
                        Please fill all the fields
                    </h1>
                )}
                <div className="mt-3 flex justify-end">
                    {page === "signup" ? (
                        <h1>
                            Already having an account?{" "}
                            <Link className="text-blue-600" to="/">
                                Login
                            </Link>
                        </h1>
                    ) : (
                        <h1>
                            No Account?{" "}
                            <Link className="text-blue-600" to="/signup">
                                Create One
                            </Link>
                        </h1>
                    )}
                </div>
                <button
                    onClick={page === "signup" ? handleRegister : handleLogin}
                    className="bg-[#20DF7F] w-full mt-8 py-3 flex justify-center font-semibold text-sm rounded-lg"
                >
                    {isLoading ? <Loader /> : page === "signup" ? "Sign Up" : "Login"}
                </button>
            </div>
        </div>
    );
}

export default AuthForm;
