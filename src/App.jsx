import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from "./pages/Login"
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Post from './pages/Post';
import Navbar from './pages/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "./context/authContext"

function App() {

  const [userToken, setUserToken] = useState(undefined)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(undefined)


  useEffect(() => {
    if (window) {
      const data = localStorage?.getItem("usertoken")
      const parsedData = JSON?.parse(data) ?? {}
      setUserToken(parsedData?.token ?? '');
    }
  }, [])

  useEffect(() => {
    if (typeof userToken !== "undefined") {
      if (userToken) {
        setIsUserLoggedIn(true)
        console.log(isUserLoggedIn)
      }
      else {
        setIsUserLoggedIn(false)
        console.log(isUserLoggedIn);
      }
    }
  }, [userToken])


  return (
    //whatever we put here in app.js file, will be displayed in all the pages. (above browser router)
    <>
      <AuthContext.Provider value={{ isUserLoggedIn, userToken, setUserToken, setIsUserLoggedIn }}>
        <BrowserRouter>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/post/:id' element={<Post />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}

export default App
