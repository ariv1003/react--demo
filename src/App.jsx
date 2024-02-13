import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from "./pages/Login"
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Post from './pages/Post';
import Blog from './pages/Blog';
import Navbar from './pages/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "./context/authContext"
import Home from './pages/Home';

function App() {

  const [userToken, setUserToken] = useState(undefined)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(undefined)
  const [userId, setUserId] = useState(undefined);

  const handleLogout = () => {
    localStorage.removeItem("usertoken");
    setIsUserLoggedIn(false)
  }
  const handleLogin = () => {
    setIsUserLoggedIn(true)
  }

  useEffect(() => {
    if (window) {
      const data = localStorage?.getItem("usertoken")
      const parsedData = JSON?.parse(data) ?? {}
      setUserToken(parsedData?.token ?? '');
      setUserId(parsedData.id ?? "")
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
      <AuthContext.Provider value={{ isUserLoggedIn, userToken, handleLogout, userId, handleLogin }}>
        <BrowserRouter>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Home />} /> {/* for guest users to see all the blogs and posts*/}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-blog" element={<Dashboard />} />
            <Route path='/blog/:id' element={<Blog />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}

export default App
