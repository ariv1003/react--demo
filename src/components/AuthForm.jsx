import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import { toast } from 'react-toastify';

function AuthForm({ page }) {
       const [loginDetails, setLoginDetails] = useState({
              email: "",
              password: "",
       });
       const [signUpDetails, setSignUpDetails] = useState({
              name: "",
              email: "",
              password: ""
       });

       const [error, setError] = useState("");

       const [isLoading, setIsLoading] = useState(false);

       const loginValidation = !loginDetails.email || !loginDetails.password;
       const signupValidation = !signUpDetails.name || !signUpDetails.email || !signUpDetails.password;

       const [isSubmitted, SetIsSubmitted] = useState(false);

       const navigate = useNavigate();

       const registerUser = async () => {
              if (page === "signup" && signupValidation) {
                     SetIsSubmitted(true);
              }
              else {
                     try {
                            setIsLoading(true);
                            const res = await axios.post(
                                   "https://react-api-fp0j.onrender.com/api/register",
                                   signUpDetails
                            );
                            setIsLoading(false);
                            if (res.status === 201) {
                                   toast.success("Registered Successfully !", {
                                          position: "bottom-right"
                                   });
                                   navigate("/")
                            }
                            SetIsSubmitted(false);
                     } catch (error) {
                            setIsLoading(false);
                            SetIsSubmitted(false);
                            if (error.response.data) {
                                   setError(error.response.data.message);
                            }

                     }
              }
       }

       const loginUser = async () => {
              if (page === "login" && loginValidation) {
                     SetIsSubmitted(true);
              }
              else {
                     try {
                            setIsLoading(true);
                            const res = await axios.post(
                                   "https://react-api-fp0j.onrender.com/api/login",
                                   loginDetails
                            );
                            setIsLoading(false);
                            if (res.status === 200) {
                                   toast.success("Logged In Successfully !", {
                                          position: "bottom-right"
                                   });
                                   navigate("/dashboard")
                                   localStorage.setItem("usertoken",JSON.stringify(res.data))
                            }
                            SetIsSubmitted(false);
                     } catch (error) {
                            setIsLoading(false);
                            SetIsSubmitted(false);
                            if (error.response.data) {
                                   setError(error.response.data.message);
                            }

                     }
              }
       }

       function handleUserInputs(e) {
              if (page == "login") {
                     setLoginDetails({
                            ...loginDetails,
                            [e.target.name]: e.target.value,
                     })
              } else {
                     setSignUpDetails({
                            ...signUpDetails,
                            [e.target.name]: e.target.value,
                     })
              }
       }

       return (

              // In order to use justify-center or any other flex-related utility classes in Tailwind CSS, 
              // you need to apply the flex class to the container. 
              //The flex class sets the display property of the element to flex, making it a flex container.

              <div className='bg-[#D6D6D6] 
                        w-screen 
                        h-screen 
                        flex justify-center	items-center'>
                     {/*// unlike Rn wherein flex-col is default, here flex-col need to be set manually */}

                     <div className='flex-col '>

                            <h1 className='text-center 
                             text-[#224957] 
                             text-4xl 
                             font-bold'>{page === "signup" ? "Sign Up" : "Sign In"}</h1>

                            <p className='font-normal 
                            text-base 
                            text-[#224957] 
                            pt-8 
                            tracking-wider'>{page === "signup" ? "Sign up and start managing your candidates!" : "Sign in and start managing your candidates!"}</p>

                            {/* the child won't inhert the flex properties. So you have to specify the flex properties for children div */}
                            <div className='flex justify-center	items-center'>
                                   <div className='flex-col'>
                                          {page == "signup" && <div className='mt-6'>

                                                 <label htmlFor="name"
                                                        className="block 
                                         text-sm 
                                         font-medium 
                                         mb-2 text-black ">Name</label>

                                                 <input type="text"
                                                        className="py-3 px-4 block w-72 font-regular text-white placeholder-white border-gray-200 bg-[#224957] rounded-lg text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                                                        placeholder="Enter your name"
                                                        name="name"
                                                        id="name"
                                                        onChange={handleUserInputs} />
                                          </div>}
                                          <div className='mt-2'>

                                                 <label htmlFor="email"
                                                        className="block 
                                    text-sm 
                                    font-medium 
                                    mb-2 text-black ">Email</label>

                                                 <input type="text"
                                                        className="py-3 px-4 block w-72 font-regular text-white placeholder-white border-gray-200 bg-[#224957] rounded-lg text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                                                        placeholder="Enter your email"
                                                        name="email"
                                                        id="email"
                                                        onChange={handleUserInputs} />
                                          </div>
                                          <div className='mt-2'>
                                                 <label htmlFor="password"
                                                        className="block 
                                    text-sm 
                                    font-medium 
                                    mb-2 
                                    text-black ">Password</label>

                                                 <input type="text"
                                                        className="py-3 px-4 block w-72 font-regular text-white placeholder-white border-gray-200 bg-[#224957] rounded-lg text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                                                        placeholder="Enter your password"
                                                        name="password"
                                                        id="password"
                                                        onChange={handleUserInputs} />
                                          </div>
                                          <h1 className='text-red-800 text-xs'>{error ? error : ""}</h1>
                                          {page === "signup" && signupValidation && isSubmitted && <h1 className='text-red-800 text-xs'>Please enter the all the details</h1>}
                                          {page !== "signup" && loginValidation && isSubmitted && <h1 className='text-red-800 text-xs'>Please enter the all the details</h1>}
                                          <div className='flex justify-end mt-9'>
                                                 {page == "signup" ? <p className='text-black 
                                 font-medium 
                                 text-sm'>Already having an account? <Link className='text-blue-600' to="/">Login</Link></p>
                                                        : <p className='text-black 
                                font-medium 
                                text-sm'>Don't have an account? <Link className='text-blue-600' to="/signup">Sign Up</Link></p>}
                                          </div>
                                          {page == "login" ?

                                                 <button
                                                        // disabled={signupValidation}
                                                        className={`${loginValidation ? " bg-[#bcf5d9] text-[#6caec6]" : "cursor-pointer bg-[#20DF7F] text-[#224957]"}
                                       text-base 
                                       w-full 
                                       font-regular 
                                       rounded-lg 
                                       py-2 px-2 
                                       mt-5 flex justify-center`}

                                                        onClick={loginUser}>{isLoading === true ? <Loader /> : "Sign In"}</button>
                                                 : <button className={`${signupValidation ? " bg-[#bcf5d9] text-[#6caec6]" : "cursor-pointer bg-[#20DF7F] text-[#224957]"}
                                  text-base 
                                  w-full 
                                  font-regular 
                                  rounded-lg 
                                  py-2 px-2 
                                  mt-5 flex justify-center`}
                                                        // disabled={signupValidation}
                                                        onClick={registerUser}>{isLoading === true ? <Loader /> : "Sign Up"}</button>}
                                   </div>
                            </div>
                     </div>
              </div>
       )
}

export default AuthForm;