import { useDispatch } from "react-redux"
import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { allActions } from "../lib/redux/actions"
import { axiosInstance, theMovieApiKey } from "../lib/axios/axiosInstance"
import { Container } from "react-bootstrap"
import { CardBody, CardContainer } from "../components/Card"
import CardHeader from "react-bootstrap/esm/CardHeader"

export const Detail = () => {
  const [isMovieLoading, setIsMovieLoading] = React.useState(true)
  /*  Filmin detayı olarak afişini, ismini, çıktığı tarihi, tür veya türlerini, filmin toplam süresini, filmin tanıtımını, filmde yer almış crew bilgilerini listelemenizi bekliyoruz.
Filmin detayları dışında filmde yer almış oyuncuları (cast) card yapısında oyuncunun fotoğrafı, ismi ve filmde yer aldığı isimle yatayda scrollable olacak şekilde sergilemenizi bekliyoruz.
BONUS: Film için yapılmış yorumlar (review) ve bu film için yapılmış önerileri (recommendations) listemenizi bekliyoruz.
Reviewlar listelenirken kullanıcı avatarı, yorumu, yorumun başlığı ve yapılan yorum yeterlidir.
Detay sayfasında (eğer varsa) 1 tane review'ın gösterilmesi yeterlidir.
Detayında olduğumuz film için API'den çektiğimiz önerileri Home Page veya Search Section'da listelediğimiz gibi card yapısında ve yatayda scrollable olacak şekilde listelemek istiyoruz.*/

  //release_date //poster_path//overview //genres // runtime // cast.map(profile_path/original name , character)
  // review data reviewandcomment.review.map({author_details:{avatar_path,name},content})
  // recommendation data reviewAndRecommends.recommends.map({title,poster_path,release_date})

  const { movieId } = useParams()
  const dispatch = useDispatch()

  const movie = useSelector((state) => state.movieReducer.movie)
  const getOrFetchMovieDetail = React.useCallback(async () => {
    try {
      const movie = await axiosInstance.get(
        `movie/${movieId}?api_key=${theMovieApiKey}`
      )
      const credits = await axiosInstance.get(
        `movie/${movieId}/credits?api_key=${theMovieApiKey}`
      )
      const recommentations = await axiosInstance.get(
        `movie/${movieId}/recommendations?api_key=${theMovieApiKey}`
      )
      const review = await axiosInstance.get(
        `movie/${movieId}/reviews?api_key=${theMovieApiKey}`
      )
      const newObj = {
        ...movie.data,
        ...credits.data,
        reviewAndRecommends: {
          recommends: recommentations.data.results,
          review: review.data.results
        }
      }
      setIsMovieLoading(false)
      return dispatch(allActions.moviesAction.setMovie(newObj))
    } catch (e) {
      alert(e)
      setIsMovieLoading(false)
    }
  }, [dispatch, movieId])

  React.useEffect(() => {
    getOrFetchMovieDetail()
  }, [getOrFetchMovieDetail])

  console.log("movie", movie)

  if (isMovieLoading) return <div>Movie Details loading...</div>
  if (!movie) return <div>Movie Details not found</div>
  return (
    <Container>
      <div
        style={{
          display: "flex",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          borderRadius: "0 0 10px 10px"
          // backgroundColor: "red"
        }}
      >
        <img
          style={{
            borderRadius: "0 0 10px 10px"
          }}
          alt="poster"
          width={"350px"}
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        />
        <div style={{ padding: "20px" }}>
          <div> Release Date : {movie.release_date}</div>
          <div> {movie.overview}</div>
          <br />
          <div>Movie length : {movie.runtime} minutes</div>
          <br />
          <div>
            Genres:
            {movie.genres.map(({ name }) => (
              <p>{name}</p>
            ))}
          </div>
        </div>
      </div>
      <div>
        <br />
        <hr />
        <div
          style={{
            display: "flex",
            overflowY: "hidden",
            overflowX: "scroll",
            color: "white"
          }}
        >
          {movie.cast.map(({ id, profile_path, original_name, character }) => (
            <CardContainer key={id}>
              <CardHeader>
                <p>{original_name}</p>
                <p>{character}</p>
              </CardHeader>
              <CardBody>
                <img
                  height={"300px"}
                  width={"300px"}
                  alt="cast_picture_not_found"
                  src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                />
              </CardBody>
            </CardContainer>
          ))}
        </div>

        <br />
        <hr />
        <div
          style={{
            display: "flex",
            color: "white",
            overflowX: "scroll",
            overflowY: "hidden"
          }}
        >
          {movie.reviewAndRecommends.recommends.map(
            ({ id, title, poster_path, release_date }) => (
              <CardContainer key={id} id={id}>
                {console.log("posterpath", poster_path)}
                <CardHeader>{title}</CardHeader>
                <CardBody>
                  <img
                    height={"300px"}
                    width={"300px"}
                    alt="_cast_picture"
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                  />
                </CardBody>
                <p>Release date: {release_date}</p>
              </CardContainer>
            )
          )}
        </div>
        <br />
        <hr />
        <div>
          {movie.reviewAndRecommends.review
            .slice(0, 1)
            .map(({ id, author_details, content }) => (
              <div key={id} id={id}>
                {console.log("authoredetails", author_details)}
                <img
                  borderRadius="20px"
                  alt="_picture_of_reviewer"
                  src={`https://image.tmdb.org/t/p/w50/${author_details.avatar_path}`}
                />
                <br />
                <p>
                  User name : {author_details.name || author_details.username}
                </p>
                <p>Review Content:</p>
                <p>{content}</p>
              </div>
            ))}
        </div>
      </div>
    </Container>
  )
}
