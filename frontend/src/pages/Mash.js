import Header from "../components/Header.js";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import "../styles/mash.css"
import Modal from "../components/Modal.js";
import TheInfoModal from "../components/TheInfoModal.js";
import Suggested from "../components/Suggested.js";

const Mash = () => {
  const {id} = useParams()
  const [title, setTitle] = useState(null)
  const [cards, setCards] = useState(null)
  const [userCards, setUserCards] = useState(null)
  const [max, setMax] = useState(2)
  const [cardOne, setCardOne] = useState(null)
  const [cardTwo, setCardTwo] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [pairs, setPairs] = useState([])
  const k = 16
  const [empty, setEmpty] = useState(false)
  const [clicks, setClicks] = useState(0)
  const [total, setTotal] = useState(null)
  const [infoModal, setInfoModal] = useState(false)
  const [length, setLength] = useState(0)
  const [mashPlays, setMashPlays] = useState(0)
  const [ques, setQues] = useState(null)
  const [blur, setBlur] = useState(false)
  const [prev, setPrev] = useState([])
  const [topPairs, setTopPairs] = useState([])
  const [thing, setThing] = useState([])
  const [suggestedOpen, setSuggestedOpen] = useState(true)
  const [category, setCategory] = useState("")
  const location = useLocation()

  const setTile = () => {
    let one = Math.floor(Math.random() * max)
    let two = Math.floor(Math.random() * max)
    let valid = false;
    let temp = [...pairs]

    // console.log(topPairs)

    if (prev.length > 2) {
      prev.pop()
      prev.pop()
    }
    while (valid == false) {
      let rand = Math.floor(Math.random() * 100)
      if (pairs.length === 0 ){
        valid = true
        setEmpty(true)
        setShowModal(true)
        break
      }
      for (let i = 0; i < pairs.length; i++) {
        if (
          (pairs[i][0] == cards[one].title && pairs[i][1] == cards[two].title) || 
          (pairs[i][0] == cards[two].title && pairs[i][1] == cards[one].title)
          ) {
            // thing.push(cards[one].title, cards[two].title)
            // thing.map(item => console.log(item))
            temp.splice(i, 1)
            setPairs(temp)
            valid = true

            // console.log(userCards[one], userCards[two])
            break
        } else {
          if (rand > 90 && topPairs.length > 0 && mashPlays > 10000000) {
            // const temp= [...topPairs]
            // let pair =  temp[Math.floor(Math.random() * temp.length)]

            // one = cards.indexOf(pair[0])
            // two = cards.indexOf(pair[1])
            // console.log("ran")

            // const ind = temp.indexOf(pair)
            // temp.splice(ind, 1)
            // setTopPairs(temp)
          } else {
            one = Math.floor(Math.random() * max)
            two = Math.floor(Math.random() * max)

            while (one === two) {
              one = Math.floor(Math.random() * max)
              two = Math.floor(Math.random() * max)
            }

            console.log("not ran")
          }
        }
      }
    }


    if (cards[one].title == prev[0]) {
      let temp = one
      one = two
      two = temp
    } else if (cards[two].title == prev[1]) {
      let temp = two
      two = one
      one = temp
    }

    setCardOne(one)
    setCardTwo(two)
    setPrev(arr => [cards[one].title, cards[two].title, ...arr])
  }
  // add code so same card doesn't show up repeatedly, seems to skew results in short sample

  const handleClick = async (e) => {
    const temp = [...cards]
    const userTemp = [...userCards]

    let expectedOne = 1/(1 + 10**((temp[cardTwo].eloScore - temp[cardOne].eloScore)/400)) //set rates
    let expectedTwo = 1/(1 + 10**((temp[cardOne].eloScore - temp[cardTwo].eloScore)/400))

    let userExpectedOne = 1/(1 + 10**((userTemp[cardTwo].eloScore - userTemp[cardOne].eloScore)/400)) //set rates
    let userExpectedTwo = 1/(1 + 10**((userTemp[cardOne].eloScore - userTemp[cardTwo].eloScore)/400))
    try {
      if (e.target.alt == temp[cardOne].title) { //card one clicked
        let scoreOne = temp[cardOne].eloScore + k*(1-expectedOne)
        let scoreTwo = temp[cardTwo].eloScore + k*(0-expectedTwo)

        let userScoreOne = userTemp[cardOne].eloScore + k*(1-userExpectedOne)
        let userScoreTwo = userTemp[cardTwo].eloScore + k*(0-userExpectedTwo)     

        await axios.put("/cards/update", {eloScoreOne: scoreOne, idOne: cards[cardOne].id, eloScoreTwo: scoreTwo, idTwo: cards[cardTwo].id}) // update score one

        temp[cardOne].eloScore = scoreOne
        temp[cardTwo].eloScore = scoreTwo

        userTemp[cardOne].eloScore = userScoreOne
        userTemp[cardTwo].eloScore = userScoreTwo
      } else if (e.target.alt == temp[cardTwo].title) { //card two clicked
        let scoreOne = temp[cardOne].eloScore + k*(0-expectedOne)
        let scoreTwo = temp[cardTwo].eloScore + k*(1-expectedTwo)
        
        let userScoreOne = userTemp[cardOne].eloScore + k*(0-userExpectedOne)
        let userScoreTwo = userTemp[cardTwo].eloScore + k*(1-userExpectedTwo)

        await axios.put("/cards/update", {eloScoreOne: scoreOne, idOne: cards[cardOne].id, eloScoreTwo: scoreTwo, idTwo: cards[cardTwo.id]}) // update score one

        temp[cardOne].eloScore = scoreOne
        temp[cardTwo].eloScore = scoreTwo

        userTemp[cardOne].eloScore = userScoreOne
        userTemp[cardTwo].eloScore = userScoreTwo
      }
    } catch (err) {
      console.log(err)
    }
    setTimeout(() => {
      setClicks(prev => prev + 1)
      setCards(temp)
      setUserCards(userTemp)
      setTile()
    }, 100)

    // setCards(temp)
    // setUserCards(userTemp)
    // setTile()
    if (clicks === 0) {
      const updatedPlays = mashPlays + 1
      await axios.put(`/mashes/update`, {plays: updatedPlays, id: id})
    }
  }

  const handleSubmit = () => {
    setShowModal(true)
  }

  const findPairs = (list, one, two) => {
    const temp = []
    for (let i = 0; i < list.length; i++) {
      for (let x = i + 1; x < list.length; x++) {
        temp.push([list[i].title, list[x].title])
      }
    }
    let pos;

    for (var i = 0; i < temp.length; i++) {
      for (var x = 0; x < 2; x++) {
        if ((temp[i][0] == list[one].title && temp[i][1] == list[two].title) || (temp[i][0] == list[two].title && temp[i][1] == list[one].title)) {
          pos = i
        }
      }
    }

    temp.splice(pos, 1)
    setPairs(temp)
    setTotal(temp.length + 1)
    setLength(temp.length + 1)
    // setPairsLength(temp.length + 1)
  }

  const handleUserCards = async() => {
    try {
      const response = await axios.get(`/cards/get/${id}`)
      const temp = [...response.data]
      temp.map(item => item.eloScore = 1200)
      setUserCards(temp)
    } catch (err) {
      console.log(err)
    }
  }


  const handleInfoButton = () => {
    setInfoModal(true)
  }

  useEffect(() => {
    // console.log("id", id)

    const getData = async() => {
      try { 
         const response = await axios.get(`/cards/get/${id}`)
         const otherResponse = await axios.get(`/mashes/getmashbyid/${id}`)
         setMashPlays(otherResponse.data[0].plays)
         setQues(otherResponse.data[0].question)
         setTitle(otherResponse.data[0].title)
         setCategory(otherResponse.data[0].category)

         setCards(response.data)
         setMax(response.data.length)

         let one = Math.floor(Math.random() * response.data.length)
         let two = Math.floor(Math.random() * response.data.length)
         while (one === two) {
         two = Math.floor(Math.random() * response.data.length)
         }


         findPairs(response.data, one, two)
         setCardOne(one)
         setCardTwo(two)
      }
      catch (err) {
        console.log(err)
      }
    }
    getData()
    handleUserCards()
  }, [id])

  const handleSuggested = () => {
   setSuggestedOpen(!suggestedOpen)
  }

  return (
   <div className="">
     <Header />
     <div className="flex flex-col items-center w-full px-4 lg:px-0">
       {cards && userCards && ques && (
         <div className="relative w-full">
           {showModal && (
             <Modal
               className="mash-modal"
               userCards={userCards}
               setShowModal={setShowModal}
               empty={empty}
               title={title}
               id={id}
             />
           )}
           {infoModal && (
             <TheInfoModal
               className="mash-infoModal"
               length={length}
               id={id}
               setInfoModal={setInfoModal}
             />
           )}
 
           {/* Flex container for content and suggested tab */}
           <div className="flex items-center justify-center w-full">
             {/* Main content */}
             <div className="flex flex-col items-center w-full max-w-4xl">
               {title && (
                 <p className="text-center text-2xl md:text-3xl mt-8 font-bold">
                   {title} MASH
                 </p>
               )}
               <p className="text-center text-lg md:text-xl mt-2">{ques}</p>
               <div className="flex items-center justify-center mt-2">
                 <button
                   className="p-2 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300"
                   onClick={handleInfoButton}
                 >
                   <i className="fa fa-question text-sm"></i>
                 </button>
               </div>
               <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-x-4 md:space-y-0 p-4">
                  <div 
                     className="relative flex flex-col items-center cursor-pointer"
                     alt={cards[cardOne].title}
                     onClick={(e) => (empty ? null : handleClick(e))}
                  >
                     {blur && (
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                           <div className="w-full h-full bg-gray-800 opacity-60"></div>
                        </div>
                     )}
                     <img
                        src={cards[cardOne].image}
                        alt={cards[cardOne].title}
                        className="w-36 h-36 md:w-56 md:h-56 object-contain rounded-md hover:transform hover:-translate-y-1 hover:shadow-lg transition-transform duration-300"
                     />
                     <p className="mt-2 text-center font-semibold text-base md:text-lg">
                        {cards && cards[cardOne].title}
                     </p>
                  </div>
         
                  <p className="text-xl md:text-2xl font-bold">VS</p>
         
                  <div
                     className="relative flex flex-col items-center cursor-pointer"
                     alt={cards[cardTwo].title}
                     onClick={(e) => (empty ? null : handleClick(e))}
                  >
                     {blur && (
                     <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="w-full h-full bg-gray-800 opacity-60"></div>
                     </div>
                     )}
                     <img
                        src={cards[cardTwo].image}
                        alt={cards[cardTwo].title}
                        className="w-36 h-36 md:w-56 md:h-56 object-contain rounded-md hover:transform hover:-translate-y-1 hover:shadow-lg transition-transform duration-300"
                     />
                     <p className="mt-2 text-center font-semibold text-base md:text-lg">
                        {cards && cards[cardTwo].title}
                     </p>
                 </div>
               </div>
         
               <div className="mash-progressBarContainer mt-4">
                 <div className="mash-progressBar"></div>
               </div>
               <div className="flex items-center justify-center mt-0">
                 <button
                   className="px-4 py-2 md:px-6 md:py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-all duration-300"
                   onClick={handleSubmit}
                 >
                   Finish
                 </button>
               </div>
               <div className="flex items-center justify-center mt-2">
                 <div className="mash-stats text-center p-2">
                   {total && (
                     <p className="mash-clicks text-sm md:text-base font-semibold text-gray-700">
                       PLAYS: {clicks} / {length}
                     </p>
                   )}
                 </div>
               </div>
             </div>
 
             {/* Suggested tab */}
               <div className="hidden lg:absolute lg:right-10 lg:top-12 lg:block">
                  <Suggested category={category} suggestedOpen={suggestedOpen} handleSuggested={handleSuggested} />
               </div>
           </div>
         </div>
       )}
     </div>
   </div>
 );
 
}  
 
export default Mash;