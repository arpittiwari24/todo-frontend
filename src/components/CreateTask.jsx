import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import axios from "axios";


const CreateTask = () => {
    const [data, setData] = useState({ title: ""});

    return (
        <div className=" flex flex-col items-center justify-center">
                <form
                    className="flex flex-col items-center justify-center gap-2"
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
                    <label className="text-xl font-semibold py-2 pt-4" htmlFor="title">
                        Add New Task
                    </label>
                    <input
                    className="flex h-10 w-full rounded-md border border-slate-950 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-semibold"
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={(e) => {
                            setData((data) => ({ ...data, [e.target.name]: e.target.value }));
                        }}
                    />
                    <button type="submit" className="text-3xl">+</button>
                </form>
                <Link className="" to = "/"><button className="fixed bottom-0.5 border-2 border-solid bg-blue-500 p-2 rounded-lg text-xl font-semibold">Home</button></Link>
                <Outlet />
                </div>
    );
}

export default CreateTask