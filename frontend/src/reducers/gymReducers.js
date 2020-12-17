import {
  GYM_LIST_MY_REQUEST,
  GYM_LIST_MY_SUCCESS,
  GYM_LIST_MY_FAIL,
  GYM_LIST_MY_RESET,
  GYM_LIST_REQUEST,
  GYM_LIST_SUCCESS,
  GYM_LIST_FAIL,
  GYM_CREATE_REQUEST,
  GYM_CREATE_SUCCESS,
  GYM_CREATE_FAIL,
  GYM_CREATE_RESET,
  GYM_UPDATE_REQUEST,
  GYM_UPDATE_SUCCESS,
  GYM_UPDATE_FAIL,
  GYM_UPDATE_RESET,
  GYM_DELETE_REQUEST,
  GYM_DELETE_SUCCESS,
  GYM_DELETE_FAIL,
  GYM_DETAILS_REQUEST,
  GYM_DETAILS_SUCCESS,
  GYM_DETAILS_FAIL,
  GYM_DETAILS_RESET,
} from '../constants/gymConstants'

export const gymListMyReducer = (state = { gyms: [] }, action) => {
  switch (action.type) {
    case GYM_LIST_MY_REQUEST:
      return {
        loading: true,
        gyms: [],
      }
    case GYM_LIST_MY_SUCCESS:
      return {
        loading: false,
        gyms: action.payload,
      }
    case GYM_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case GYM_LIST_MY_RESET:
      return { gyms: [] }
    default:
      return state
  }
}

export const gymListReducer = (state = { gyms: [] }, action) => {
  switch (action.type) {
    case GYM_LIST_REQUEST:
      return { loading: true, gyms: [] }
    case GYM_LIST_SUCCESS:
      return {
        loading: false,
        gyms: action.payload.gyms,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case GYM_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const gymDetailsReducer = (state = { gym: {} }, action) => {
  switch (action.type) {
    case GYM_DETAILS_REQUEST:
      return { ...state, loading: true }
    case GYM_DETAILS_SUCCESS:
      return { loading: false, gym: action.payload }
    case GYM_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case GYM_DETAILS_RESET:
      return { gym: {} }
    default:
      return state
  }
}

export const gymCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GYM_CREATE_REQUEST:
      return { loading: true }
    case GYM_CREATE_SUCCESS:
      return { loading: false, success: true, gym: action.payload }
    case GYM_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case GYM_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const gymUpdateReducer = (state = { gym: {} }, action) => {
  switch (action.type) {
    case GYM_UPDATE_REQUEST:
      return { loading: true }
    case GYM_UPDATE_SUCCESS:
      return { loading: false, success: true, gym: action.payload }
    case GYM_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case GYM_UPDATE_RESET:
      return { gym: {} }
    default:
      return state
  }
}

export const gymDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case GYM_DELETE_REQUEST:
      return { loading: true }
    case GYM_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case GYM_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
