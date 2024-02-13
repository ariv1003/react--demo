import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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

function BlogCard({ image_url, content, title, blogid, isEdit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogData, setBlogData] = useState({
    title: title,
    content: content,
    image_url: "https://www.theblogstarter.com/wp-content/uploads/2020/12/how-to-create-a-blog.jpg",
    tags: ["tech"],
  })

  function handleInputs(e) {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    })
  }

  const editBlog = async (blogid) => {
    try {
      const { title, content, tags, image_url } = blogData;
      const payload = {
        title: title,
        content: content,
        image_url: image_url,
        tags: tags,
      }
      const res = await axios.put(`https://react-api-fp0j.onrender.com/api/edit-blog/${blogid}`, payload)
      if (res.status === 200) {
        toast.success("Blog Updated Successfully !", {
          position: "bottom-right"
        });
        setIsModalOpen(false);
      }
    }
    catch (error) {
      console.log("error", error)
    }
  }
  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
        <div className='w-full h-[200px] relative'>
          <Link to={`/blog/${blogid}`}>
            <img className="rounded-t-lg h-[200px] w-full object-cover" src={image_url} alt="" />
          </Link>
          {isEdit && <div className='absolute top-0 right-0 p-4' onClick={() => setIsModalOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            </svg>
          </div>}

        </div>
        <div className="p-5">

          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{title}</h5>

          <p className="text-split mb-3 font-normal text-gray-700  ">{content}</p>
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
                value={blogData.title}
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
                value={blogData.content}
                onChange={handleInputs}
              />
            </div>
            <div className="my-5">
              <button
                className=" h-[35px] rounded-md w-[150px]  bg-blue-600 text-white text-sm font-semibold"
                onClick={() => editBlog(blogid)}
              >
                Submit
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

    </>
  )
}

export default BlogCard