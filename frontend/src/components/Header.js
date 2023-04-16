import "../styles/header.css"
import {Link, useNavigate} from "react-router-dom"
import { useContext, useEffect } from "react"
import { AuthContext } from "../context/authContext"
import axios from "axios"


const Header = () => {
  const navigate = useNavigate()

  const {currentUser, logout} = useContext(AuthContext)

  const handleLogout = async() => {
    await logout()
    navigate("/")
  }

  useEffect(() => {
    axios.defaults.withCredentials = true
    // console.log(currentUser)
  }, [])
  
  return ( 
    <div className="header-content">
      <h1 className="header-text" onClick={() => navigate("/")}>Mash</h1>
      {currentUser ? <button className="header-button" onClick={handleLogout}>LOGOUT</button> : <button className="header-button" onClick={() => navigate("/login")}>LOGIN</button>}
    </div>
  );
}
 
export default Header;