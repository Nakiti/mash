import { useState } from "react";
import "../styles/modal.css"
import { useNavigate } from "react-router-dom";

const Modal = (props) => {
  const navigate = useNavigate()
  const temp =[...props.userCards]
  const sorted = temp.sort((a, b) => b.eloScore - a.eloScore)
  console.log("sorted", props.userCards)

  return ( 
    <div className="modal-content">
      <div className="modal-body">
        {props.empty && <p className="modal-title">You've Completed This Mash!</p>}
        <p className="modal-subtitle">Your Results:</p>
        <div className="modal-items">
          {sorted.map((item, index) => {
            return (
              <div className="modal-container" key={item.id}>
                <p className="modal-number">{index + 1}</p>
                <img src={item.image} alt={item.title} className="modal-image" />
                <p className="modal-text">{item.title}</p>
              </div>
            )
          })}
        </div>
        <div className="modal-btnContainer">
          <button className="modal-btn" onClick={() => navigate("/")} >Home</button>
          <button className="modal-btn" onClick={() => navigate(`/results/${props.title}/${props.id}`)}>Rankings</button>
          {props.empty ? null : <button className="modal-btn" onClick={() => props.setShowModal(false)}>Continue</button>}
        </div>
      </div>
    </div>
  );
}
 
export default Modal;