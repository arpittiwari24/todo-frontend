import { useEffect, useState } from "react"
import axios from "axios"
import { Link, Outlet } from "react-router-dom";



const TaskCard = ({ data, handleDelete }) => {
    const { _id, title } = data;

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    return (
        <li className="flex flex-row items-center justify-center w-full px-2  py-2 border-2 ${isChecked ? 'line-through' : ''}" key={_id}>
            <div className="text-xl max-sm:text-sm font-semibold flex-1">
                <h3 style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>{title}</h3>
            </div>
            <div className="flex flex-row items-center justify-end gap-10 pl-10 w-32 ">
                <button type="checkbox" onClick={handleCheckboxChange}><i className="fa-solid fa-check"></i></button>
                <button data-id={_id} onClick={handleDelete}><i className="fa-solid fa-trash"></i></button>
            </div>
        </li>
    )
}

const ShowTask = () => {

    const [task, setTask] = useState([])


    useEffect(() => {
        axios
            .get("https://backend-todo-2n2o.onrender.com/api/task")
            .then((res) => {
                setTask(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    function handleDelete(e) {
        const taskId = e.currentTarget.dataset.id
        axios.delete(`https://backend-todo-2n2o.onrender.com/api/task/${taskId}`);

        setTask((data) => {
            return data.filter((task) => task._id !== taskId);
        });
    }


    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className=" max-sm:text-4xl text-5xl py-10 font-bold" >TODO APP</h1>
            <Link to="/create-task"><button className=" fixed bottom-4 right-0 border-2 border-solid bg-blue-500 px-4 py-2 rounded-full text-2xl font-semibold">+</button></Link>
            <Outlet />
            <section className="py-4" >
                <ul className="w-full">
                    {task.map((data) => <TaskCard key={data._id} data={data} handleDelete={handleDelete} />)}
                </ul>
            </section>
        </div>
    )
}

export default ShowTask
