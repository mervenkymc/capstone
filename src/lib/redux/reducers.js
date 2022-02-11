const userInitialState = {
  isLoggedIn: false,
  userData: null,
  favoritesMovies: [],
  watchedMovies: []
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
    case "ADD_FAVORITES":
      return {
        ...state,
        favoritesMovies: [...state.favoritesMovies, action.payload]
      }
    case "ADD_WATCHED_HISTORY":
      return {
        ...state,
        watchedMovies: [...state.watchedMovies, action.payload]
      }

    default:
      return state
  }
}
const moviesInitialState = {
  discoverMovies: [],
  paginatedDiscoverMovies: [],
  trendingMovies: [],
  paginatedTrendingMovies: [],
  movie: null,
  popularMovies: [],
  topRatedMovies: []
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
    case "SET_DISCOVER_MOVIES_PAGINATED":
      return {
        ...state,
        paginatedDiscoverMovies: state.discoverMovies.results.slice(
          action.payload.pagStartNum,
          action.payload.pagEndNum
        )
      }
    case "SET_TRENDING_MOVIES_PAGINATED":
      return {
        ...state,
        paginatedTrendingMovies: state.trendingMovies.results.slice(
          action.payload.pagStartNum,
          action.payload.pagEndNum
        )
      }
    case "SET_MOVIE":
      return {
        ...state,
        movie: action.payload
      }

    case "SET_POPULAR_MOVIES":
      console.log([...state.popularMovies, ...action.payload])
      return {
        ...state,
        popularMovies: action.payload
      }
    case "SET_TOP_RATED_MOVIES":
      // console.log([...state.topRatedMovies, ...action.payload])
      return {
        ...state,
        topRatedMovies: action.payload
      }
    case "ADD_POPULAR_MOVIES":
      console.log([...state.popularMovies, ...action.payload])
      return {
        ...state,
        popularMovies: [...state.popularMovies, ...action.payload]
      }
    case "ADD_TOP_RATED_MOVIES":
      return {
        ...state,
        topRatedMovies: [...state.topRatedMovies, ...action.payload]
      }
    // case "ADD_TOP_RATED_MOVIES":
    //   return {
    //     ...state,
    //     topRatedMovies: [...state.topRatedMovies, ...action.payload]
    //   }
    default:
      return state
  }
}
