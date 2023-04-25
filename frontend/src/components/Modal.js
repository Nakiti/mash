import { useState } from "react";
import "../styles/modal.css"
import { useNavigate } from "react-router-dom";
import {TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, RedditShareButton, RedditIcon, WhatsappShareButton, WhatsappIcon} from "react-share"

const Modal = (props) => {
  const navigate = useNavigate()
  const temp =[...props.userCards]
  const sorted = temp.sort((a, b) => b.eloScore - a.eloScore)
  const url = `https://mash.herokuapp.com/mash/${props.title}/${props.id}`.replace(/\s+/g, '%20')
  const size = 40;

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
        <div className="modal-share">
          <TwitterShareButton 
            url={`My T5 ${props.title}: \n 
            ${props.userCards[0] ? "1. " + props.userCards[0].title : ""} \n
            ${props.userCards[1] ? "2. " + props.userCards[1].title : ""} \n
            ${props.userCards[2] ? "3. " + props.userCards[2].title : ""} \n
            ${props.userCards[3] ? "4. " + props.userCards[3].title : ""} \n
            ${props.userCards[4] ? "5. " + props.userCards[4].title : ""} \n\nDisagree? You Rank: \n${url} \n\n#MashRankings`}        
          >
            <TwitterIcon className="modal-icon" size={size}/>
          </TwitterShareButton>
          <FacebookShareButton
            url={`My T5 ${props.title}: \n 
            ${props.userCards[0] ? "1. " + props.userCards[0].title : ""} \n
            ${props.userCards[1] ? "2. " + props.userCards[1].title : ""} \n
            ${props.userCards[2] ? "3. " + props.userCards[2].title : ""} \n
            ${props.userCards[3] ? "4. " + props.userCards[3].title : ""} \n
            ${props.userCards[4] ? "5. " + props.userCards[4].title : ""} \n\nDisagree? You Rank: \n${url} \n\n#MashRankings`}        
          >
            <FacebookIcon className="modal-icon" size={size}/>
          </FacebookShareButton>
          <RedditShareButton
            url={`My T5 ${props.title}: \n 
            ${props.userCards[0] ? "1. " + props.userCards[0].title : ""} \n
            ${props.userCards[1] ? "2. " + props.userCards[1].title : ""} \n
            ${props.userCards[2] ? "3. " + props.userCards[2].title : ""} \n
            ${props.userCards[3] ? "4. " + props.userCards[3].title : ""} \n
            ${props.userCards[4] ? "5. " + props.userCards[4].title : ""} \n\nDisagree? You Rank: \n${url} \n\n#MashRankings`}        
          >
            <RedditIcon className="modal-icon" size={size}/>
          </RedditShareButton>
          <WhatsappShareButton
            url={`My T5 ${props.title}: \n 
            ${props.userCards[0] ? "1. " + props.userCards[0].title : ""} \n
            ${props.userCards[1] ? "2. " + props.userCards[1].title : ""} \n
            ${props.userCards[2] ? "3. " + props.userCards[2].title : ""} \n
            ${props.userCards[3] ? "4. " + props.userCards[3].title : ""} \n
            ${props.userCards[4] ? "5. " + props.userCards[4].title : ""} \n\nDisagree? You Rank: \n${url} \n\n#MashRankings`}        
          >
            <WhatsappIcon className="modal-icon" size={size}/>
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
}
 
export default Modal;