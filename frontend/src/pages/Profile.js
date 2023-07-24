import { useEffect, useState, useContext } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import "../styles/profile.css"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import { AuthContext } from "../context/authContext"
import NotFound from "./NotFound.js";


const Profile = () => { 
  const [mashes, setMashes] = useState(null)
  const [message, setMessage] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [text, setText] = useState("")
  const [showEditModal, setShowEditModal] = useState(false)
  const [title, setTitle] = useState("")
  const [mashID, setMashID] = useState(0)
  const timestamp = new Date()

  const navigate = useNavigate()
  const {currentUser} = useContext(AuthContext)

  const handleClick = async() => {
    let date = `${timestamp.getMonth() + 1}/${timestamp.getDate()}/${timestamp.getFullYear()}`

    await axios.post("/contacts/post", {title: title, text: text, date: date, mashID: mashID, userID: currentUser.id})
    setShowEditModal(false)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/mashes/get/${currentUser.id}`)
        setMashes(response.data)

        // console.log("response", response.data)
      } catch (err) {
        console.log(err)
      }
    }

    getData()
  }, [])
  

  return ( 
    <div className="profile-content">
      <Header />
      <div className="profile-body">
        {showModal && <div className="profile-modalOverlay">
          <div className="profile-modal">
            <p className="profile-modalText">"Sorry! A Mash cannot be deleted once it has gained 1000 or more plays!"{message}</p>
            <button className="profile-modalButton" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>}
        {showEditModal && <div className="profile-modalOverlay">
          <div className="profile-editModal">
            <p className="profile-editText">Please Include All Details for the Edit You Would Like to Make</p>
            <textarea name="" id="" cols="30" rows="10" placeHolder="Type in mash name, new image/name, old image/name, etc" className="profile-editInput" value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <div className="profile-editButtons">
              <button className="profile-editButton" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="profile-editButton" onClick={handleClick}>Submit</button>
            </div>
          </div>
        </div>}
        
        <p className="profile-welcome">HELLO {currentUser.username}!</p>
        <p className="profile-heading1">CREATE NEW:</p>
        <button className="profile-create" onClick={() => navigate("/create")}>+</button>
        <p className="profile-heading2">CREATED MASHES:</p>
        <div className="profile-cards">
          {mashes && mashes.map((item) => {
            return <Card key={item.id} show={true} setMessage={setMessage} setShowModal={setShowModal} title={item.title} date={item.date} plays={item.plays} id={item.id} imageOne={item.imageOne} imageTwo={item.imageTwo} mashes={mashes} setShowEditModal={setShowEditModal} setMashes={setMashes} setTitle={setTitle} setMashID={setMashID}/>
          })}
        </div>
        {/* <button className="profile-edit" onClick={() => setShowEditModal(true)}>Edit a Mash <i class="fa fa-edit"></i></button> */}
      </div>
    </div>
  );
}
 
export default Profile;