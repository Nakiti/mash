import Header from "../components/Header";
import {useState, useContext, useEffect} from "react"
import Input from "../components/Input";
// import "../styles/create.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const Create = () => {
  const [inputs, setInputs] = useState([{id: 0, number: 1, name: " ", image: " "}])
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
      setInputs((prev) => [...prev, {id: prev[prev.length - 1].id + 1, name: "", image: ""}])

      console.log(inputs)
   }

  const handleDelete = (id) => {
    setInputs((prevInputs) => {
      // Filter out the item with the matching id
      const updatedInputs = prevInputs.filter((input) => input.id !== id);
  
      // Update the number property based on the new order
      return updatedInputs.map((input, index) => ({
        ...input,
        number: index + 1, // Update the number property to reflect the new order
      }));
    });
  };
  
 
 

  const handleModal = () => {
    setShowModal(true)
    setTimeout(() => {
      setShowModal(false)
    }, 1000)
  }

  const handleSubmit = async(e) => {
    let blank;

    inputs.map((item) => {
      if (item.image == " " || item.name == " ") {
        blank = true;
      }
    })

    if (title === "") {
      setError("Enter a Title")
      handleModal()

      return
    } else if (inputs.length < 2) {
      setError("Must Have at Least 2 Cards")
      handleModal()
      return
    } else if (blank) {
      console.log(error)

      setError("Cards Can Not Be Blank")
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
                {otherModal && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
                            <p className="text-lg font-semibold mb-4">Here's the link to your mash:</p>
                            <a href={`/mash/${title.split(" ").join("")}/${mashID}`} className="text-blue-500 underline mb-6 block">
                            {`https://mash.herokuapp.com/mash/${title.split(" ").join("")}/${mashID}`}
                            </a>
                            <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300" onClick={handleOtherModal}>
                                Home
                            </button>
                        </div>
                    </div>
                )}

            {loading && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="flex flex-col items-center">
                        <svg className="animate-spin h-8 w-8 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        <p className="text-white text-lg">Creating...</p>
                    </div>
                </div>
            )}

            <div className="create-body">
                {showModal && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                        <p className="text-red-500 text-lg font-semibold">{error}</p>
                        </div>
                    </div>
                )}

                <p className="text-center text-3xl mt-16">CREATE A NEW MASH</p>

                <div className="create-setup flex flex-wrap justify-center space-x-4 p-4 mt-2">
                    <div className="create-group">
                        <p className="create-label text-sm font-semibold mb-1 text-center">Title:</p>
                        <input type="text" className="create-input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter a Title" required onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="create-group">
                        <p className="create-label text-sm font-semibold mb-1 text-center">Category:</p>
                        <select className="create-input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setCategory(e.target.value)}>
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
                    <div className="create-group">
                        <p className="create-label text-sm font-semibold mb-1 text-center">Access?:</p>
                        <select className="create-input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setAccess(e.target.value)}>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        </select>
                    </div>
                    <div className="create-group">
                        <p className="create-label text-sm font-semibold mb-1 text-center">Info:</p>
                        <input type="text" className="create-input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Add Some Context, Give Image Credits, etc." onChange={(e) => setInfo(e.target.value)} />
                    </div>
                    <div className="create-group">
                        <p className="create-label text-sm font-semibold mb-1 text-center">Question:</p>
                        <select className="create-input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setQues(e.target.value)}>
                        <option value="Which One's Better?">Which One's Better?</option>
                        <option value="Which Do You Prefer?">Which Do You Prefer?</option>
                        </select>
                    </div>
                </div>

                <div className="create-line" />
                <div className="create-form flex flex-col items-center space-y-4">
                    <div className="create-items w-4/5">
                    {inputs.map((item, index) => {
                        if (item.name !== "" && item.image !== "") {
                            return (
                                 <div className="create-wrapper" onFocus={() => setSelectedId(item.id)}> 
                                    <Input key={item.id} id={item.id} number={index} name={item.name} image={item.image} inputs={inputs} selectedId={selectedId} setInputs={setInputs} handleDelete={handleDelete}/> 
                                 </div>
                            );
                        }
                    })}
                </div>
                <div className="flex space-x-4">
                    <button className="create-add bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300" onClick={handleAdd}>
                        Add Card
                    </button>
                    <button className="create-submit bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300" onClick={handleSubmit}>
                        Create
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
  
 
export default Create;