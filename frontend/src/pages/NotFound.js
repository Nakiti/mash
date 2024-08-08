import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../styles/notFound.css"


const NotFound = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/")
  }

  return ( 
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-100">
        <Header />
        <div className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                Page Not Found
            </p>
            <p className="text-lg text-gray-600 mb-6">
                The page you’re looking for doesn’t exist. Please return to the homepage.
            </p>
            <button
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                onClick={handleClick}
            >
            Go Home
            </button>
        </div>
    </div>
   );
}
 
export default NotFound;