import Header from "../components/Header.js";
import "../styles/register.css"
import { useEffect, useState } from "react";
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"


const Register = () => {
  const [inputs, setInputs] = useState({username: "", email: "", password: ""})
  const [error, setError] = useState("")
  const [data, setData] = useState(null)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    
  }

  useEffect(() => {
    // console.log(inputs)
  }, [inputs])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post("/auth/register", inputs)
      // console.log("click")

      navigate("/login")
    } catch (e) {
      setError(e.response.data)
      console.log(e.response.data)
    }
  }

  return (  
    <div className="register-content">

      <Header />
      <div className="register-body">
        <div className="register-stupid">
          <form action="" className="register-form">
            <p className="register-heading">REGISTER</p>
            <input type="text" className="register-input" placeholder="Enter an email" name="email" onChange={handleChange}/>
            <input type="text" className="register-input" placeholder="Enter a username" name="username" onChange={handleChange}/>
            <input type="text" className="register-input" placeholder="Enter a password" name="password" onChange={handleChange}/>
            <button className="register-button" onClick={handleSubmit}>Register</button>
            <p className="register-text register-error">{error}</p>
            <p className="register-text">Have an account?  <Link to="/login">Login </Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}
 
export default Register;