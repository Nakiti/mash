import axios from "axios";
import "../styles/infoModal.css"
import { useEffect, useState } from "react";

const TheInfoModal = (props) => {
  const [info, setInfo] = useState(null)

  useEffect(() => {
    const getData = async() => {
      try {
        const response = await axios.get(`http://localhost:4000/mashes/getmashbyid/${props.id}`)
        const temp = response.data[0].info
        setInfo(temp)
      } catch (err) {
        console.log(err)
      }
    }

    getData()
  }, [])

  return ( 
    <div className="infoModal-overlay">
      <div className="infoModal-content">
        <p className="infoModal-title">INFORMATION:</p>
        <p className="infoModal-text">From the creator: {info}</p>
        <p className="infoModal-text"><b>Instructions:</b></p>
        <p className="infoModal-text">For each matchup, pick the one you think to be better! The longer you play, the more accurate your ranking will be!</p>
        <p className="infoModal-text">Max Plays: {props.length}</p>
        <button className="infoModal-button" onClick={() => props.setInfoModal(false)}>CLOSE</button>
      </div>
    </div>
  );
}
 
export default TheInfoModal;