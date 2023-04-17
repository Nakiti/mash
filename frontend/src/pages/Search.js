import Header from "../components/Header";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import "../styles/search.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [cards, setCards] = useState([{id: 1, title: "sdfs", plays: 4, date: "sdfsdf", }])

  const navigate = useNavigate()


  // useEffect(() => {
  //   const getData = async() => {
  //     try {
  //       const response = await axios.get("/mashes/getmashbycat/all")
  //       setCards(response.data.sort((a, b) => b.plays - a.plays))
  //     } catch (e) {
  //       console.log(e.response.data)
  //     }
  //   }
  //   getData()
  // }, [])

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
          <p className="search-label"><b>FIND MASHES</b></p>
          {/* <input type="text" className="search-input" />
          <button className="search-searchBtn">Go</button> */}
        </div>
        <div className="search-cats">
          <button className="search-btn" name="all" onClick={handleClick}>ALL</button>
          <button className="search-btn" name="sports" onClick={handleClick}>SPORTS</button>
          <button className="search-btn" name="people" onClick={handleClick}>PEOPLE</button>
          <button className="search-btn" name="film" onClick={handleClick}>FILM</button>
          <button className="search-btn" name="music" onClick={handleClick}>MUSIC</button>
          <button className="search-btn" name="places" onClick={handleClick}>PLACES</button>
          <button className="search-btn" name="food" onClick={handleClick}>FOOD</button>
          <button className="search-btn" name="nature" onClick={handleClick}>NATURE</button>
        </div>
        <div className="search-sort">
          <p className="search-sortLabel">Sort By: </p>
          <select className="search-select">
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