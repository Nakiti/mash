import axios from "axios";
import "../styles/infoModal.css"
import { useEffect, useState } from "react";

const TheInfoModal = (props) => {
  const [info, setInfo] = useState(null)

  useEffect(() => {
    const getData = async() => {
      try {
        const response = await axios.get(`/mashes/getmashbyid/${props.id}`)
        const temp = response.data[0].info
        setInfo(temp)
      } catch (err) {
        console.log(err)
      }
    }

    getData()
  }, [])

  return ( 
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
    <p className="text-xl font-semibold mb-4 text-center">INFORMATION:</p>
    <p className="text-base mb-2">From the creator: {info}</p>
    <p className="text-base font-bold mb-2">Instructions:</p>
    <p className="text-base mb-4">For each matchup, pick the one you think to be better! The longer you play, the more accurate your ranking will be!</p>
    <p className="text-base mb-6">Max Plays: {props.length}</p>
    <div className="flex justify-center">
      <button 
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        onClick={() => props.setInfoModal(false)}
      >
        CLOSE
      </button>
    </div>
  </div>
  </div>
  );
}
 
export default TheInfoModal;