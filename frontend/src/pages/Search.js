import Header from "../components/Header";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import "../styles/search.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [cards, setCards] = useState(null)

  const navigate = useNavigate()


  useEffect(() => {
    const getData = async() => {
      try {
        const response = await axios.get("/mashes/getmashbycat/all")
        setCards(response.data.sort((a, b) => b.plays - a.plays))
      } catch (e) {
        console.log(e.response.data)
      }
    }
    getData()
  }, [])

  const handleClick = async (e) => {
    try {
      const response = await axios.get(`/mashes/getmashbycat/${e.target.name}`)
      setCards(response.data)

    } catch (err) {
      console.log(err)
    }
  }

  const handleSearch = async (e) => {

  }

  return ( 
    <div className="search-content">
      <Header />
      <div className="search-body">
        <div className="search-bar">
          <p className="search-label"><b>Find Mashes</b></p>
          {/* <input type="text" className="search-input" />
          <button className="search-searchBtn">Go</button> */}
        </div>
        <div className="search-cats">
          <button className="search-btn" name="all" onClick={handleClick}>All</button>
          <button className="search-btn" name="sports" onClick={handleClick}>Sports</button>
          <button className="search-btn" name="people" onClick={handleClick}>People</button>
          <button className="search-btn" name="film" onClick={handleClick}>Film</button>
          <button className="search-btn" name="music" onClick={handleClick}>Music</button>
          <button className="search-btn" name="places" onClick={handleClick}>Places</button>
          <button className="search-btn" name="food" onClick={handleClick}>Food</button>
          <button className="search-btn" name="nature" onClick={handleClick}>Nature</button>
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