import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const getAllBlogs = async () => {
    try {
      const res = await axios.get(
        `https://react-api-fp0j.onrender.com/api/blogs`
      );
      setBlogs(res?.data?.blogs);
      setTotalPages(res?.data?.totalPages);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="flex flex-col mb-10">
      <div className="w-full flex justify-between mt-10 px-5">
        <h1 className="text-lg font-bold">Top Trending Blogs</h1>
      </div>
      <div className="grid grid-cols-4 gap-10 px-10 mt-10">
        {blogs.map((item, index) => (
          <BlogCard
            blogid={item._id}
            content={item.content}
            title={item.title}
            image_url={item.image_url}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
