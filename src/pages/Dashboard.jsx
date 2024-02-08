import React, { useEffect, useState,useContext } from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import { AuthContext } from "../context/authContext";

function Dashboard() {
  const { isUserLoggedIn } = useContext(AuthContext)
  
  const [isDark, setIsDark] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();


  // async await is used to resolve the preomise returned by axios. 
  //If it is not used, the output of console log will be promise not the response data


  useEffect(() => {
    if (typeof isUserLoggedIn !== "undefined" && !isUserLoggedIn) {
        navigate("/signin")
    }
}, [isUserLoggedIn])

  return (
    <></>
  )
}

export default Dashboard;