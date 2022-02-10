import { createStore, combineReducers } from "redux"
import { userReducer, movieReducer } from "./reducers"

const rootReducer = combineReducers({
  userReducer,
  movieReducer
})
export const store = createStore(rootReducer)
