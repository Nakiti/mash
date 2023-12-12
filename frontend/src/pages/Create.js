import Header from "../components/Header";
import {useState, useContext, useEffect} from "react"
import Input from "../components/Input";
import "../styles/create.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const Create = () => {
  const [inputs, setInputs] = useState([{id: 0, name: " ", image: " "}])
  const [selectedId, setSelectedId] = useState(0)
  const userId = JSON.parse(sessionStorage.getItem("user")).id
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("all")
  const [access, setAccess] = useState("public")
  const [info, setInfo] = useState("")
  let timestamp = new Date();
  const navigate = useNavigate()
  const {currentUser} = useContext(AuthContext)
  const [error, setError] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [otherModal, setOtherModal] = useState(false)
  const [mashID, setMashID] = useState(null)
  const [pass, setPass] = useState(true)
  const [loading, setLoading] = useState(false)
  const [ques, setQues] = useState("Which One's Better?")

  let n = 0

  const handleAdd = () => {
    setInputs((prev) => [...prev, {id: prev[prev.length - 1].id + 1, name: " ", image: " "}])

    // console.log(inputs)
  }

  const handleDelete = (id) => {
    const temp = [...inputs]
    const filtered = temp.filter(item => id !== item.id)
    
    console.log(filtered)
    setInputs(filtered)
  }

  const handleModal = () => {
    setShowModal(true)
    setTimeout(() => {
      setShowModal(false)
    }, 1000)
  }

  const handleSubmit = async(e) => {
    if (title === "") {
      setError("Enter a Title")
      handleModal()

      return
    } else if (inputs.length < 2) {
      setError("Must Have at Least 2 Cards")
      handleModal()
      return
    } 


    let date = `${timestamp.getMonth() + 1}/${timestamp.getDate()}/${timestamp.getFullYear()}`
    
    try { 
      await axios.post("/mashes/post", {title: title, info: info, timestamp: date, category: category, plays: String(0), access: access, userID: String(userId), question: ques})

    } catch (e) {
      console.log(e)
    }

    let tempMashId;
    try {
      let temp = await axios.get(`/mashes/get/${userId}`)
      temp.data.map(item => {
        if (item.title === title) {
          tempMashId = item.id
          setMashID(item.id)
        } 
      })
    } catch (e) {
      console.log(e)
    } 

    try {
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].name !== " " && inputs[i].image !== " ") {

        setLoading(true)
        await axios.post("/cards/post", {title: inputs[i].name, image: inputs[i].image, mashID: String(tempMashId), eloScore: String(1200)})
        .then(() => {
          setLoading(false)
        })
      }
      }
    } catch (e) {
      console.log(e)
    }

    setOtherModal(true)
  }

  const handleOtherModal = () => {
    navigate(`/profile/${currentUser.id}`)
  }

  useEffect(() => {
    setIsMobile(window.innerWidth < 800)
  }, [])

  return ( 
    <div className="create-content">
      <Header />
      {otherModal && <div className="create-otherModalOverlay">
            <div className="create-otherModal">
            <p className="create-otherModalText">Here's the link to your mash: </p>  
            <a href={`/mash/${title.split(" ").join("")}/${mashID}`} className="create-otherModalLink">https://mash.herokuapp.com{`/mash/${title.split(" ").join("")}/${mashID}`}</a>
            <button className="create-otherModalButton" style={{justifySelf: "center"}} onClick={handleOtherModal}>Home</button>
          </div>
        </div>}
      {loading && <div className="create-loadingOverlay">
        <div className="create-loading">
          <p className="create-loadingText">Creating...</p>
        </div>
      </div>}

      {<div className="create-body">
        {showModal && <div className="create-modalOverlay">
          <div className="create-modal">
            <p className="create-modalText">{error}</p>
          </div>
        </div>
        }

        <p className="create-header">CREATE A NEW MASH</p>
        <div className="create-setup">
          <div className="create-group create-name-group">
            <p className="create-label">Title: </p>
            <input type="text" className="create-name setup create-input" placeholder="Enter a Title" required onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div className="create-group create-category-group">
            <p className="create-label">Category: </p>
            <select className="create-category setup create-input" onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All</option>
              <option value="sports">Sports</option>
              <option value="people">People</option>
              <option value="film">Film</option>
              <option value="music">Music</option>
              <option value="places">Nature</option>
              <option value="food">Food</option>
              <option value="places">Places</option>
            </select>
          </div>
          <div className="create-group create-access-group">
            <p className="create-label">Access?: </p>
            <select className="create-switch create-input" onChange={(e) => setAccess(e.target.value)}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="create-group create-info-group">
            <p className="create-label">Info:  </p>
            <input type="text" className="create-info create-input" placeholder="Add Some Context, Give Image Credits, etc." onChange={(e) => setInfo(e.target.value)}/>
          </div>
          <div className="create-group create-ques-group">
            <p className="create-label">Question:  </p>
            <select className="create-ques create-input" onChange={(e) => setQues(e.target.value)}>
              <option value="Which One's Better?">Which One's Better?</option>
              <option value="Which Do You Prefer?">Which Do You Prefer?</option>
            </select>
          </div>
        </div>
        <div className="create-line" />
        <div className="create-form">
          <div className="create-items">
            {inputs.map((item, index) => {
              if (item.name !== "" && item.image !== "") return <div className="create-wrapper" onFocus={() => setSelectedId(item.id)}> <Input key={item.id} id={item.id} number={index} name={item.name} image={item.image} inputs={inputs} selectedId={selectedId} setInputs={setInputs} handleDelete={handleDelete}/> </div>
            })}
          </div>
          <button className="create-add" onClick={handleAdd}>Add Card</button>
          <button className="create-submit" onClick={handleSubmit}>Create</button>
        </div>
      </div>}
    </div>
  );
}
 
export default Create;