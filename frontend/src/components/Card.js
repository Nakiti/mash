import axios from "axios";
import "../styles/card.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext"



const Card = (props) => {
   const navigate = useNavigate()
   const [cards, setCards] = useState(null)
   const [two, setTwo] = useState(null)
   const [showEditModal, setShowEditModal] = useState(false)
   const [text, setText] = useState("")
   const {currentUser} = useContext(AuthContext)

   const timestamp = new Date()

   const handleClick = async() => {
      navigate(`/mash/${props.title.split(" ").join("")}/${props.id}`, {state: {title: props.title}})
   }


   return ( 
      <div className="p-4 mx-4 border cursor-pointer rounded-md shadow-lg bg-white w-80 hover:transform hover:-translate-y-1 hover:shadow-lg transition-transform duration-300">
         <div className="text-start">
         <p className="text-sm font-bold cursor-pointer" onClick={handleClick}>
            {props.title}
         </p>
         <p className="text-gray-500 text-xs" onClick={handleClick}>Plays: {props.plays}</p>
         </div>
         <div className="mt-4 flex justify-center items-center space-x-4" onClick={handleClick}>
         <img src={props.imageOne} alt="" className="w-16 h-16 object-contain rounded" />
         <p className="text-xl font-bold">vs</p>
         <img src={props.imageTwo} alt="" className="w-16 h-16 object-contain rounded" />
         </div>
         <hr className="mt-4" />
         <div className="flex justify-between items-center">
         <button
            className="text-blue-500 h-4 hover:underline"
            onClick={() => navigate(`/results/${props.title}/${props.id}`)}
         >
            Rankings
         </button>
         <p className="text-gray-500" onClick={handleClick}>{props.date}</p>
         </div>
      </div>
   );
};

export default Card;