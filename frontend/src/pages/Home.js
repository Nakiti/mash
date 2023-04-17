import { useState, useContext } from "react";
import Header from "../components/Header";
import "../styles/home.css"
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from "../context/authContext"


const Home = () => {
  const navigate = useNavigate()
  const {currentUser} = useContext(AuthContext)

  const handleClick = (e) => {
    if (e.target.id === "login" && currentUser) {
      navigate(`/profile/${currentUser.id}`)
    } else {
      navigate(`/${e.target.id}`)
    }
    console.log(e.target.id)
  }
  
  return ( 
    <div className="home-content">
      <Header />
      <div className="home-body">
        <div className="home-card" id="login" onClick={handleClick}>
          <p className="home-text" id="login" onClick={handleClick}>CREATE</p>
          <button className="home-button" id="login" onClick={handleClick}><i class="fa fa-plus" id="login" onClick={handleClick}></i></button>
        </div>
        <div className="home-card" id="search" onClick={handleClick}>
          <p className="home-text" id="search" onClick={handleClick}>PLAY</p>
          <button className="home-button" id="search" onClick={handleClick}><i class="fa fa-search" id="search" onClick={handleClick}></i></button>
        </div>
      </div>
    </div>
  );
}
 
export default Home;