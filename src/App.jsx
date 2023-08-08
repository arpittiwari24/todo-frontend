import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShowTask from "./components/ShowTask.jsx";
import  CreateTask  from "./components/CreateTask.jsx";


const App = () => {
    return (
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<ShowTask />} />
                <Route path="/create-task" element={<CreateTask />} />
                </Routes>
            </BrowserRouter>
    );
}

export default App;
