import { axiosInstance, theMovieApiKey } from "../lib/axios/axiosInstance"
import React from "react"
import { useDispatch } from "react-redux"
import { allActions } from "../lib/redux/actions"
import { useSelector } from "react-redux"
import { useSortAndFilterBy } from "../hooks/useSortAndFilterBy"
import { Container, Button } from "react-bootstrap"
import { CardBody, CardContainer, CardHeader } from "../components/Card"

export const MoviePopular = () => {
  const dispatch = useDispatch()
  const movies = useSelector((state) => state.movieReducer.popularMovies)
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
      const popularMovies = await axiosInstance(
        `movie/popular?api_key=${theMovieApiKey}&page=${page + 1}`
      )
      dispatch(
        allActions.moviesAction.addPopularMovies(popularMovies.data.results)
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
          `movie/popular?api_key=${theMovieApiKey}&page=${page}`
        )
        dispatch(
          allActions.moviesAction.setPopularMovies(topRatedMovies.data.results)
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
  console.log("movies", movies)
  return (
    <Container>
      <div style={{ margin: "10px", display: "flex" }}>
        <select
          onChange={(e) => setSortedType(e.target.value)}
          id="movies"
          name="movies"
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
