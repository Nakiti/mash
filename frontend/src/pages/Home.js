import { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import "../styles/home.css"
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from "../context/authContext"
import axios from "axios";
import Card from "../components/Card";


const Home = () => {
  const navigate = useNavigate()
  const [mashes, setMashes] = useState(null)
  const {currentUser} = useContext(AuthContext)
  const [music, setMusic] = useState(null)
  const [sports, setSports] = useState(null)
  const [film, setFilm] = useState(null)



  const handleClick = (e) => {
    if (e.target.id === "login" && currentUser) {
      navigate(`/profile/${currentUser.id}`)
    } else {
      navigate(`/${e.target.id}`)
    }
    // console.log(e.target.id)
    // console.log(music, sports, film)

  }

  const handleLink = (e) => {
    navigate(`/search`, {
      state: {
        category: e.target.id
      }
    })
  }

  useEffect(() => {
    const fetchData = async() => {
      const musicResponse = await axios.get("/mashes/getmashbycat/music")
      const sportsResponse = await axios.get("/mashes/getmashbycat/sports")
      const filmResponse = await axios.get("/mashes/getmashbycat/film")
      
      const musicTemp = musicResponse.data.sort((a, b) => b.plays - a.plays)
      const sportsTemp = sportsResponse.data.sort((a, b) => b.plays - a.plays)
      const filmTemp = filmResponse.data.sort((a, b) => b.plays - a.plays)


      setMusic(musicTemp.slice(0, 5))
      setFilm(filmTemp.slice(0, 5))
      setSports(sportsTemp.slice(0, 5))
    }

    fetchData()
  }, [])
  
  return ( 
    <div className="home-content">
      <Header />
      <div className="home-textContainer">
        <p className="home-title">A Fast And Fun Way To Rank Anything!</p>
        <p className="home-info">Mash.com streamlines ranking long lists by making it quick and fun. Compare and choose your preferred option from a pair, improving your ranking accuracy as you go. Contribute to collective rankings based on diverse opinions. Join Mash.com for easy and enjoyable ranking!</p>

      </div>
      {/* <div className="home-body"> */}
        <div className="home-card home-create" id="login" onClick={handleClick}>
          <p className="home-text" id="login" onClick={handleClick}>CREATE</p>
          <button className="home-button" id="login" onClick={handleClick}><i class="fa fa-plus" id="login" onClick={handleClick}></i></button>
        </div>
        <div className="home-card home-play" id="search" onClick={handleClick}>
          <p className="home-text" id="search" onClick={handleClick}>EXPLORE</p>
          <button className="home-button" id="search" onClick={handleClick}><i class="fa fa-search" id="search" onClick={handleClick}></i></button>
        </div>
      {/* </div> */}
      <p className="home-heading">Popular Mashes:</p>
      <div className="home-mashes">
        <div className="home-row">
          <p className="home-subheading" id="sports" onClick={handleLink}>Sports</p>
          <div className="home-rowContent">
            {sports && sports.map(item => {
              return <div className="home-mash"><Card key={item.id} id={item.id} title={item.title} plays={item.plays} date={item.date} show={false}/></div>
            })}
          </div>
        </div>
        <div className="home-row">
          <p className="home-subheading" id="music" onClick={handleLink}>Music</p>
          <div className="home-rowContent">
            {music && music.map(item => {
              return <div className="home-mash"><Card key={item.id} id={item.id} title={item.title} plays={item.plays} date={item.date} show={false}/></div>
            })}
          </div>
        </div>
        <div className="home-row">
          <p className="home-subheading" id="film" onClick={handleLink}>Film & TV</p>
          <div className="home-rowContent">
            {film && film.map(item => {
              return <div className="home-mash"><Card key={item.id} id={item.id} title={item.title} plays={item.plays} date={item.date} show={false}/></div>
            })}
          </div>
        </div>
      </div>
      {/* <button className="home-contact" onClick={() => navigate("/contact")}>Contact</button> */}
    </div>
  );
}
 
export default Home;