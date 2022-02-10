import React from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRouter = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn)
  return isLoggedIn ? children : <Navigate to="/login" />
}

export default PrivateRouter
