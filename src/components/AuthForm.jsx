import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AuthForm({ page }) {
       const [loginDetails, setLoginDetails] = useState({
              email: "",
              password: "",
       });
       const [signUpDetails, setSignUpDetails] = useState({
              name: "",
              email: "",
              password: "",
       });

       const registerUser = async () => {
              try {
                     const res = await axios.post("http://restapi.adequateshop.com/swagger/ui/index#!/AuthAccount/AuthAccount_Registration", {
                            "name": signUpDetails.name,
                            "email": signUpDetails.email,
                            "password": signUpDetails.password,
                     });
                     console.log(res);
              } catch (error) {
                     console.log(error);
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

                                                 <label htmlFor="input-label"
                                                        className="block 
                                         text-sm 
                                         font-medium 
                                         mb-2 text-black ">Name</label>

                                                 <input type="text"
                                                        className="py-3 px-4 block w-72 font-regular text-white placeholder-white border-gray-200 bg-[#224957] rounded-lg text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                                                        placeholder="Enter your name"
                                                        name="name"
                                                        onChange={handleUserInputs} />
                                          </div>}
                                          <div className='mt-2'>

                                                 <label htmlFor="input-label"
                                                        className="block 
                                    text-sm 
                                    font-medium 
                                    mb-2 text-black ">Email</label>

                                                 <input type="text"
                                                        className="py-3 px-4 block w-72 font-regular text-white placeholder-white border-gray-200 bg-[#224957] rounded-lg text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                                                        placeholder="Enter your email"
                                                        name="email"
                                                        onChange={handleUserInputs} />
                                          </div>
                                          <div className='mt-2'>
                                                 <label htmlFor="input-label"
                                                        className="block 
                                    text-sm 
                                    font-medium 
                                    mb-2 
                                    text-black ">Password</label>

                                                 <input type="text"
                                                        className="py-3 px-4 block w-72 font-regular text-white placeholder-white border-gray-200 bg-[#224957] rounded-lg text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                                                        placeholder="Enter your password"
                                                        name="password"
                                                        onChange={handleUserInputs} />
                                          </div>
                                          <div className='flex justify-end mt-9'>
                                                 {page == "signup" ? <p className='text-black 
                                 font-medium 
                                 text-sm'>Already having an account? <Link className='text-blue-600' to="/">Login</Link></p>
                                                        : <p className='text-black 
                                font-medium 
                                text-sm'>Don't have an account? <Link className='text-blue-600' to="/signup">Sign Up</Link></p>}
                                          </div>
                                          {page == "login" ? <button className={`${!loginDetails.password || !loginDetails.email ? " bg-[#bcf5d9] text-[#6caec6]" : "cursor-pointer bg-[#20DF7F] text-[#224957]"}
                                       text-base 
                                       w-full 
                                       font-regular 
                                       rounded-lg 
                                       py-2 px-2 
                                       mt-5 `}

                                          >Sign In</button>
                                                 : <button className={`${!signUpDetails.password || !signUpDetails.email || !signUpDetails.name ? " bg-[#bcf5d9] text-[#6caec6]" : "cursor-pointer bg-[#20DF7F] text-[#224957]"}
                                  text-base 
                                  w-full 
                                  font-regular 
                                  rounded-lg 
                                  py-2 px-2 
                                  mt-5 `}
                                                        onClick={registerUser}>SignUp</button>}
                                   </div>
                            </div>
                     </div>
              </div>
       )
}

export default AuthForm;