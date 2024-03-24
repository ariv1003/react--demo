import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ image_url, title, content, blogid }) {
  return (
    <Link to={`/blog/${blogid}`}>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <div className="w-full h-[200px]">
          <img
            className="rounded-t-lg h-[200px] w-full object-cover"
            src={image_url}
            alt=""
          />
        </div>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>
          <p className="text-split mb-3 font-normal text-gray-700 ">
            {content?.slice(0, 100)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
