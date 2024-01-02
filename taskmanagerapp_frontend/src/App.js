import "./style.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NoTask from "./Component/NoTask";
import NotFound from "./Component/NotFound"
import HomePage from "./Component/HomePage";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<NoTask/>}/>
      <Route path="home" element={<HomePage/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>    
  );
}

export default App;
