import React from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "../assets/edit.png";
import DelteIcon from "../assets/bin.png";

function BlogCard({
  image_url,
  title,
  content,
  blogid,
  isEdit,
  isDelete,
  editAction,
  deleteAction,
}) {
  const router = useNavigate();
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow">
      <div
        onClick={() => router(`/blog/${blogid}`)}
        className="cursor-pointer max-w-sm"
      >
        <div className="w-full h-[150px]">
          <img
            className="rounded-t-lg h-[150px] w-full object-cover"
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
      <div className="flex px-5 mb-3">
        {isEdit && (
          <button onClick={() => editAction(blogid)} className="cursor-pointer">
            <img style={{ width: "20px" }} src={EditIcon} alt="Edit" />
          </button>
        )}
        {isDelete && (
          <button
            onClick={() => deleteAction(blogid)}
            className="cursor-pointer"
          >
            <img
              className="cursor-pointer ml-3"
              style={{ width: "20px" }}
              src={DelteIcon}
              alt="Delte"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default BlogCard;
