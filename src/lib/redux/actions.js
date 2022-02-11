const userActions = {
  setUser: (userObj) => {
    return {
      type: "LOGIN",
      payload: userObj
    }
  },
  logOut: () => {
    return {
      type: "LOG_OUT"
    }
  },

  addFavorites: (movieObj) => {
    return {
      type: "ADD_FAVORITES",
      payload: movieObj
    }
  },
  addWatchedBefore: (movieObj) => {
    return {
      type: "ADD_WATCHED_HISTORY",
      payload: movieObj
    }
  }
}
const moviesAction = {
  setMovie: (movieObj) => {
    return {
      type: "SET_MOVIE",
      payload: movieObj
    }
  },
  setDiscoverMovies: (movieObj) => {
    return {
      type: "SET_DISCOVER_MOVIES",
      payload: movieObj
    }
  },
  setTrendingMovies: (movieObj) => {
    return {
      type: "SET_TRENDING_MOVIES",
      payload: movieObj
    }
  },
  setDiscoverMoviesPaginated: (pagStartNum, pagEndNum) => {
    return {
      type: "SET_DISCOVER_MOVIES_PAGINATED",
      payload: { pagStartNum, pagEndNum }
    }
  },
  setTrendingMoviesPaginated: (pagStartNum, pagEndNum) => {
    return {
      type: "SET_TRENDING_MOVIES_PAGINATED",
      payload: { pagStartNum, pagEndNum }
    }
  },
  setPopularMovies: (movieObj) => {
    return {
      type: "SET_POPULAR_MOVIES",
      payload: movieObj
    }
  },
  setTopRatedMovies: (movieObj) => {
    return {
      type: "SET_TOP_RATED_MOVIES",
      payload: movieObj
    }
  },
  addPopularMovies: (movieObj) => {
    return {
      type: "ADD_POPULAR_MOVIES",
      payload: movieObj
    }
  },

  addTopRatedMovies: (movieObj) => {
    return {
      type: "ADD_TOP_RATED_MOVIES",
      payload: movieObj
    }
  }
}
export const allActions = { userActions, moviesAction }
