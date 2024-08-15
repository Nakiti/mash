import { useState } from "react";
// import "../styles/modal.css"
import { useNavigate } from "react-router-dom";
import {TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, RedditShareButton, RedditIcon, WhatsappShareButton, WhatsappIcon} from "react-share"

const Modal = (props) => {
   const navigate = useNavigate()
   const temp =[...props.userCards]
   const sorted = temp.sort((a, b) => b.eloScore - a.eloScore)
   const url = `https://mash.herokuapp.com/mash/${props.title}/${props.id}`.replace(/\s+/g, '%20')
   const size = 40;

   return ( 
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            {props.empty && <p className="text-2xl font-bold mb-4">You've Completed This Mash!</p>}
            <p className={`text-xl font-semibold ${props.empty ? "text-base" : "text-lg"} mb-4`}>Your Results:</p>
            <div className={`overflow-y-auto ${props.empty ? "max-h-40" : "max-h-64"} mb-4`}>
               {sorted.map((item, index) => (
                  <div key={item.id} className="flex items-center mb-2 p-2 bg-gray-100 rounded-lg shadow-sm">
                     <p className="text-sm font-semibold mr-2">{index + 1}</p>
                     <img src={item.image} alt={item.title} className="h-10 w-10 object-contain rounded-md mr-2" />
                     <p className="text-sm">{item.title}</p>
                  </div>
               ))}
            </div>
            <div className="flex justify-center space-x-4 mt-4">
               <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300" onClick={() => navigate("/")}>Home</button>
               <button className="py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-all duration-300" onClick={() => navigate(`/results/${props.title.split(" ").join("")}/${props.id}`)}>Rankings</button>
               {!props.empty && <button className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all duration-300" onClick={() => props.setShowModal(false)}>Continue</button>}
            </div>
            <div className="flex justify-center space-x-2 mt-4">
               <TwitterShareButton url={`My T5 ${props.title}: \n 
                  ${props.userCards[0] ? "1. " + props.userCards[0].title : ""} \n
                  ${props.userCards[1] ? "2. " + props.userCards[1].title : ""} \n
                  ${props.userCards[2] ? "3. " + props.userCards[2].title : ""} \n
                  ${props.userCards[3] ? "4. " + props.userCards[3].title : ""} \n
                  ${props.userCards[4] ? "5. " + props.userCards[4].title : ""} \n\nDisagree? You Rank: \n${url} \n\n#MashRankings`}>
                  <TwitterIcon className="modal-icon" size={32}/>
               </TwitterShareButton>
               <FacebookShareButton url={`My T5 ${props.title}: \n 
                  ${props.userCards[0] ? "1. " + props.userCards[0].title : ""} \n
                  ${props.userCards[1] ? "2. " + props.userCards[1].title : ""} \n
                  ${props.userCards[2] ? "3. " + props.userCards[2].title : ""} \n
                  ${props.userCards[3] ? "4. " + props.userCards[3].title : ""} \n
                  ${props.userCards[4] ? "5. " + props.userCards[4].title : ""} \n\nDisagree? You Rank: \n${url} \n\n#MashRankings`}>
                  <FacebookIcon className="modal-icon" size={32}/>
               </FacebookShareButton>
               <RedditShareButton url={`My T5 ${props.title}: \n 
                  ${props.userCards[0] ? "1. " + props.userCards[0].title : ""} \n
                  ${props.userCards[1] ? "2. " + props.userCards[1].title : ""} \n
                  ${props.userCards[2] ? "3. " + props.userCards[2].title : ""} \n
                  ${props.userCards[3] ? "4. " + props.userCards[3].title : ""} \n
                  ${props.userCards[4] ? "5. " + props.userCards[4].title : ""} \n\nDisagree? You Rank: \n${url} \n\n#MashRankings`}>
                  <RedditIcon className="modal-icon" size={32}/>
               </RedditShareButton>
               <WhatsappShareButton url={`My T5 ${props.title}: \n 
                  ${props.userCards[0] ? "1. " + props.userCards[0].title : ""} \n
                  ${props.userCards[1] ? "2. " + props.userCards[1].title : ""} \n
                  ${props.userCards[2] ? "3. " + props.userCards[2].title : ""} \n
                  ${props.userCards[3] ? "4. " + props.userCards[3].title : ""} \n
                  ${props.userCards[4] ? "5. " + props.userCards[4].title : ""} \n\nDisagree? You Rank: \n${url} \n\n#MashRankings`}>
                  <WhatsappIcon className="modal-icon" size={32}/>
               </WhatsappShareButton>
            </div>
         </div>
      </div>

   );
}
 
export default Modal;