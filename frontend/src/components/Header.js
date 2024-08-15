import "../styles/header.css"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { AuthContext } from "../context/authContext"
import axios from "axios"

const Header = () => {
   const navigate = useNavigate()

   const { currentUser, logout } = useContext(AuthContext)

   const handleLogout = async () => {
      await logout()
      navigate("/")
   }

   useEffect(() => {
      axios.defaults.withCredentials = true
      // console.log(currentUser)
   }, [])

   return (
      <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
         <h1 className="text-2xl font-bold cursor-pointer ml-12" onClick={() => navigate("/")}>
         MASH
         </h1>
         {currentUser ? (
         <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
         >
            LOGOUT
         </button>
         ) : (
         <button
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/login")}
         >
            LOGIN
         </button>
         )}
      </div>
   );
}

export default Header;
