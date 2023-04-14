import Header from "../components/Header.js";
import "../styles/login.css"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from "../context/authContext.js";


const Login = () => {
  const [inputs, setInputs] = useState({username: "", password: ""})
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const {login, currentUser} = useContext(AuthContext)

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async(e) => {
    // e.preventDefault()

    try {
      await login(inputs)
      // navigate(`/profile/${currentUser.id}`)
    } catch (err) {
      console.log(err.response.data)
      setError(err.response.data)
    }
  }

  useEffect(() => {
    axios.defaults.withCredentials = true
  }, [])


  return ( 
    <div className="login-content">
      <Header />
      <div className="login-body">
        <div className="login-stupid">
          <div action="" className="login-form">
            <p className="login-heading">LOGIN</p>
            <input type="text" className="login-input" name="username" placeholder="Enter a username" onChange={handleChange}/>
            <input type="text" className="login-input" name="password" placeholder="Enter a password" onChange={handleChange}/>
            <button className="login-button" onClick={handleSubmit}>Login</button>
            <p className="login-text login-error">{error}</p>
            <p className="login-text">Don't have an account?  <Link to="/register">Register </Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Login;