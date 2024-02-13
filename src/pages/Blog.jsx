import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
function Blog() {
    const { id } = useParams();

    const [blogData, setBlogData] = useState({});

    const getBlogData = async (id) => {
        try {
            const res = await axios.get(`https://react-api-fp0j.onrender.com/api/blog?id=${id}`);
            setBlogData(res?.data)
        }
        catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        if (id) {
            getBlogData(id);
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

    return (
        <div className="grid grid-cols-2 my-10 ">
        <div >
            <img src={blogData.image_url} alt="Blog Image" />
        </div>
        <div>
            <h1 className="text-xl font-bold">{blogData.title}</h1>
            <div className="mt-2 flex items-center">
                <h1 className="font-semibold">Author:</h1>&nbsp;
                <h1 className="font-medium">{blogData.userId?.name}</h1> <h1 className="font-medium ml-3">CreatedAt:&nbsp;{formatDate(blogData.createdAt)}</h1>
            </div>
            <p className="mt-5 mb-5 text-lg">
                {blogData.content?.slice(0, 5000)}
            </p>
            {blogData?.tags &&
                blogData?.tags.length > 0 &&
                blogData?.tags.map((item, index) => (
                    <h1 key={index} className="w-[100px] text-white rounded-full text-center bg-gray-700 px-3 py-3 text-lg font-medium">
                        {item}
                    </h1>
                ))}
        </div>
    </div>
    )
}

export default Blog;