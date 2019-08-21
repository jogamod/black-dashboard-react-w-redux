import { combineReducers } from 'redux'
import UserReducer from './user_reducer'

const rootReducer = combineReducers({
  user: UserReducer,
})

export default rootReducer