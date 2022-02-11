import React from "react"
import { Button, Container, InputGroup, ProgressBar } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useFetchTrendingHook } from "../hooks/useFetchTrendingHook"
import { useFetchDiscoverHook } from "../hooks/useFetchDiscoverHook"
import { useSearchingHook } from "../hooks/useSearchHook"
import { useDispatch } from "react-redux"
import { allActions } from "../lib/redux/actions"
import { useNavigate } from "react-router-dom"
import {
  Card,
  CardBody,
  CardContainer,
  CardFooter,
  CardHeader
} from "../components/Card"
export const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const favoritedMovies = useSelector(
    (state) => state.userReducer.favoritesMovies
  )
  const watchedHistoryMovies = useSelector(
    (state) => state.userReducer.watchedMovies
  )
  const [localPaginationNumber, setLocalPaginationNumber] = React.useState({
    pagStartNum: 0,
    pagEndNum: 5
  })
  const [isTodayTrends, setIsTodayTrends] = React.useState(true)

  const paginatedDiscovers = useFetchDiscoverHook(
    localPaginationNumber.pagStartNum,
    localPaginationNumber.pagEndNum
  )
  const paginatedTrends = useFetchTrendingHook(
    localPaginationNumber.pagStartNum,
    localPaginationNumber.pagEndNum,
    isTodayTrends
  )
  const [searchForDiscover, searchedDiscoverObjOfArray, isDiscoverSearching] =
    useSearchingHook(paginatedDiscovers)
  const [searchForTrends, searcedTrendsObjOfArray, isTrendSearching] =
    useSearchingHook(paginatedTrends)

  const handleLocalPaginationChanges = (process) => {
    if (process === "back" && localPaginationNumber.pagStartNum !== 0) {
      return setLocalPaginationNumber((prevState) => {
        return {
          pagStartNum: prevState.pagStartNum - 5,
          pagEndNum: prevState.pagEndNum - 5
        }
      })
    }
    if (process === "next" && localPaginationNumber.pagEndNum < 20) {
      return setLocalPaginationNumber((prevState) => {
        return {
          pagStartNum: prevState.pagStartNum + 5,
          pagEndNum: prevState.pagEndNum + 5
        }
      })
    }
    return
  }
  const handleAddFavoritesClick = (obj) => {
    if (favoritedMovies.find(({ id }) => id === obj.id)) return
    dispatch(allActions.userActions.addFavorites(obj))
  }
  const handleAddHistoryClick = (obj) => {
    if (watchedHistoryMovies.find((movieObj) => movieObj.id === obj.id)) return
    dispatch(allActions.userActions.addWatchedBefore(obj))
  }

  if (!paginatedDiscovers || !paginatedTrends)
    return <ProgressBar animated now={100} />

  console.log("trends", paginatedTrends, paginatedDiscovers)
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "20px",
          marginBottom: "20px"
        }}
      >
        <div style={{ display: "flex" }}>
          <label htmlFor="today">Today</label>
          <input
            onChange={() => {
              setIsTodayTrends(true)
            }}
            id="today"
            type="checkbox"
            checked={isTodayTrends}
          />
          <label htmlFor="week">Week</label>
          <input
            onChange={() => {
              setIsTodayTrends(false)
            }}
            id="week"
            type="checkbox"
            checked={!isTodayTrends}
          />

          <InputGroup style={{ marginLeft: "5px" }}>
            <input
              onChange={(e) => {
                searchForDiscover(e.currentTarget.value)
                searchForTrends(e.currentTarget.value)
              }}
              placeholder="search movie..."
              className="form-control"
              id="search"
              type="search"
            />
          </InputGroup>
        </div>
        <div>
          <Button onClick={() => handleLocalPaginationChanges("back")}>
            {" "}
            Back
          </Button>
          <Button onClick={() => handleLocalPaginationChanges("next")}>
            {" "}
            Next
          </Button>
        </div>
      </div>
      {!isDiscoverSearching ? (
        <div
          style={{ display: "flex", overflowX: "scroll", overFlowY: "hidden" }}
        >
          {paginatedDiscovers.map((obj) => (
            <CardContainer style={{ cursor: "pointer" }} key={obj.id}>
              <CardHeader
                onClick={(e) => {
                  navigate(`/detail/${obj.id}`)
                }}
              >
                {obj.title}
              </CardHeader>
              <CardBody
                onClick={(e) => {
                  navigate(`/detail/${obj.id}`)
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300/${obj.poster_path}`}
                  alt="_picture"
                />
              </CardBody>
              <CardFooter>
                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddFavoritesClick(obj)
                  }}
                  disabled={favoritedMovies.find(
                    (movieObj) => movieObj.id === obj.id
                  )}
                >
                  Add favorites
                </Button>
                <Button
                  type="button"
                  disabled={watchedHistoryMovies.find(
                    (movieObj) => movieObj.id === obj.id
                  )}
                  onClick={() => handleAddHistoryClick(obj)}
                >
                  Add watched history
                </Button>
              </CardFooter>
            </CardContainer>
          ))}
        </div>
      ) : (
        <div
          style={{ display: "flex", overflowX: "scroll", overFlowY: "hidden" }}
        >
          {searchedDiscoverObjOfArray.map((obj) => (
            <CardContainer style={{ cursor: "pointer" }} key={obj.id}>
              <CardHeader
                onClick={(e) => {
                  navigate(`/detail/${obj.id}`)
                }}
              >
                {obj.title}
              </CardHeader>
              <CardBody
                onClick={(e) => {
                  navigate(`/detail/${obj.id}`)
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300/${obj.poster_path}`}
                  alt="_picture"
                />
              </CardBody>
              <CardFooter>
                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddFavoritesClick(obj)
                  }}
                  disabled={favoritedMovies.find(
                    (movieObj) => movieObj.id === obj.id
                  )}
                >
                  Add favorites
                </Button>
                <Button
                  type="button"
                  disabled={watchedHistoryMovies.find(
                    (movieObj) => movieObj.id === obj.id
                  )}
                  onClick={() => handleAddHistoryClick(obj)}
                >
                  Add watched history
                </Button>
              </CardFooter>
            </CardContainer>
          ))}
        </div>
      )}
      {!isTrendSearching ? (
        <div
          style={{ display: "flex", overflowX: "scroll", overflowY: "hidden" }}
        >
          {paginatedTrends.map((obj) => (
            <CardContainer style={{ cursor: "pointer" }} key={obj.id}>
              <CardHeader
                onClick={(e) => {
                  navigate(`/detail/${obj.id}`)
                }}
              >
                {obj.title}
              </CardHeader>
              <CardBody
                onClick={(e) => {
                  navigate(`/detail/${obj.id}`)
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300/${obj.poster_path}`}
                  alt="_picture"
                />
              </CardBody>
              <CardFooter>
                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddFavoritesClick(obj)
                  }}
                  disabled={favoritedMovies.find(
                    (movieObj) => movieObj.id === obj.id
                  )}
                >
                  Add favorites
                </Button>
                <Button
                  type="button"
                  disabled={watchedHistoryMovies.find(
                    (movieObj) => movieObj.id === obj.id
                  )}
                  onClick={() => handleAddHistoryClick(obj)}
                >
                  Add watched history
                </Button>
              </CardFooter>
            </CardContainer>
          ))}
        </div>
      ) : (
        <div
          style={{ display: "flex", overflowX: "scroll", overflowY: "hidden" }}
        >
          {searcedTrendsObjOfArray.map((obj) => (
            <CardContainer style={{ cursor: "pointer" }} key={obj.id}>
              <CardHeader
                onClick={(e) => {
                  navigate(`/detail/${obj.id}`)
                }}
              >
                {obj.title}
              </CardHeader>
              <CardBody
                onClick={(e) => {
                  navigate(`/detail/${obj.id}`)
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300/${obj.poster_path}`}
                  alt="_picture"
                />
              </CardBody>
              <CardFooter>
                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddFavoritesClick(obj)
                  }}
                  disabled={favoritedMovies.find(
                    (movieObj) => movieObj.id === obj.id
                  )}
                >
                  Add favorites
                </Button>
                <Button
                  type="button"
                  disabled={watchedHistoryMovies.find(
                    (movieObj) => movieObj.id === obj.id
                  )}
                  onClick={() => handleAddHistoryClick(obj)}
                >
                  Add watched history
                </Button>
              </CardFooter>
            </CardContainer>
          ))}
        </div>
      )}

    </Container>
  )
}
