import React,{useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from "./pages/Login"
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Post from './pages/Post';
import Navbar from './pages/Navbar';
import 'react-toastify/dist/ReactToastify.css';
function App() {

   return (
    //whatever we put here in app.js file, will be displayed in all the pages. (above browser router)
    <>
    
    <BrowserRouter>
    <ToastContainer/>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path='/post/:id' element={<Post/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
