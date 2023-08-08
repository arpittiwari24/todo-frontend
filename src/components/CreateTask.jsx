import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import axios from "axios";


const CreateTask = () => {
    const [data, setData] = useState({ title: ""});

    return (
        <div>
                <form
                    className="flex flex-row gap-4 py-8"
                    onSubmit={(e) => {
                        e.preventDefault();
                    
                        const task = {
                            title: data.title,
                        };
                    
                        axios
                            .post("https://backend-todo-2n2o.onrender.com/api/task", task)
                            .then((res) => {
                                setData({ title: "" });
                                console.log(res.data.message);
                            })
                            .catch((err) => {
                                console.log("Error couldn't create Task");
                                console.log(err.message);
                            });
                    }}
                  
                    noValidate
                >
                    <label className="text-2xl font-semibold" htmlFor="title">
                        Title:
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={(e) => {
                            setData((data) => ({ ...data, [e.target.name]: e.target.value }));
                        }}
                    />
                    <button type="submit"><i class="fa-solid fa-plus"></i> </button>
                </form>
                <Link to = "/"><button className="border-2 border-solid bg-blue-500 w-20 h-10 rounded-lg text-xl font-semibold">Home</button></Link>
                <Outlet />
                </div>
    );
}

export default CreateTask