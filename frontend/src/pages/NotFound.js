import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../styles/notFound.css"


const NotFound = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/")
  }

  return ( 
    <div className="notFound-content">
      <Header />
      <div className="notFound-body">
        <p className="notFound-text">Page Not Found. Return to Home.</p>

        <button className="notFound-button" onClick={handleClick}>Home</button>
      </div>
    </div>
   );
}
 
export default NotFound;