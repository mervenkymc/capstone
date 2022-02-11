import React from "react"
import { Routes, Route } from "react-router-dom"
import { Detail } from "../pages/Detail"
import {
  MoviePopular,
  MovieTopRated,
  Home,
  NotFound404,
  Login,
  Profile
} from "../pages/index"
import PrivateRouter from "./PrivateRouter"

const Routers = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRouter>
            <Home />
          </PrivateRouter>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={
          <PrivateRouter>
            <Profile />
          </PrivateRouter>
        }
      />
      <Route
        path="/movie-popular"
        element={
          <PrivateRouter>
            <MoviePopular />
          </PrivateRouter>
        }
      />
      <Route
        path="/movie-top-rated"
        element={
          <PrivateRouter>
            <MovieTopRated />
          </PrivateRouter>
        }
      />
      <Route path="/detail">
        <Route
          path=":movieId"
          element={
            <PrivateRouter>
              <Detail />
            </PrivateRouter>
          }
        />
      </Route>
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  )
}

export default Routers
