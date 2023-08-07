import axios from 'axios';
import React, { useState } from 'react'

const UpdateTask = ({ _id, handleClose, handleUpdate }) => {

  const [data, setData] = useState({ title: ""});
    
   function handleSubmit(e) {
    e.preventDefault();

        console.log({ _id }, { data });

        axios
            .put(`https://backendd-m98p.onrender.com/api/task/${_id}`, data)
            .then((res) => {
                setData({ title: ""});
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Failed to update todo");
                console.log(err.message);
            });
  }

  return (
    <form
    className="flex flex-row gap-4"
    onSubmit={(e) => {
        handleSubmit(e)
        handleUpdate();
        handleClose();
    }}
>
    <label htmlFor="title" className="text-xl">Title:</label>
    <input
        type="text"
        name="title"
        onChange={(e) => {
          setData((data) => ({ ...data, [e.target.name]: e.target.value }));
      }}
    />
    <button type="submit" className=""><i class="fa-solid fa-check"></i></button>
</form>
  )
}

export default UpdateTask