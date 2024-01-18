import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Post() {
    const { id } = useParams()

    const [data, setData] = useState({})

    const getPost = async (id) => {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        setData(res.data);
    };

    useEffect(() => {
        getPost(id)
    }, [id])

    console.log(data);

    return (
        <div>
            <div className="bg-slate-800 m-5 p-2">
                <h1 className="text-white font-bold mb-3">{data.title}</h1>
                <p className="text-white">{data.body}</p>
            </div>
        </div>
    )
}

export default Post