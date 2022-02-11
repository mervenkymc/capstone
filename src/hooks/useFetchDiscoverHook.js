import { useDispatch, useSelector } from "react-redux"
import React from "react"
import { theMovieApiKey, axiosInstance } from "../lib/axios/axiosInstance"
import { allActions } from "../lib/redux/actions"
export const useFetchDiscoverHook = (pagStartNum, pagEndNum) => {
  const paginatedDiscovers = useSelector(
    (state) => state.movieReducer.paginatedDiscoverMovies
  )
  const dispatch = useDispatch()
  const discovers = useSelector((state) => state.movieReducer.discoverMovies)

  const fetchDiscovers = React.useCallback(async () => {
    try {
      const res = await axiosInstance.get(
        `discover/movie?api_key=${theMovieApiKey}&sort_by=popularity.desc&page=1`
      )
      dispatch(allActions.moviesAction.setDiscoverMovies(res.data))
    } catch (e) {
      alert(e)
    }
  }, [dispatch])

  React.useEffect(() => {
    fetchDiscovers()
  }, [fetchDiscovers])

  React.useEffect(() => {
    if (discovers && discovers.results) {
      dispatch(
        allActions.moviesAction.setDiscoverMoviesPaginated(
          pagStartNum,
          pagEndNum
        )
      )
    }
  }, [discovers, dispatch, pagEndNum, pagStartNum])

  return paginatedDiscovers
}
