import axios from "axios";
import "../styles/card.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const Card = (props) => {
  const navigate = useNavigate()
  const [cards, setCards] = useState(null)
  const [two, setTwo] = useState(null)

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
    navigate(`/mash/${props.title}/${props.id}`)
  }

  useEffect(() => {
    // const fetchData = async() => {
    //   // const response = await axios.get(`/cards/get/${props.id}`)

    //   const temp = response.data.sort((a, b) => b.eloScore - a.eloScore)
    //   temp.slice(0, 2)
    //   // console.log(temp)

    //   setTwo(temp)
    //   console.log(two[0].image, two[1].image)


    // }

    // fetchData()

  }, [])

  return ( 
    <div className="card-content">
      {/* <div className="card-top">
        {props.show &&<button className="card-delete card-btn" onClick={handleDelete}><i class="fa fa-trash"></i></button>}
      </div> */}
      {<div className="card-middle" onClick={handleClick}>
        <p className="card-title">{props.title}</p>
        <p className="card-count card-p">Plays: {props.plays}</p>
        {/* {two[0] && two[1] && <div className="card-container">
          <img src={two[0].image} alt="" className="card-image" />
          <p className="card-text">vs</p>
          <img src={two[1].image} alt="" className="card-image" />
        </div>} */}
      </div>}
      <div className="card-bottom">
        <button className="card-button" onClick={() => navigate(`/results/${props.title}/${props.id}`)}>Rankings</button>
        <p className="card-date card-p">{props.date}</p>
      </div>
    </div>
  );
}
 
export default Card;