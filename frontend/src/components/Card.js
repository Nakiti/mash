import axios from "axios";
import "../styles/card.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const Card = (props) => {
  const navigate = useNavigate()

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
    // await axios.put(`/mashes/update/`, {plays: updatedPlays, id: props.id})
    navigate(`/mash/${props.title}/${props.id}`)
  }

  return ( 
    <div className="card-content">
      
      <div className="card-top">
        {/* {props.show &&<button className="card-delete card-btn" onClick={handleDelete}><i class="fa fa-trash"></i></button>} */}
      </div>
      <div className="card-middle" onClick={handleClick}>
        <p className="card-title">{props.title}</p>
        <p className="card-count card-p">Plays: {props.plays}</p>
      </div>
      <div className="card-bottom">
        <button className="card-button" onClick={() => navigate(`/results/${props.title}/${props.id}`)}>Rankings</button>
        <p className="card-date card-p">{props.date}</p>
      </div>
    </div>
  );
}
 
export default Card;