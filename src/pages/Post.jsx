import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Post() {
    // UseParams() to get the detail of the corresponding page from the router path, 
    //we make use of useparams. ({id:1}). It is got from route

  

 const {id} = useParams();
 const [data,setData]=useState({});
 const getPost = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    setData(res.data);
  }

  useEffect(()=>{
    getPost();
  },[]);
  return (
    <div>
    <div className='bg-red-100 m-5 p-5'>
            <h1 className='text-black font-bold mb-2'>{data.title}</h1>
            <p>{data.body}</p>
    </div>
    </div>
  )
}

export default Post