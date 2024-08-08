import Header from "../components/Header.js";
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
    <div className="login-content flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <p className="text-2xl font-bold mb-6 text-center">LOGIN</p>
          <input 
            type="text" 
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            name="username" 
            placeholder="Enter a username" 
            onChange={handleChange}
          />
          <input 
            type="password" 
            className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            name="password" 
            placeholder="Enter a password" 
            onChange={handleChange}
          />
          <button 
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300" 
            onClick={handleSubmit}
          >
            Login
          </button>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          <p className="mt-6 text-center">
            Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
  
}  
 
export default Login;