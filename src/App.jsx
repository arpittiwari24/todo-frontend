import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShowTask from "./components/ShowTask.jsx";
import  CreateTask  from "./components/CreateTask.jsx";
import UpdateTask from "./components/UpdateTAsk.jsx";


const App = () => {
    return (
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<ShowTask />} />
                <Route path="/create-task" element={<CreateTask />} />
                <Route path="/update-task" element={<UpdateTask />} />
                </Routes>
            </BrowserRouter>
    );
}

export default App;
