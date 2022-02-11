import { useSelector } from "react-redux"
import React from "react"
import { Button, Container, InputGroup } from "react-bootstrap"
import { useSortAndFilterBy } from "../hooks/useSortAndFilterBy"
import { CardContainer, CardBody, CardHeaders } from "../components/Card"
import profile from "../logincredentials.json"
import CardHeader from "react-bootstrap/esm/CardHeader"
export const Profile = () => {
  const [isShowWathedHistory, setShowWatchedHistory] = React.useState(false)
  const [isShowFavoritesMovies, setIsShowFavoritesMovies] = React.useState(true)
  const favoritesMovies = useSelector(
    (state) => state.userReducer.favoritesMovies
  )
  const watchedHistory = useSelector((state) => state.userReducer.watchedMovies)
  return (
    <Container>
      <div
        style={{
          display: "flex",
          padding: "20px",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10px"
          }}
        >
          <img
            alt="_avatar"
            style={{ borderRadius: "10px" }}
            width="200px"
            height="200px"
            src={profile.avatarUrl}
          />
          <a href={profile.socials.twitter}>Twitter</a>
          <a href={profile.socials.instagram}>Instagram</a>
          <p>{profile.joinDate}</p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            width: "100%"
          }}
        >
          <InputGroup style={{ width: "100%" }}>
            <select
              className="form-control"
              onChange={(e) => {
                if (e.currentTarget.value === "favorites") {
                  setIsShowFavoritesMovies(true)
                  setShowWatchedHistory(false)
                }
                if (e.currentTarget.value === "history") {
                  setIsShowFavoritesMovies(false)
                  setShowWatchedHistory(true)
                }
              }}
              id="movies"
              name="movies"
            >
              <option value="favorites">Show favorites</option>
              <option value="history">Show Seenlist</option>
            </select>
          </InputGroup>
        </div>
      </div>
      <br />
      <ShowFavoriteMovieOrWatchedHistory
        isShowFavoritesMovies={isShowFavoritesMovies}
        isShowWathedHistory={isShowWathedHistory}
        favoritesMovies={favoritesMovies}
        watchedHistory={watchedHistory}
      />
    </Container>
  )
}

const ShowFavoriteMovieOrWatchedHistory = ({
  isShowFavoritesMovies,
  isShowWathedHistory,
  favoritesMovies,
  watchedHistory
}) => {
  console.log(isShowFavoritesMovies, favoritesMovies.length)
  if (isShowFavoritesMovies)
    return (
      <div
        style={{
          display: "flex",
          overflowX: "scroll",
          overFlowY: "hidden",
          color: "white"
        }}
      >
        {favoritesMovies.length > 0 ? (
          favoritesMovies.map(({ title, poster_path }) => (
            <CardContainer>
              <CardHeader>{title}</CardHeader>
              <CardBody>
                <img
                  alt="_poster_image"
                  src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                />
              </CardBody>
            </CardContainer>
          ))
        ) : (
          <div style={{ color: "black" }}>There is no favorite movies</div>
        )}
      </div>
    )
  if (isShowWathedHistory) {
    return (
      <div
        style={{
          display: "flex",
          overflowX: "scroll",
          overFlowY: "hidden",
          color: "white"
        }}
      >
        {watchedHistory.length > 0 ? (
          watchedHistory.map(({ title, poster_path }) => (
            <CardContainer>
              <CardHeader>{title}</CardHeader>
              <CardBody>
                <img
                  alt="_poster_image"
                  src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                />
              </CardBody>
            </CardContainer>
          ))
        ) : (
          <div style={{ color: "black" }}>There is no seenlist </div>
        )}
      </div>
    )
  }
}
