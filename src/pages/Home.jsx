import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

function Home() {

  const [blogs,setBlogs]=useState([]);

  const getAllBlogs = async () => {
    try {
      const res = await axios.get(`https://react-api-fp0j.onrender.com/api/blogs`);
      setBlogs(res?.data);
      console.log("res", res)
    }
    catch (error) {
      console.log("error", error);
    }
  }
  
  useEffect(()=>{
    getAllBlogs();
  },[]);
  
  return (
    <div>
      <div className='flex flex-col'>
      <div className='w-full flex justify-between mt-10 px-5'>
        <h1 className='text-lg font-bold'>All Blogs</h1>
      </div>
        <div className='grid grid-cols-4 gap-10 px-10 mt-10'>
          {blogs.map((item,index)=>(
            <BlogCard isEdit={false} blogid={item._id} key={index} image_url={item.image_url} content={item.content} title={item.title}/>
          ))}
      </div>
      </div>
    </div>
  )
}

export default Home