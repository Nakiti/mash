import Header from "../components/Header";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import "../styles/search.css"
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../components/Searchbar";
import debounce from 'lodash/debounce';


const Search = () => {
  const [cards, setCards] = useState(null)
  const [og, setOg] = useState(null)
  const [filter, setFilter] = useState("Most Popular")
  const [cat, setCat] = useState("all")
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const navigate = useNavigate()
  const location = useLocation()

  const handleSort = async(e) => {
    const temp = [...cards]
    temp.filter(item => item.category === cat)
    setFilter(e.target.value)

    if (e.target.value === "Most Popular") {
      setCards(temp.sort((a, b) => b.plays - a.plays))

    } else if (e.target.value === "Newest") {
      setCards(temp.reverse())
    }
    
  }

  useEffect(() => {
    console.log(location.state)

    const getData = async() => {
      try {
        setLoading(true)
        const response = await axios.get(location.state ? `/mashes/getmashbycat/${location.state.category}` : "/mashes/getmashbycat/all")


        setLoading(false)

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
      setLoading(true)
      const response = await axios.get(`/mashes/getmashbycat/${e.target.name}`)
      setLoading(false)

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

    const handleSearch = async (e) => {
        e.preventDefault()
        setLoading(true)
        console.log()

        try {
            const response = await axios.get(`/mashes/search?q=${searchQuery}`)
            setCards(response.data)
            setLoading(false)
        } catch (e) {
            console.log(e)
        }

    }

    const handleChange = async (e) => {
        console.log(e.target.value)
        setSearchQuery(e.target.value)
        debouncedSearch(e.target.value)
    }

    const debouncedSearch = debounce(async (query) => {
        try {
          const response = await axios.get(`/mashes/search?q=${query}`);
          console.log(response)
          setCards(response.data);
        } catch (err) {
          setLoading(false);
          console.error(err);
        }
      }, 300);


  return (
    <div className="overflow-x-hidden">
      <Header />
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
        </div>
      )}
  
      <div className="flex flex-col px-4 items-center">
        <p className="text-center text-2xl mt-10 font-bold"><b>FIND MASHES</b></p>
  
        <SearchBar query={searchQuery} handleChange={handleChange} handleSearch={handleSearch}/>

        <div className="flex flex-wrap justify-center items-center space-x-4 space-y-2 p-4">
          <button 
            className="px-4 py-2 rounded" 
            name="all" 
            style={{ backgroundColor: cat === "all" ? "#dcdcdc" : "white" }} 
            onClick={handleClick}
          >
            ALL
          </button>
          <button 
            className="px-4 py-2 rounded" 
            name="sports" 
            style={{ backgroundColor: cat === "sports" ? "#dcdcdc" : "white" }} 
            onClick={handleClick}
          >
            SPORTS
          </button>
          <button 
            className="px-4 py-2 rounded" 
            name="people" 
            style={{ backgroundColor: cat === "people" ? "#dcdcdc" : "white" }} 
            onClick={handleClick}
          >
            PEOPLE
          </button>
          <button 
            className="px-4 py-2 rounded" 
            name="film" 
            style={{ backgroundColor: cat === "film" ? "#dcdcdc" : "white" }} 
            onClick={handleClick}
          >
            FILM
          </button>
          <button 
            className="px-4 py-2 rounded" 
            name="music" 
            style={{ backgroundColor: cat === "music" ? "#dcdcdc" : "white" }} 
            onClick={handleClick}
          >
            MUSIC
          </button>
          <button 
            className="px-4 py-2 rounded" 
            name="places" 
            style={{ backgroundColor: cat === "places" ? "#dcdcdc" : "white" }} 
            onClick={handleClick}
          >
            PLACES
          </button>
          <button 
            className="px-4 py-2 rounded" 
            name="food" 
            style={{ backgroundColor: cat === "food" ? "#dcdcdc" : "white" }} 
            onClick={handleClick}
          >
            FOOD
          </button>
          <button 
            className="px-4 py-2 rounded" 
            name="nature" 
            style={{ backgroundColor: cat === "nature" ? "#dcdcdc" : "white" }} 
            onClick={handleClick}
          >
            NATURE
          </button>
        </div>
  
        <div className="flex items-center justify-center space-x-4 p-4">
          <p className="font-medium">Sort By:</p>
          <select className="border border-gray-300 rounded-md p-2" onChange={(e) => handleSort(e)}>
            <option value="Most Popular">Most Popular</option>
            <option value="Newest">Newest</option>
          </select>
        </div>
  
        <div className="p-2">
          <div className="w-full p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-x-6 lg:gap-y-2">
              {cards && cards.map((item) => (
                <div key={item.id} className="flex justify-center lg:w-[330px] lg:h-[180px]">
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
 
export default Search;