import { useEffect, useState } from "react"
import axios from "axios"
import { Link, Outlet } from "react-router-dom";
import UpdateTask from "./UpdateTask.jsx";


const TaskCard = ({ data, handleDelete }) => {
    const { _id, title} = data;

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    return (
        <li className="flex flex-row  py-4 border-4 ${isChecked ? 'line-through' : ''}" key = {_id}>
            <div className="text-xl font-semibold w-32">
                <h3 style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>{title}</h3>
            </div>
            <div className="flex flex-row justify-end gap-10 pl-10 w-32 ">
                <button type="checkbox"  onClick={handleCheckboxChange}><i class="fa-solid fa-check"></i></button>
                <button data-id={_id} onClick={handleDelete}><i class="fa-solid fa-trash"></i></button>
            </div>
        </li>
    )
}

const ShowTask = () => {

    const [task,setTask] = useState([])  
   

    useEffect( () => {
        axios
        .get("https://backend-todo-2n2o.onrender.com/api/task")
        .then((res) => {
            setTask(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    },[])


    function handleDelete(e) { 
        const taskId = e.currentTarget.dataset.id
        axios.delete(`https://backend-todo-2n2o.onrender.com/api/task/${taskId}`);

        setTask((data) => {
            return data.filter((task) => task._id !== taskId);
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
                    {task.map((data) => <TaskCard key={data._id} data={data}  handleDelete={handleDelete} />)}
                </ul>
            </section>
    </div>
  )
}

export default ShowTask