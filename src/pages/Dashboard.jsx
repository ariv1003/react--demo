import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';

function Dashboard() {

  const [isDark, setIsDark] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();


  // async await is used to resolve the preomise returned by axios. 
  //If it is not used, the output of console log will be promise not the response data
  const getPost = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    setData(res.data)
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className={`${isDark ? "bg-black text-white" : "bg-white text-black"} h-screen w-screen m-5`}>
      <h1>Mode {isDark == true ? "dark" : "light"}</h1>
      <button className={`${!isDark ? "bg-black text-white" : "bg-white text-black"} rounded-lg p-3 m-3 font-semibold`} onClick={() => setIsDark(!isDark)}>Change Mode</button>
      <div className='mt-5 grid grid-cols-6' >  
      {/*slicing is done to minimise the amount of data. grid is used for sepearting the items*/ }
        {data.slice(0,10).map((item, index)=>(
          <div key={item.id} className='bg-red-100 m-5 p-5'>
            <h1 className='text-black font-bold mb-2'>{item.title}</h1>
            <p>{item.body}</p>
            {/*we can also use link for redirecting to that particular post, 
            but the thing is that Link can't be used wherein we need to format the data via function*/}
            <button onClick={()=>navigate(`/post/${item.id}`)} className='bg-white p-2 mt-2 rounded-lg'>View More</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;