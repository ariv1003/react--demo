import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment"

function index() {
    const { id } = useParams();
    const [blogDetail, setBlogDetail] = useState({});

    const getBlogDetail = async (id) => {
        try {
            const res = await axios.get(
                `https://react-api-fp0j.onrender.com/api/blog?id=${id}`
            );
            setBlogDetail(res?.data);
        } catch (error) {
            console.log("error");
        }
    };

    useEffect(() => {
        if (id) {
            getBlogDetail(id);
        }
    }, [id]);

    const formatDate = (date) => {
        return date
        // const newDate = new Date(date).toISOString()
        // const year = newDate.getFullYear()
        // const month = newDate
        // const day = newDate.getUTCDay()
        // return `${day}-${month}-${year}`
    }

    console.log("blogDetail", blogDetail);
    return (
        <div className="grid grid-cols-2 my-10">
            <div>
                <img src={blogDetail.image_url} alt="Blog Image" />
            </div>
            <div>
                <h1 className="text-xl font-bold">{blogDetail.title}</h1>
                <div className="mt-2 flex items-center">
                    <h1 className="font-semibold">Author:</h1>&nbsp;
                    <h1 className="font-medium">{blogDetail.userId?.name}</h1> <h1 className="font-medium ml-3">CreatedAt:&nbsp;{formatDate(blogDetail.createdAt)}</h1>
                </div>
                <p className="mt-5 mb-5 text-lg">
                    {blogDetail.content?.slice(0, 5000)}
                </p>
                {blogDetail?.tags &&
                    blogDetail?.tags.length > 0 &&
                    blogDetail?.tags.map((item, index) => (
                        <h1 className="w-[100px] text-white rounded-full text-center bg-gray-700 px-3 py-3 text-lg font-medium">
                            {item}
                        </h1>
                    ))}
            </div>
        </div>
    );
}

export default index;
