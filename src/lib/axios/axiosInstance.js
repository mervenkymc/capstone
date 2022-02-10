import axios from "axios"
const theMovieApiBaseUrı = "https://api.themoviedb.org/3/"
const theMovieApiKey = "d3b59f21ea7eadcf5138b911cf4b372a"
const axiosInstance = axios.create({ baseURL: theMovieApiBaseUrı })

export { theMovieApiKey, axiosInstance }
