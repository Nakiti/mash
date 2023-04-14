import { useEffect, useState, useContext } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import "../styles/profile.css"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import { AuthContext } from "../context/authContext"


const Profile = () => { 
  const [mashes, setMashes] = useState(null)
  const [message, setMessage] = useState("")
  const [showModal, setShowModal] = useState(false)

  const navigate = useNavigate()
  const {currentUser} = useContext(AuthContext)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/mashes/get/${currentUser.id}`)
        setMashes(response.data)

        console.log("response", response.data)
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
        <p className="profile-welcome">Hello {currentUser.username}!</p>
        <p className="profile-heading1">Create New:</p>
        <button className="profile-create" onClick={() => navigate("/create")}>+</button>
        <p className="profile-heading2">Created Mashes:</p>
        <div className="profile-cards">
          {mashes && mashes.map((item) => {
            return <Card key={item.id} show={true} setMessage={setMessage} setShowModal={setShowModal} title={item.title} date={item.date} plays={item.plays} id={item.id} mashes={mashes} setMashes={setMashes}/>
          })}
        </div>
      </div>
    </div>
   
  );
}
 
export default Profile;