import React from "react"
import { Container, ProgressBar } from "react-bootstrap"
import { theMovieApiKey, axiosInstance } from "../lib/axios/axiosInstance"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { allActions } from "../lib/redux/actions"
export const Home = () => {
  const [loadingDiscovers, setDiscoversLoading] = React.useState(true)
  const [todayTrends, setTodayTrends] = React.useState(false)
  const discovers = useSelector((state) => state.movieReducer.discoverMovies)
  const trends = useSelector((state) => state.movieReducer.trendingMovies)
  const [pagination, setPagination] = React.useState(1)
  const dispatch = useDispatch()

  const fetchDiscovers = async () => {
    try {
      const res = await axiosInstance.get(
        `discover/movie?api_key=${theMovieApiKey}&sort_by=popularity.desc&page=${pagination}`
      )
      dispatch(allActions.moviesAction.setDiscoverMovies(res.data))
      setDiscoversLoading(false)
    } catch (e) {
      alert(e)
      setDiscoversLoading(false)
    }
  }
  const fetchTrending = async () => {
    try {
      const res = await axiosInstance.get(
        `trending/all/${
          todayTrends ? "day" : "week"
        }?api_key=${theMovieApiKey}&page=${pagination}`
      )
      dispatch(allActions.moviesAction.setTrendingMovies(res.data))
      setDiscoversLoading(false)
    } catch (e) {
      alert(e)
      setDiscoversLoading(false)
    }
  }

  React.useEffect(() => {
    fetchDiscovers()
    fetchTrending()
  }, [])

  if (loadingDiscovers) return <ProgressBar animated now={100} />

  console.log(discovers, trends)
  return (
    <Container>
      <div className="container-fluid bg-light text-dark p-5">
        {/* {discovers.results.map({adult,})=> {}} */}
        <Link className="btn btn-primary" to="/products">
          Click me!
        </Link>
      </div>
    </Container>
  )
}
