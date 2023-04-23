import Header from "../components/Header";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import "../styles/search.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [cards, setCards] = useState(null)
  const [og, setOg] = useState(null)
  const [filter, setFilter] = useState("Most Popular")
  const [cat, setCat] = useState("all")

  const navigate = useNavigate()

  const handleSort = async(e) => {
    const temp = [...cards]
    temp.filter(item => item.category === cat)
    setFilter(e.target.value)

    if (e.target.value === "Most Popular") {

      setCards(temp.sort((a, b) => b.plays - a.plays))

    } else if (e.target.value === "Newest") {
      const response = await axios.get(`/mashes/getmashbycat/${cat}`)
      setCards(response.data.reverse())
    }
    
  }

  useEffect(() => {
    const getData = async() => {
      try {
        const response = await axios.get("/mashes/getmashbycat/all")
        setOg(response.data.reverse())

        const temp = [...response.data]
        setCards(temp.sort((a, b) => b.plays - a.plays))
      
      } catch (e) {
        console.log(e.response.data)
      }
    }
    getData()

  }, [])

  const handleClick = async (e) => {
    setCat(e.target.name)

    try {
      const response = await axios.get(`/mashes/getmashbycat/${e.target.name}`)

      if (filter === "Most Popular") {
        const temp = [...response.data]
        setCards(temp.sort((a, b) => b.plays - a.plays))
      } else if (filter === "Newest") {
        setCards(response.data.reverse())
      }

    } catch (err) {
      console.log(err)
    }
  }


  return ( 
    <div className="search-content">
      <Header />
      <div className="search-body">
        <div className="search-bar">
          <p className="search-label"><b>FIND MASHES</b></p>
          {/* <input type="text" className="search-input" />
          <button className="search-searchBtn">Go</button> */}
        </div>
        <div className="search-cats">
          <button className="search-btn" name="all" style={{backgroundColor: cat === "all" ? "#dcdcdc" : "white"}} onClick={handleClick}>ALL</button>
          <button className="search-btn" name="sports" style={{backgroundColor: cat === "sports" ? "#dcdcdc" : "white"}} onClick={handleClick}>SPORTS</button>
          <button className="search-btn" name="people" style={{backgroundColor: cat === "people" ? "#dcdcdc" : "white"}} onClick={handleClick}>PEOPLE</button>
          <button className="search-btn" name="film" style={{backgroundColor: cat === "film" ? "#dcdcdc" : "white"}} onClick={handleClick}>FILM</button>
          <button className="search-btn" name="music" style={{backgroundColor: cat === "music" ? "#dcdcdc" : "white"}} onClick={handleClick}>MUSIC</button>
          <button className="search-btn" name="places" style={{backgroundColor: cat === "places" ? "#dcdcdc" : "white"}} onClick={handleClick}>PLACES</button>
          <button className="search-btn" name="food" style={{backgroundColor: cat === "food" ? "#dcdcdc" : "white"}} onClick={handleClick}>FOOD</button>
          <button className="search-btn" name="nature" style={{backgroundColor: cat === "nature" ? "#dcdcdc" : "white"}} onClick={handleClick}>NATURE</button>
        </div>
        <div className="search-sort">
          <p className="search-sortLabel">Sort By: </p>
          <select className="search-select" onChange={(e) => handleSort(e)}>
            <option value="Most Popular" className="search-option">Most Popular</option>
            <option value="Newest" className="search-option">Newest</option>
          </select>
        </div>
        <div className="search-cards">
          {cards && cards.map((item) => {
            return <div className="search-container" key={item.id}><Card key={item.id} id={item.id} title={item.title} plays={item.plays} date={item.date} show={false}/></div>
          })}
        </div>
      </div>
    </div>

 );
}
 
export default Search;