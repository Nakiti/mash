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

      if (inputs.username.length > 0 && inputs.email.length > 0 && inputs.password.length > 0) {
         try {
         await axios.post("/auth/register", inputs)
         // console.log("click")

         navigate("/login")
         } catch (e) {
         setError(e.response.data)
         console.log(e.response.data)
         }
      }
   }

   return (  
      <div className="register-content flex flex-col min-h-screen bg-gray-100">
         <Header />
         <div className="flex-grow flex items-center justify-center p-4">
         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
            <p className="text-2xl font-bold mb-6 text-center">REGISTER</p>
            <form action="" className="space-y-4">
               <input 
               type="text" 
               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
               placeholder="Enter an email" 
               name="email" 
               onChange={handleChange}
               />
               <input 
               type="text" 
               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
               placeholder="Enter a username" 
               name="username" 
               onChange={handleChange}
               />
               <input 
               type="password" 
               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
               placeholder="Enter a password" 
               name="password" 
               onChange={handleChange}
               />
               <button 
               type="button"
               className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300" 
               onClick={handleSubmit}
               >
               Register
               </button>
               {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
               <p className="mt-6 text-center">
               Have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
               </p>
            </form>
         </div>
         </div>
      </div>
   );
  
}
 
export default Register;