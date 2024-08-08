import { useEffect, useState, useContext } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
// import "../styles/profile.css"
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
         <div className="flex flex-col items-center">
            {showModal && 
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
               <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                  <p className="text-lg font-medium mb-4">{`"Sorry! A Mash cannot be deleted once it has gained 1000 or more plays!" ${message}`}</p>
                  <button 
                  className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300"
                  onClick={() => setShowModal(false)}
                  >
                  Close
                  </button>
               </div>
            </div>}
            {showEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
               <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                  <p className="text-lg font-medium mb-4">Please Include All Details for the Edit You Would Like to Make</p>
                  <textarea
                  placeholder="Type in mash name, new image/name, old image/name, etc"
                  className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  ></textarea>
                  <div className="flex space-x-4">
                     <button
                     className="w-full py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300"
                     onClick={() => setShowEditModal(false)}
                     >
                     Cancel
                     </button>
                     <button
                     className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                     onClick={handleClick}
                     >
                     Submit
                     </button>
                  </div>
               </div>
            </div>)}
         <div className="flex flex-col items-center mt-16">
            <p className="text-3xl font-semibold mb-2">CREATE NEW:</p>
            <button className="w-12 h-12 bg-blue-500 text-white text-2xl font-bold rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300" 
            onClick={() => navigate("/create")}>+</button>
         </div>
         <p className="text-2xl font-bold text-center mb-2 mt-20">CREATED MASHES:</p>

         <div className="profile-cards p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {mashes && mashes.map((item) => (
                  <div className="flex justify-center lg:w-[330px] lg:h-[210px] ">
                     <Card key={item.id} show={true} etMessage={setMessage} setShowModal={setShowModal} title={item.title}  date={item.date} plays={item.plays} id={item.id} imageOne={item.imageOne} imageTwo={item.imageTwo} mashes={mashes} setShowEditModal={setShowEditModal} setMashes={setMashes} setTitle={setTitle} setMashID={setMashID}/>
                  </div>
               ))}
            </div>
         </div>
         {/* <button className="profile-edit" onClick={() => setShowEditModal(true)}>Edit a Mash <i class="fa fa-edit"></i></button> */}
         </div>
      </div>
   );
}   
 
export default Profile;