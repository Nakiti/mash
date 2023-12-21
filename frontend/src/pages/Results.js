import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/results.css"
import { useNavigate } from "react-router-dom";

const Results = () => {
  const [data, setData] = useState(null)
  const {id} = useParams()
  const navigate = useNavigate()
  const [plays, setPlays] = useState(null)
  const [title, setTitle] = useState(null)

  useEffect(() => {
    const getData = async() => {
      const response = await axios.get(`/cards/get/${id}`)
      const sortedData = response.data.sort((a, b) => b.eloScore - a.eloScore)

      const otherResponse = await axios.get(`/mashes/getmashbyid/${id}`)

      setPlays(otherResponse.data[0].plays)
      setTitle(otherResponse.data[0].title)
      setData(sortedData)
    }

    getData()
  }, [])

  return ( 
    <div className="results-content">
      <Header />
      <div className="results-body">
        <p className="results-title">Rankings:</p>
        {title && <p className="results-subtitle">{title} Mash</p>}
        {plays && <p className="results-plays">Plays: {plays}</p>}
        <div className="results-items">
          {data && data.map((item, index) => {
            return (
              <div className="results-container">
                <p className="results-text">{index + 1}</p>
                <img src={item.image} alt={item.title} className="results-image" />
                <p className="results-name">{item.title}</p>
              </div>
            )
          })}
        </div>
        <div className="results-btnContainer">
          <button className="results-btn" onClick={() => navigate("/search")}>Home</button>
          <button className="results-btn" onClick={() => navigate(`/mash/${title}/${id}`)}>Play</button>
        </div>
      </div>
    </div>
   );
}
 
export default Results;