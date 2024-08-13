import { useEffect, useState } from "react"
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import axios from "axios";

const Suggested = (props) => {

   const [data, setData] = useState(null)


   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(`/mashes/getmashbycat/${props.category}`)

            setData(response.data.filter((item) => item.plays > 10))

         } catch (err) {
            console.log(err)
         }

      }

      fetchData()
   })

   return (
      <div className="flex flex-col space-y-4 items-center overflow-x-hidden w-32">

         <div className="flex flex-row justify-between items-center w-full">
            <p className="text-center font-bold mb-[-4]">Suggested:</p>
            <button onClick={props.handleSuggested} className="inline-flex justify-center  text-gray-700 hover:bg-gray-300 focus:outline-none">
               {props.suggestedOpen ?<FaChevronUp /> : <FaChevronDown />}
            </button>
         </div>


         <div className="space-y-4 h-96 overflow-y-scroll overflow-x-hidden">
            {props.suggestedOpen && data && data.map((item) => {
               return (
                  <div key={item.title} className="flex flex-col cursor-pointer items-center h-16 w-16 group hover:transform hover:-translate-y-1 hover:shadow-lg transition-transform duration-300">
                     <img src={item.imageOne} alt={item.title} className="w-16 h-16 object-contain rounded-md" />
                     <p className="text-sm bg-gray-50 text-center shadow-md rounded-b-md text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.title}</p>
                  </div>

               );
            })}
         </div>
      </div>
   )
}

export default Suggested;