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
      type: "addFavorites",
      payload: movieObj
    }
  },
  addWatchedBefore: (movieObj) => {
    return {
      type: "addWatchedBefore",
      payload: movieObj
    }
  }
}
const moviesAction = {
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
  }
}
export const allActions = { userActions, moviesAction }
