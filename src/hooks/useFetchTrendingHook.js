import { useDispatch, useSelector } from "react-redux"
import React from "react"
import { theMovieApiKey, axiosInstance } from "../lib/axios/axiosInstance"
import { allActions } from "../lib/redux/actions"
export const useFetchTrendingHook = (pagStartNum, pagEndNum, isTodayTrends) => {
  const dispatch = useDispatch()
  const paginatedTrends = useSelector(
    (state) => state.movieReducer.paginatedTrendingMovies
  )

  const trends = useSelector((state) => state.movieReducer.trendingMovies)

  const fetchTrending = React.useCallback(async () => {
    try {
      const res = await axiosInstance.get(
        `trending/movie/${
          isTodayTrends ? "day" : "week"
        }?api_key=${theMovieApiKey}&page=1`
      )
      dispatch(allActions.moviesAction.setTrendingMovies(res.data))
    } catch (e) {
      alert(e)
    }
  }, [dispatch, isTodayTrends])

  React.useEffect(() => {
    fetchTrending()
  }, [fetchTrending])

  React.useEffect(() => {
    if (trends && trends.results) {
      dispatch(
        allActions.moviesAction.setTrendingMoviesPaginated(
          pagStartNum,
          pagEndNum
        )
      )
    }
  }, [dispatch, pagEndNum, pagStartNum, trends])
  return paginatedTrends
}
