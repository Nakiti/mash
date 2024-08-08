import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("user")) || null)
  const navigate = useNavigate()

  const login = async (inputs) => {
    const response = await axios.post("/auth/login", inputs)
    setCurrentUser(response.data)
    navigate(`/profile/${response.data.id}`)

  }

  const logout = async (inputs) => {
    await axios.post("/auth/logout", inputs)
    setCurrentUser(null)
  }

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={{currentUser, login, logout}}>{children}</AuthContext.Provider>
  )
}