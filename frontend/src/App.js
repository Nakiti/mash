import Home from "./pages/Home.js";
import {Routes, Route} from "react-router-dom"
import Create from "./pages/Create.js";
import Profile from "./pages/Profile.js";
import Search from "./pages/Search.js";
import Register from "./pages/Register.js"
import Login from "./pages/Login.js"
import Mash from "./pages/Mash.js";
import Results from "./pages/Results.js";
import NotFound from "./pages/NotFound.js"
import "./index.css"
import Contact from "./pages/Contact.js";


function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />}/>

      <Route path="/" element={<Home />}/>
      <Route path="/create" element={<Create />}/>
      <Route path="/profile/:user" element={<Profile />}/>
      <Route path="/search" element={<Search />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/mash/:title/:id" element={<Mash />}/>
      <Route path="/results/:title/:id" element={<Results />}/>
      <Route path="/contact" element={<Contact />}/>
    </Routes>
  );
}

export default App;
