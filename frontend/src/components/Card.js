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


  const handleDelete = async() => {
    if (props.plays > 1000) {
      props.setMessage("Sorry! A Mash cannot be deleted once it has gained 1000 or more plays!")
      props.setShowModal(true)

    } else  {
      await axios.delete(`/mashes/delete/`, {id: props.id})

      const temp = props.mashes.filter(item => item.id !== props.id)
      props.setMashes(temp)
      console.log(temp)
    }
  }

  const handleClick = async() => {
    const updatedPlays = props.plays + 1
    // await axios.put(`http://localhost:4000/mashes/update/`, {plays: updatedPlays, id: props.id})
    navigate(`/mash/${props.title.split(" ").join("")}/${props.id}`, {state: {title: props.title}})
  }

  const handleform = async() => {
    props.setShowEditModal(true)
    props.setTitle(props.title)
    props.setMashID(props.id)
  }



  return ( 
    <div className="p-4 mx-4 border cursor-pointer rounded-md shadow-lg bg-white w-80 hover:transform hover:-translate-y-1 hover:shadow-lg transition-transform duration-300">
      <div className="flex justify-end">
        {props.show && (
          <button className="text-red-500" onClick={handleDelete}>
            <i className="fa fa-trash"></i>
          </button>
        )}
      </div>
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <p className="mb-4">Please Include All Details for the Edit You Would Like to Make</p>
            <textarea
              cols="30"
              rows="10"
              placeholder="Type in mash name, new image/name, old image/name, etc"
              className="w-full p-2 border rounded"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleform}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
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
          className="text-blue-500 h-4"
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