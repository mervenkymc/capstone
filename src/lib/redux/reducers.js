const userInitialState = {
  isLoggedIn: false,
  userData: null,
  favoritesMovies: null,
  watchedMovies: null
}
export function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload
      }
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        userData: null
      }

    default:
      return state
  }
}
const moviesInitialState = {
  discoverMovies: { data: [] },
  trendingMovies: { data: [] }
}

export function movieReducer(state = moviesInitialState, action) {
  switch (action.type) {
    case "SET_DISCOVER_MOVIES":
      return {
        ...state,
        discoverMovies: action.payload
      }
    case "SET_TRENDING_MOVIES":
      return {
        ...state,
        trendingMovies: action.payload
      }

    default:
      return state
  }
}
