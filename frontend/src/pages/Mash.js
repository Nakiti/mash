import Header from "../components/Header.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/mash.css"
import Modal from "../components/Modal.js";
import TheInfoModal from "../components/TheInfoModal.js";

const Mash = () => {
  const {title, id} = useParams()
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
          if (rand > 75 && topPairs.length > 0) {
            const temp= [...topPairs]
            let pair =  temp[Math.floor(Math.random() * temp.length)]

            one = cards.indexOf(pair[0])
            two = cards.indexOf(pair[1])
            console.log("ran")

            const ind = temp.indexOf(pair)
            temp.splice(ind, 1)
            setTopPairs(temp)
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

        await axios.put("/cards/update", {eloScore: scoreOne, id: cards[cardOne].id}) // update score one
        await axios.put("/cards/update", {eloScore: scoreTwo, id: cards[cardTwo].id}) //update second 

        temp[cardOne].eloScore = scoreOne
        temp[cardTwo].eloScore = scoreTwo

        userTemp[cardOne].eloScore = userScoreOne
        userTemp[cardTwo].eloScore = userScoreTwo
      } else if (e.target.alt == temp[cardTwo].title) { //card two clicked
        let scoreOne = temp[cardOne].eloScore + k*(0-expectedOne)
        let scoreTwo = temp[cardTwo].eloScore + k*(1-expectedTwo)
        
        let userScoreOne = userTemp[cardOne].eloScore + k*(0-userExpectedOne)
        let userScoreTwo = userTemp[cardTwo].eloScore + k*(1-userExpectedTwo)

        await axios.put("/cards/update", {eloScore: scoreOne, id: cards[cardOne].id}) // update score one
        await axios.put("/cards/update", {eloScore: scoreTwo, id: cards[cardTwo].id}) //update second 

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

  const handleTop = (list) => {
    let top = [...list]
    top.sort((a, b) => b.eloScore - a.eloScore)
    
    let secondTop = top.slice(0, 10)
    console.log(secondTop)

    const temp = []

    for (var j = 0; j < secondTop.length; j++) {
      for (var x = j + 1; x < secondTop.length; x++) {
        temp.push([secondTop[x], secondTop[j]])
      }
    }

    setTopPairs(temp)
  }

  const handleInfoButton = () => {
    setInfoModal(true)
  }

  useEffect(() => {
    const getData = async() => {
      try { 
      const response = await axios.get(`/cards/get/${id}`)
      const otherResponse = await axios.get(`/mashes/getmashbyid/${id}`)
      setMashPlays(otherResponse.data[0].plays)
      setQues(otherResponse.data[0].question)

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
      handleTop(response.data)
      }
      catch (err) {
        console.log(err)
      }
    }
    getData()
    handleUserCards()
  }, [])

  return ( 
    <div className="mash-content">
      <Header />
     { cards && userCards && ques && <div className="mash-body">
        {showModal && <Modal className="mash-modal" userCards={userCards} setShowModal={setShowModal} empty={empty} title={title} id={id}/>}
        {infoModal && <TheInfoModal className="mash-infoModal" length={length} id={id} setInfoModal={setInfoModal}/>}
        <p className="mash-title">{title} MASH</p>
        <p className="mash-info">{ques}</p>
        <button className="mash-infoButton" onClick={handleInfoButton}><i class="fa fa-question"></i></button>
        <div className="mash-container">
          <div className="mash-tile" alt={cards[cardOne].title} onClick={(e) => empty ? null : handleClick(e)}>
            {blur && <div className="mash-overlay"><div className="mash-blur"></div></div>}
            <img src={cards[cardOne].image} alt={cards[cardOne].title} className="mash-image" />
            <p className="mash-label" alt={cards[cardOne].title}><b>{cards && cards[cardOne].title}</b></p>
          </div>
          <p className="mash-text">VS</p>
          <div className="mash-tile" alt={cards[cardTwo].title} onClick={(e) => empty ? null : handleClick(e)}>
            {blur && <div className="mash-overlay"><div className="mash-blur"></div></div>}
            <img src={cards[cardTwo].image} alt={cards[cardTwo].title} className="mash-image" />
            <p className="mash-label" alt={cards[cardTwo].title}><b>{cards && cards[cardTwo].title}</b></p>
          </div>
        </div>
        <div className="mash-progressBarContainer">
          <div className="mash-progressBar"></div>
        </div>
        <button className="mash-endButton" onClick={handleSubmit}>Finish</button>
        <div className="mash-stats">
          {total && <p className="mash-clicks">PLAYS: {clicks}</p>}
        </div>
      </div>}
    </div>
  );
}
 
export default Mash;