import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Post from "./pages/Post";
import Navbar from "./components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from "./context/authContext"

function App() {

  const [userToken, setUserToken] = useState(undefined)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(undefined)

  useEffect(() => {
    if (window) {
      const data = localStorage?.getItem("userauth")
      const parsedData = JSON?.parse(data) ?? {}
      setUserToken(parsedData?.token ?? '');
    }
  }, [])

  useEffect(() => {
    if (typeof userToken !== "undefined") {
      if (userToken) {
        setIsUserLoggedIn(true)
      }
      else {
        setIsUserLoggedIn(false)
      }
    }
  }, [userToken])

  return (
    <>
      <AuthContext.Provider value={{ isUserLoggedIn, userToken }}>
        <BrowserRouter>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
