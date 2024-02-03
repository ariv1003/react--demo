import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";

function Dashboard() {
  const { isUserLoggedIn, userId, userToken } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    image_url:
      "https://d3smn0u2zr7yfv.cloudfront.net/uploads/article/main_image/496/primary_main-1x.png",
    tags: ["tech"],
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (typeof isUserLoggedIn !== "undefined" && !isUserLoggedIn) {
      navigate("/sign-in");
    }
  }, [isUserLoggedIn]);

  const createBlog = async () => {
    try {
      const { title, tags, content, image_url } = blogData;
      const payload = {
        title: title,
        content: content,
        image_url: image_url,
        tags: tags,
        userId: userId,
      };
      const res = await axios.post(
        "https://react-api-fp0j.onrender.com/api/add-blog",
        payload,
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (res.status === 201) {
        toast.success("Blog Created Successfully !", {
          position: "bottom-right",
        });
        setIsModalOpen(false);
        setBlogData({
          title: "",
          content: "",
          image_url:
            "https://d3smn0u2zr7yfv.cloudfront.net/uploads/article/main_image/496/primary_main-1x.png",
          tags: ["tech"],
        });
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="w-full flex justify-end">
        <button
          className="mx-5 my-5 h-[35px] rounded-md w-[150px]  bg-blue-600 text-white text-sm font-semibold"
          onClick={handleOpenModal}
        >
          Add Blog
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div className="mt-6">
              <label
                for="title"
                className="block mb-2 text-sm font-medium text-black"
              >
                Blog Title
              </label>
              <input
                onChange={handleInputChange}
                name="title"
                type="text"
                id="title"
                className="bg-[#224957] min-w-[300px] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Blog Title"
                required
              />
            </div>
            <div className="mt-6">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter blog content
              </label>
              <textarea
                onChange={handleInputChange}
                name="content"
                id="message"
                rows="8"
                className="bg-[#224957] block p-2.5 w-full text-sm text-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter blog content"
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
  );
}

export default Dashboard;
