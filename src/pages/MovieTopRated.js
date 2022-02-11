import { axiosInstance, theMovieApiKey } from "../lib/axios/axiosInstance"
import React, { useState } from "react"
import { CardBody, CardContainer, CardHeader } from "../components/Card"
import { allActions } from "../lib/redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { useSortAndFilterBy } from "../hooks/useSortAndFilterBy"
import { Container, Button } from "react-bootstrap"

export const MovieTopRated = () => {
  const dispatch = useDispatch()
  const movies = useSelector((state) => state.movieReducer.topRatedMovies)
  const [
    sortedData,
    filterBy,
    sortBy,
    isSorted,
    setIsSorting,
    setSortedType,
    sortedType
  ] = useSortAndFilterBy(movies)

  const [isLoading, setIsLoading] = React.useState(true)
  const [page, setPage] = React.useState(1)
  const handleLoadMore = async () => {
    try {
      setIsSorting(false)
      const topRatedMovies = await axiosInstance(
        `movie/top_rated?api_key=${theMovieApiKey}&page=${page + 1}`
      )
      dispatch(
        allActions.moviesAction.addTopRatedMovies(topRatedMovies.data.results)
      )
    } catch (e) {
      console.log(e)
    }
    setPage(page + 1)
  }
  const fetchOrPass = React.useCallback(async () => {
    try {
      if (movies.length === 0) {
        const topRatedMovies = await axiosInstance(
          `movie/top_rated?api_key=${theMovieApiKey}&page=${page}`
        )
        dispatch(
          allActions.moviesAction.setTopRatedMovies(topRatedMovies.data.results)
        )
      }
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  }, [dispatch, movies.length, page])

  React.useEffect(() => {
    fetchOrPass()
  }, [fetchOrPass])

  if (isLoading) return <div> top rated movies loading</div>
  if (movies.length === 0) return <div>top rated movies not found </div>
  console.log("rerender", sortedData, isSorted)
  return (
    <Container>
      <div style={{ margin: "10px", display: "flex" }}>
        <select
          onChange={(e) => setSortedType(e.target.value)}
          id="cars"
          name="cars"
          value={sortedType}
        >
          <option value="ascString">Filmin başlığı A'dan Z'ye</option>
          <option value="dscString">Filmin başlığı Z'dan A'ya</option>
          <option value="ascNum">Popülerliğe göre artan</option>
          <option value="descNum">Popülerliğe göre azalan</option>
          <option value="ascDate">Çıkış tarihine göre artan</option>
          <option value="descDate">Çıkış tarihine göre azalan</option>
        </select>

        <Button onClick={() => sortBy(sortedType)}>Search</Button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {isSorted
          ? sortedData.map(
              ({ poster_path, release_date, popularity, id, title }) => (
                <CardContainer key={id}>
                  <CardHeader>{title}</CardHeader>
                  <CardBody>
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                      alt="_picture"
                    />
                  </CardBody>
                </CardContainer>
              )
            )
          : movies.map(({ id, title, poster_path }) => (
              <CardContainer key={id}>
                <CardHeader>{title}</CardHeader>
                <CardBody>
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                    alt="_picture"
                  />
                </CardBody>
              </CardContainer>
            ))}
      </div>

      <br />
      <p style={{ cursor: "pointer" }} onClick={handleLoadMore}>
        Load more
      </p>
    </Container>
  )
}
