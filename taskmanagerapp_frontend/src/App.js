import "./style.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NoTask from "./Component/NoTask";
import NotFound from "./Component/NotFound"
import HomePage from "./Component/HomePage";
import CardC from "./Component/cardC";
import Login from "./Component/Login";
import CreateAccount from "./Component/CreateAccount";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="login" element={<Login/>}/>
      <Route path="/" element={<NoTask/>}/>
      <Route path="createAccount" element={<CreateAccount/>}/>
      <Route path="home" element={<HomePage/>}/>
      <Route path="card" element={<CardC/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>    
  );
}

export default App;