import Header from "../components/Header";
import { useEffect, useState, useRef, useCallback } from "react";
import Card from "../components/Card";
import "../styles/search.css"
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../components/Searchbar";
import debounce from 'lodash/debounce';
import io from "socket.io-client"


const Search = () => {
   const [cards, setCards] = useState([])
   const [displayedCards, setDisplayedCards] = useState([])
   const [og, setOg] = useState(null)
   const [filter, setFilter] = useState("Most Popular")
   const [cat, setCat] = useState("all")
   const [loading, setLoading] = useState(false)
   const [searchQuery, setSearchQuery] = useState("")
   const [page, setPage] = useState(1);
   const perPage = 32;

   const navigate = useNavigate()
   const location = useLocation()
   const loader = useRef(null)

   const handleSort = async(e) => {
      let temp = [...cards]
      temp.filter(item => item.category === cat)
      setFilter(e.target.value)

      if (e.target.value === "Most Popular") {
         temp = temp.sort((a, b) => b.plays - a.plays)

      } else if (e.target.value === "Newest") {
         temp = temp.reverse()
      }
      
      setCards(temp)
      setDisplayedCards(temp.slice(0, page * perPage))
   }

   const loadMoreCards = () => {
      const newPage = page + 1;
      const moreCards = cards.slice(0, newPage * perPage);
      setDisplayedCards(moreCards);
      setPage(newPage);
   };

   const handleObserver = useCallback(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && displayedCards.length < cards.length) {
          loadMoreCards();
        }
      },
      [loading, displayedCards.length, cards.length, loadMoreCards]
   );

   useEffect(() => {
      const observer = new IntersectionObserver(handleObserver, {
         root: null,
         rootMargin: '20px',
         threshold: 1.0
      });
      if (loader.current) observer.observe(loader.current);

      return () => {
         if (loader.current) observer.unobserve(loader.current);
      };
   }, [handleObserver]);

   useEffect(() => {
      const ws = io()

      ws.on("connect", () => {
         console.log("Connected to WebSocket server");
      });


      ws.on("updatePlays", (input) => {
         const data = JSON.parse(input)
         if (data.type == "MASH_DATA") {
            // console.log("mydata", data)

            setCards((prevCards) =>
               prevCards.map((card) =>
                  card.id === data.mash.id ? { ...card, plays: data.mash.plays } : card
               )
            );
            setDisplayedCards((prevDisplayedCards) =>
               prevDisplayedCards.map((card) =>
                  card.id === data.mash.id ? { ...card, plays: data.mash.plays } : card
               )
            );
         }
      })

      const getData = async() => {
         try {
            setLoading(true)
            const response = await axios.get(location.state ? `/mashes/getmashbycat/${location.state.category}` :"/mashes/getmashbycat/all")

            setLoading(false)
            setOg(response.data.reverse())

            const temp = [...response.data]
            setCards(temp.sort((a, b) => b.plays - a.plays))
            setDisplayedCards(temp.slice(0, perPage))
         } catch (e) {
            console.log(e)
         }
      }

      getData()

      return () => {
         ws.close();
      };
   }, [])

   const handleClick = async (e) => {
      setCat(e.target.name)

      try {
         setLoading(true)
         const response = await axios.get(`/mashes/getmashbycat/${e.target.name}`)
         setLoading(false)

         let temp = [...response.data]

         if (filter === "Most Popular") {
            temp = temp.sort((a, b) => b.plays - a.plays)
         } else if (filter === "Newest") {
            temp = response.data.reverse()
         }

         setCards(temp)
         setDisplayedCards(temp)
      } catch (err) {
         console.log(err)
      }
   }

   const handleSearch = async (e) => {
      e.preventDefault()
      setLoading(true)

      try {
         const response = await axios.get(`/mashes/search?q=${searchQuery}`)
         setCards(response.data)
         setDisplayedCards(response.data.slice(0, perPage))
      } catch (e) {
         console.log(e)
      } finally {
         setLoading(false)
      }
   }

   const handleChange = async (e) => {
      setSearchQuery(e.target.value)
      debouncedSearch(e.target.value)
   }

   const debouncedSearch = debounce(async (query) => {
      try {
         const response = await axios.get(`/mashes/search?q=${query}`);
         setCards(response.data);
         setDisplayedCards(response.data)
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
               {cards && displayedCards.map((item) => (
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
         <div ref={loader}></div>
         </div>
      </div>
   );
}  
 
export default Search;