import { useEffect, useState } from "react"
import axios from "axios"
import { Link, Outlet } from "react-router-dom";
import UpdateTask from "./UpdateTask.jsx";


const TaskCard = ({ data,handleEdit, handleDelete }) => {
    const { _id, title} = data;

    return (
        <li className="flex flex-row  py-4 border-4" key = {_id}>
            <div className="text-xl font-semibold w-32">
                <h3>{title}</h3>
            </div>
            <div className="flex flex-row justify-end gap-10 pl-10 w-32 ">
                <button name={_id} onClick={handleEdit}><i class="fa-solid fa-pencil"></i></button>
                <button name={_id} onClick={handleDelete}><i class="fa-solid fa-trash"></i></button>
            </div>
        </li>
    )
}

const ShowTask = () => {

    const [task,setTask] = useState([])  
    const [open, setOpen] = useState(false)  
    const [id, setId] = useState("")
    const [update, setUpdate] = useState(false)

    useEffect( () => {
        axios
        .get("https://backendd-m98p.onrender.com/api/task/")
        .then((res) => {
            setTask(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    },[update])

    function handleEdit(e) {
        setId(e.target.name)
        setOpen(true)
    }

    function handleUpdate() { 
        console.log("update:", update, !update);
        setUpdate(!update);
    }

    function handleClose() { 
        setId("");
        setOpen(false);
    }

    function handleDelete(e) {
        axios.delete(`https://backendd-m98p.onrender.com/api/task/${e.target.name}`);

        setTask((data) => {
            return data.filter((todo) => todo._id !== e.target.name);
        });
    }

  return (
    <div className="">
        <h1 className=" max-sm:text-4xl text-5xl py-10 font-bold px-10" >TODO APP</h1>
        <Link to = "/create-task"><button className="border-2 border-solid bg-blue-500 w-20 h-10 rounded-lg text-xl font-semibold">New</button></Link>
        <Outlet />
        <section className="py-4" >
                <h1 className="text-3xl p-10 font-bold px-20" >Task List</h1>
                <ul >
                    {task.map((data) => <TaskCard key={data._id} data={data} handleEdit={handleEdit} handleDelete={handleDelete} />)}
                </ul>
            </section>
            {open ? (
                <section >
                    <div className=" pt-6 pb-10 bg-orange-400 rounded-lg" >
                        <p className="pb-3" onClick={handleClose}><i class="fa-solid fa-xmark"></i></p>
                        <UpdateTask
                            _id={id}
                            handleClose={handleClose}
                            handleUpdate={handleUpdate}
                        />
                    </div>
                </section>
            ) : (
                ""
            )}
    </div>
  )
}

export default ShowTask
