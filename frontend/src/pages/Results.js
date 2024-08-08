import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useParams } from "react-router-dom";
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
          <p className="results-title text-xl lg:text-2xl font-bold text-center mt-4">Rankings:</p>
          {title && <p className="results-subtitle text-lg lg:text-xl font-medium text-center text-gray-700 my-1">{title} Mash</p>}
          {plays && <p className="results-plays text-md lg:text-lg text-center text-gray-500 my-1">Plays: {plays}</p>}
 
          <div className="results-items justify-center overflow-y-auto max-h-[calc(100vh-16rem)] lg:max-h-[calc(100vh-16rem)] max-w-full lg:max-w-md mx-auto p-2 lg:p-4" >
             {data && data.map((item, index) => (
                <div key={index} className="results-container bg-white p-2 lg:p-3 mb-2 lg:mb-2 rounded-lg shadow-md flex items-center space-x-2 lg:space-x-4">
                   <p className="results-text text-sm lg:text-lg font-semibold">{index + 1}</p>
                   <img src={item.image} alt={item.title} className="results-image h-10 w-10 lg:h-10 lg:w-10 object-contain rounded-md" />
                   <p className="results-name text-sm lg:text-md font-medium">{item.title}</p>
                </div>
             ))}
          </div>
 
          <div className="results-btnContainer flex justify-center space-x-2 lg:space-x-4 mt-4">
             <button 
                className="results-btn bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300"
                onClick={() => navigate("/search")}
             >
                Home
             </button>
             <button 
                className="results-btn bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-all duration-300"
                onClick={() => navigate(`/mash/${title}/${id}`)}
             >
                Play
             </button>
          </div>
       </div>
    </div>
 );
 
}
 
export default Results;