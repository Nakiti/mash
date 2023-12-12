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
    // await axios.put(`/mashes/update/`, {plays: updatedPlays, id: props.id})
    navigate(`/mash/${props.title.split(" ").join("")}/${props.id}`, {state: {title: props.title}})
  }

  const handleform = async() => {
    props.setShowEditModal(true)
    props.setTitle(props.title)
    props.setMashID(props.id)
  }

  // useEffect(() => {
  //   // const fetchData = async() => {
  //   //   // const response = await axios.get(`/cards/get/${props.id}`)

  //   //   const temp = response.data.sort((a, b) => b.eloScore - a.eloScore)
  //   //   temp.slice(0, 2)
  //   //   // console.log(temp)

  //   //   setTwo(temp)
  //   //   console.log(two[0].image, two[1].image)


  //   // }

  //   // fetchData()

  // }, [])

  return ( 
    <div className="card-content">
      {/* <div className="card-top">
        {props.show &&<button className="card-delete card-btn" onClick={handleDelete}><i class="fa fa-trash"></i></button>}
      </div> */}
      {/* {showEditModal && <div className="profile-modalOverlay">
          <div className="profile-editModal">
            <p className="profile-editText">Please Include All Details for the Edit You Would Like to Make</p>
            <textarea name="" id="" cols="30" rows="10" placeHolder="Type in mash name, new image/name, old image/name, etc" className="profile-editInput" value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <div className="profile-editButtons">
              <button className="profile-editButton" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="profile-editButton" onClick={handleform}>Submit</button>
            </div>
          </div>
        </div>} */}
      {<div className="card-middle" >
        {props.show &&<button className="card-delete card-btn" onClick={handleform}><i class="fa fa-edit"></i></button>}
        <p className="card-title" onClick={handleClick} style={props.show ? {gridColumn: "1 / 3"} : {gridColumn: "1 / 4"}}>{props.title}</p>
        <p className="card-count card-p" onClick={handleClick}>Plays: {props.plays}</p>
        <div className="card-empty" onClick={handleClick}></div>
        <div className="card-container" onClick={handleClick}>
          <img src={props.imageOne} alt="" className="card-image" />
          <p className="card-text">vs</p>
          <img src={props.imageTwo} alt="" className="card-image" />
        </div>
      </div>}
      <div className="card-bottom">
        <button className="card-button" onClick={() => navigate(`/results/${props.title}/${props.id}`)}>Rankings</button>
        <p className="card-date card-p">{props.date}</p>
      </div>
    </div>
  );
}
 
export default Card;