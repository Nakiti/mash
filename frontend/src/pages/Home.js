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


      setMusic(musicTemp.slice(0, 8))
      setFilm(filmTemp.slice(0, 8))
      setSports(sportsTemp.slice(0, 8))

      console.log(musicResponse)
    }

    fetchData()
  }, [])
  
  return ( 
<div className="">
  <Header />
  <div className="flex flex-col justify-center w-full">
    <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto justify-between items-center p-4">
      <div className="flex flex-col w-full md:w-1/2 p-4">
        <p className="text-2xl font-bold mb-4">A Fast And Fun Way To Rank Anything!</p>
        <p className="text-lg">
          Create and share your Mash to discover fascinating rankings. With each click, contribute to a collective ranking that reflects everyone's opinion. Join Mash today and voice your opinions!
        </p>
      </div>
      <div className="flex cursor-pointer flex-col w-full md:w-1/2 items-center space-y-6 p-4">
        <div className="flex flex-col items-center justify-center p-6 border rounded-md shadow-lg bg-white w-full sm:w-72 md:w-80 lg:w-[400px] h-[150px]" id="login" onClick={handleClick}>
          <p className="text-lg font-semibold mb-2" id="login" onClick={handleClick}>CREATE</p>
          {/* <button className="p-3 bg-blue-500 text-white rounded-full" id="login" onClick={handleClick}>
            <i className="fa fa-plus text-xl" onClick={handleClick}></i>
          </button> */}
        </div>
        <div className="flex cursor-pointer flex-col items-center justify-center p-6 border rounded-md shadow-lg bg-white w-full sm:w-72 md:w-80 lg:w-[400px] h-[150px]" id="search" onClick={handleClick}>
          <p className="text-lg font-semibold mb-2" id="search" onClick={handleClick}>EXPLORE</p>
          {/* <button className="p-3 bg-blue-500 text-white rounded-full" id="search" onClick={handleClick}>
            <i className="fa fa-search text-xl" onClick={handleClick}></i>
          </button> */}
        </div>
      </div>
    </div>

    <h1 className="text-2xl font-bold ml-4 md:ml-14 mb-6">Popular Mashes:</h1>
    <div className="flex flex-col w-[90vw] max-w-7xl mx-auto">
      <div className="mb-6">
        <p className="text-lg font-semibold cursor-pointer mb-2" id="sports" onClick={handleLink}>Sports</p>
        <div className="flex overflow-x-auto space-x-20 p-2 bg-gray-100 rounded-lg">
          {sports && sports.map(item => (
            <div className="min-w-[256px]" key={item.id}>
              <Card
                id={item.id}
                title={item.title}
                plays={item.plays}
                date={item.date}
                imageOne={item.imageOne}
                imageTwo={item.imageTwo}
                show={false}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <p className="text-lg font-semibold cursor-pointer mb-2" id="music" onClick={handleLink}>Music</p>
        <div className="flex overflow-x-auto space-x-20 p-2 bg-gray-100 rounded-lg">
          {music && music.map(item => (
            <div className="min-w-[256px]" key={item.id}>
              <Card
                id={item.id}
                title={item.title}
                plays={item.plays}
                date={item.date}
                imageOne={item.imageOne}
                imageTwo={item.imageTwo}
                show={false}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <p className="text-lg font-semibold cursor-pointer mb-2" id="film-tv" onClick={handleLink}>Film & TV</p>
        <div className="flex overflow-x-auto space-x-20 p-2 bg-gray-100 rounded-lg">
          {film && film.map(item => (
            <div className="min-w-[256px]" key={item.id}>
              <Card
                id={item.id}
                title={item.title}
                plays={item.plays}
                date={item.date}
                imageOne={item.imageOne}
                imageTwo={item.imageTwo}
                show={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
 
export default Home;