import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userDeleteReducer,
} from './reducers/userReducers'
import {
  gymListMyReducer,
  gymListReducer,
  gymDetailsReducer,
  gymCreateReducer,
  gymUpdateReducer,
  gymDeleteReducer,
} from './reducers/gymReducers'
import {
  reviewCreateReducer,
  reviewListReducer,
} from './reducers/reviewReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  gymListMy: gymListMyReducer,
  gymList: gymListReducer,
  gymDetails: gymDetailsReducer,
  gymCreate: gymCreateReducer,
  gymUpdate: gymUpdateReducer,
  gymDelete: gymDeleteReducer,
  reviewCreate: reviewCreateReducer,
  reviewList: reviewListReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
