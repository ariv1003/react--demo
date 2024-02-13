import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { AuthContext } from "../context/authContext";
import { toast } from 'react-toastify';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import BlogCard from '../components/BlogCard';

function Dashboard() {
  const { isUserLoggedIn, userId, userToken } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    image_url: "https://www.theblogstarter.com/wp-content/uploads/2020/12/how-to-create-a-blog.jpg",
    tags: ["tech"],
    userId: ""
  })

  const [blogs,setBlogs] = useState([]);

  const navigate = useNavigate();

  const createBlog = async () => {
    try {
      const { title, content, tags, image_url } = blogData;
      const payload = {
        title: title,
        content: content,
        image_url: image_url,
        tags: tags,
        userId: userId  // comes from app.js
      }
      //we need to have token inorder to create the blog, which is passed via authorisation header
      const res = await axios.post("https://react-api-fp0j.onrender.com/api/add-blog", payload, {
        headers: {
          Authorization: userToken,
        }
      });
      if (res.status === 201) {
        toast.success("Blog created Successfully !", {
          position: "bottom-right"
        });
        setIsModalOpen(false);
        getBlogByUserId(userId);
        setBlogData({
          title: "",
          content: "",
          image_url:
            "https://d3smn0u2zr7yfv.cloudfront.net/uploads/article/main_image/496/primary_main-1x.png",
          tags: ["tech"],
        });
      }
    }
    catch (error) {
      console.log("error", error);
    }
  }

  const getBlogByUserId = async (userId) => {
    try {
      const res = await axios.get(`https://react-api-fp0j.onrender.com/api/user-blog?userid=${userId}`);
      setBlogs(res?.data);
    }
    catch (error) {
      console.log("error", error);
    }
  }
  


  function handleInputs(e) {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (typeof isUserLoggedIn !== "undefined" && !isUserLoggedIn) {
      navigate("/signin")
    }
  }, [isUserLoggedIn])

  useEffect(() => {
    if (typeof userId !== undefined && userId) {
      getBlogByUserId(userId);
    }
  },[userId]);

  return (
    <>
      <div className='flex flex-col mb-10'>
      <div className='w-full flex justify-between mt-10 px-5'>
        <h1 className='text-lg font-bold'>My Blogs</h1>
        <button className="mx-5 h-[35px] rounded-md w-[150px]  bg-blue-600 text-white text-sm font-semibold"
          onClick={() => setIsModalOpen(true)}>Add Blog</button>
      </div>
        <div className='grid grid-cols-4 gap-10 px-10 mt-10'>
          {blogs.map((item,index)=>(
            <BlogCard isEdit={true} blogid={item._id} key={index} image_url={item.image_url} content={item.content} title={item.title}/>
          ))}
      </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='mt-2'>
              <label htmlFor="title" className="block text-sm font-medium mb-2 text-black ">Blog title</label>
              <input type="text" className="block w-full p-2.5 font-regular text-white placeholder-white border-gray-200 bg-[#224957] rounded-lg text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                placeholder="Enter your blog title"
                name="title"
                id="title"
                onChange={handleInputs}
                required />
            </div>
            <div className="mt-6">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Blog content
              </label>
              <textarea
                name="content"
                id="message"
                rows="8"
                className="block w-full p-2.5 font-regular text-white placeholder-white border-gray-200 bg-[#224957] rounded-lg text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                placeholder="Enter blog content"
                onChange={handleInputs}
              ></textarea>
            </div>
            <div className="my-5">
              <button
                className=" h-[35px] rounded-md w-[150px]  bg-blue-600 text-white text-sm font-semibold"
                onClick={createBlog}
              >
                Create Blog
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Dashboard;
