import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate()
    const [data, setData] = useState([])

    const getPosts = async () => {
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setData(res.data);
    };

    useEffect(() => {
        getPosts();
    }, [])

    const handleClick = (id) => {
        if (id) {
            navigate(`/post/${id}`)
        }
    }


    return (
        <div className={`h-screen w-screen p-5`}>
            <div className="mt-5 grid grid-cols-6">
                {data.slice(0, 10).map((item, index) => (
                    <div className="bg-slate-800 m-5 p-2">
                        <h1 className="text-white font-bold mb-3">{item.title}</h1>
                        <p className="text-white">{item.body}</p>
                        <button onClick={() => handleClick(item.id)} className="bg-white rounded-lg py-2 px-3 font-semibold mt-3">
                            View Post
                        </ button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
