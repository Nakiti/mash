import { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client"
import { IoMdRefresh } from "react-icons/io";

const Results = () => {
   const [data, setData] = useState(null)
   const {id} = useParams()
   const navigate = useNavigate()
   const [plays, setPlays] = useState(null)
   const [title, setTitle] = useState(null)
   const previousRankings = useRef([])

   useEffect(() => {
      const ws = io();

      // ws.on("updateCards", (input) => {
      //    const data = (input);
      
      //    if (data.type === 'UPDATE_CARDS') {
      //       setData(prevData => {
      //          // Create a copy of the previous data to work with
      //          const newData = [...prevData];
               
      //          // Find the index of the item that needs to be updated
      //          const index = newData.findIndex(item => item.id === data.cardId);
               
      //          // If the item is found
      //          if (index !== -1) {
      //              // Update the contents of the item
      //              newData[index] = { ...newData[index], eloScore: data.eloScore };
           
      //              // Trickle the eloScore up or down without changing the item's position
      //              let newIndex = index;
           
      //              // Move the eloScore up if it's greater than the one above it
      //              while (newIndex > 0 && newData[newIndex].eloScore > newData[newIndex - 1].eloScore) {
      //                  // Swap the contents of the two items
      //                  [newData[newIndex].eloScore, newData[newIndex - 1].eloScore] = [newData[newIndex - 1].eloScore, newData[newIndex].eloScore];
      //                  [newData[newIndex].title, newData[newIndex - 1].title] = [newData[newIndex - 1].title, newData[newIndex].title];
      //                  [newData[newIndex].image, newData[newIndex - 1].image] = [newData[newIndex - 1].image, newData[newIndex].image];
      //                  newIndex--;
      //              }
           
      //              // Move the eloScore down if it's lower than the one below it
      //              while (newIndex < newData.length - 1 && newData[newIndex].eloScore < newData[newIndex + 1].eloScore) {
      //                  // Swap the contents of the two items
      //                  [newData[newIndex].eloScore, newData[newIndex + 1].eloScore] = [newData[newIndex + 1].eloScore, newData[newIndex].eloScore];
      //                  [newData[newIndex].title, newData[newIndex + 1].title] = [newData[newIndex + 1].title, newData[newIndex].title];
      //                  [newData[newIndex].image, newData[newIndex + 1].image] = [newData[newIndex + 1].image, newData[newIndex].image];
      //                  newIndex++;
      //              }
      //          }
           
      //          // Update previous rankings
      //          previousRankings.current = newData.map((item) => item.id);
           
      //          // Return the updated data
      //          return newData;
      //      });
      //    }
      // })

      ws.on("updatePlays", (input) => {
      
         const data = JSON.parse(input)
         // console.log(data)
         setPlays(data.mash.plays)
      })


      getData()

      return () => {
         ws.close();
      };
   }, [])

   
   const getData = async() => {
      const response = await axios.get(`/cards/get/${id}`)
      const sortedData = response.data.sort((a, b) => b.eloScore - a.eloScore)

      const otherResponse = await axios.get(`/mashes/getmashbyid/${id}`)

      setPlays(otherResponse.data[0].plays)
      setTitle(otherResponse.data[0].title)
      previousRankings.current = sortedData.map((item) => item.id)
      setData(sortedData)
   }

   return (
<div className="results-content">
  <Header />
  <div className="results-body">
    <p className="results-title text-xl lg:text-2xl font-bold text-center mt-4">Rankings:</p>
    {title && <p className="results-subtitle text-lg lg:text-xl font-medium text-center text-gray-700 my-1">{title} Mash</p>}
    {plays && <p className="results-plays text-md lg:text-lg text-center text-gray-500 my-1">Plays: {plays}</p>}
    <div className="flex justify-end px-4 lg:max-w-md mx-auto">
      <button 
        className="text-blue rounded-xl hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300"
        onClick={async() => {
          const response = await axios.get(`/cards/get/${id}`);
          const sortedData = response.data.sort((a, b) => b.eloScore - a.eloScore);
          setData(sortedData);
        }}
      >
        <IoMdRefresh className="text-lg"/>
      </button>
    </div>
    <div className="results-items-wrapper">
      <div className="results-items justify-center overflow-y-auto max-h-[calc(100vh-16rem)] lg:max-h-[calc(100vh-16rem)] max-w-full lg:max-w-md mx-auto p-2 lg:p-4">
        {data && data.map((item, index) => {
          const previousIndex = previousRankings.current.indexOf(item.id);
          const movementClass =
            previousIndex > index
            ? "move-up"
            : previousIndex < index
            ? "move-down"
            : "";
          return (
            <div key={index} className={`results-container bg-white p-2 lg:p-3 mb-2 lg:mb-2 rounded-lg shadow-md flex items-center space-x-2 lg:space-x-4 ${movementClass}`}>
              <p className="results-text text-sm lg:text-lg font-semibold">{index + 1}</p>
              <img src={item.image} alt={item.title} className="results-image h-10 w-10 lg:h-10 lg:w-10 object-contain rounded-md" />
              <p className="results-name text-sm lg:text-md font-medium">{item.title}</p>
            </div>
          );
        })}
      </div>
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