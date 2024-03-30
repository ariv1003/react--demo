import React, { useContext, useEffect, useRef, useState } from "react";
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
import BlogCard from "../components/BlogCard";
import { WithContext as ReactTags } from "react-tag-input";
import DeleteIcon from "../../public/bin.png";

function Dashboard() {
  const { isUserLoggedIn, userId, userToken } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editBlogData, setEditBlogData] = useState({});
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  const [file, setFile] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [editBlogTags, setEditBlogTags] = useState([]);

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (editBlogData.tags) {
      const tags = editBlogData.tags.map((item) => {
        return { id: item, text: item };
      });
      setEditBlogTags(tags);
    }
  }, [editBlogData]);

  const [blogs, setBlogs] = useState([]);

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
      const filteredTags = tags.map((item) => {
        return item.text;
      });
      const { title, content } = blogData;
      const payload = {
        title: title,
        content: content,
        image_url: imageURL,
        tags: filteredTags,
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
        getBlogsbyUserId(userId);
        setIsModalOpen(false);
        setBlogData({
          title: "",
          content: "",
        });
      }
    } catch (error) {
      console.log("error");
    }
  };

  const uploadImage = async (is_edit) => {
    try {
      const formData = new FormData();
      formData.append("images", file);

      const res = await axios.post(
        "https://react-api-fp0j.onrender.com/api/upload/images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: userToken,
          },
        }
      );
      if (res.status === 200) {
        if (is_edit) {
          setEditBlogData({
            ...editBlogData,
            image_url: res.data.images[0].imageUrl,
          });
        } else {
          setImageURL(res.data.images[0].imageUrl);
        }
        toast.success("Image Uploaded Successfully !", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log("error");
    }
  };

  const updateBlog = async () => {
    try {
      const { title, content, image_url } = editBlogData;
      const filteredTags = editBlogTags.map((item) => {
        return item.text;
      });
      const payload = {
        title: title,
        content: content,
        image_url: image_url,
        tags: filteredTags,
      };
      const res = await axios.put(
        `https://react-api-fp0j.onrender.com/api/edit-blog/${editBlogData._id}`,
        payload,
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Blog Updated Successfully !", {
          position: "bottom-right",
        });
        getBlogsbyUserId(userId);
        setIsEditModalOpen(false);
        setEditBlogData({});
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getBlogsbyUserId = async (userId) => {
    try {
      const res = await axios.get(
        `https://react-api-fp0j.onrender.com/api/user-blog?userid=${userId}`
      );
      setBlogs(res?.data);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    if (userId) {
      getBlogsbyUserId(userId);
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditBlogData({
      ...editBlogData,
      [name]: value,
    });
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(
        `https://react-api-fp0j.onrender.com/api/blog?id=${id}`
      );
      setEditBlogData(res?.data);
      setIsEditModalOpen(true);
    } catch (error) {
      console.log("error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://react-api-fp0j.onrender.com/api/blog?id=${id}`
      );
      if (res.status === 200) {
        toast.error("Blog Deleted Successfully !", {
          position: "bottom-right",
        });
        getBlogsbyUserId(userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletion = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleTagsAddition = (tag) => {
    setEditBlogTags([...editBlogTags, tag]);
  };

  const handleDeletionTags = (i) => {
    setEditBlogTags(editBlogTags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleOpenImage = () => {
    inputRef.current.click();
  };

  const handleOpenEditImage = () => {
    editInputRef.current.click();
  };

  const handleImageChange = (e) => {
    setFile(e?.target?.files[0]);
  };

  const handleEmptyImage = () => {
    setImageURL("");
    setFile("");
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="w-full flex justify-between mt-10 px-5">
          <h1 className="text-lg font-bold">My Blogs</h1>
          <button
            className="mx-5 h-[35px] rounded-md w-[150px]  bg-blue-600 text-white text-sm font-semibold"
            onClick={handleOpenModal}
          >
            Add Blog
          </button>
        </div>
        <div className="grid grid-cols-4 gap-10 px-10 mt-10">
          {blogs.map((item, index) => (
            <BlogCard
              editAction={handleEdit}
              deleteAction={handleDelete}
              isEdit={true}
              isDelete={true}
              blogid={item._id}
              content={item.content}
              title={item.title}
              image_url={item.image_url}
              key={index}
            />
          ))}
        </div>
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
                className="block mb-2 text-sm font-medium text-gray-900"
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
              <div className="mt-5">
                <ReactTags
                  tags={tags}
                  handleDelete={handleDeletion}
                  handleAddition={handleAddition}
                  inputFieldPosition="bottom"
                  autocomplete
                />
              </div>
              <div>
                {file && (
                  <div className="relative">
                    {!imageURL ? (
                      <img
                        className="w-[50px] mb-5"
                        src={URL.createObjectURL(file)}
                        alt=""
                      />
                    ) : (
                      <img className="w-[50px] mb-5" src={imageURL} alt="" />
                    )}
                    <h1 className="bg-red-900 flex justify-center items-center rounded-full absolute top-0 left-[40px] w-[30px] h-[30px]">
                      <img
                        onClick={handleEmptyImage}
                        className="cursor-pointer w-[15px]"
                        src={DeleteIcon}
                        alt=""
                      />
                    </h1>
                  </div>
                )}
                <button
                  onClick={file ? uploadImage : handleOpenImage}
                  className=" h-[35px] rounded-md w-[150px]  bg-blue-600 text-white text-sm font-semibold"
                >
                  {file ? "Upload Image" : "Choose File"}
                </button>
                <input
                  onChange={handleImageChange}
                  hidden
                  ref={inputRef}
                  type="file"
                />
              </div>
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
      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
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
                onChange={handleEditInputChange}
                name="title"
                type="text"
                id="title"
                className="bg-[#224957] min-w-[300px] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Blog Title"
                required
                value={editBlogData.title}
              />
            </div>
            <div className="mt-6">
              <label
                for="message"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter blog content
              </label>
              <textarea
                onChange={handleEditInputChange}
                name="content"
                id="message"
                rows="8"
                className="bg-[#224957] block p-2.5 w-full text-sm text-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter blog content"
                value={editBlogData.content}
              ></textarea>
            </div>
            <div className="mt-5">
              <ReactTags
                tags={editBlogTags}
                handleDelete={handleDeletionTags}
                handleAddition={handleTagsAddition}
                inputFieldPosition="bottom"
                autocomplete
              />
            </div>
            <div>
              {file ? (
                <img
                  className="w-[50px] mb-5"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
              ) : (
                <img
                  className="w-[50px] mb-5"
                  src={editBlogData.image_url}
                  alt=""
                />
              )}
            </div>
            <div>
              <button
                onClick={() => {
                  if (file) {
                    uploadImage("is_edit");
                  } else {
                    handleOpenEditImage();
                  }
                }}
                className=" h-[35px] rounded-md w-[150px]  bg-blue-600 text-white text-sm font-semibold"
              >
                {file ? "Upload Image" : "Change File"}
              </button>
              <input
                onChange={handleImageChange}
                hidden
                ref={editInputRef}
                type="file"
              />
            </div>

            <div className="my-5">
              <button
                className=" h-[35px] rounded-md w-[150px]  bg-blue-600 text-white text-sm font-semibold"
                onClick={updateBlog}
              >
                Update Blog
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Dashboard;
