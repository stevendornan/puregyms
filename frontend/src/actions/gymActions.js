import axios from 'axios'
import {
  GYM_LIST_MY_REQUEST,
  GYM_LIST_MY_SUCCESS,
  GYM_LIST_MY_FAIL,
  GYM_LIST_REQUEST,
  GYM_LIST_SUCCESS,
  GYM_LIST_FAIL,
  GYM_DETAILS_REQUEST,
  GYM_DETAILS_SUCCESS,
  GYM_DETAILS_FAIL,
  GYM_CREATE_REQUEST,
  GYM_CREATE_SUCCESS,
  GYM_CREATE_FAIL,
  GYM_UPDATE_REQUEST,
  GYM_UPDATE_SUCCESS,
  GYM_UPDATE_FAIL,
  GYM_DELETE_REQUEST,
  GYM_DELETE_SUCCESS,
  GYM_DELETE_FAIL,
} from '../constants/gymConstants'
import { logout } from './userActions'

export const listMyGyms = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GYM_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/gyms/mygyms', config)

    dispatch({
      type: GYM_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: GYM_LIST_MY_FAIL,
      payload: message,
    })
  }
}

export const listGyms = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: GYM_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/gyms?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: GYM_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GYM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listGymDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GYM_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/gyms/${id}`)

    dispatch({
      type: GYM_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GYM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.response
          : error.response,
    })
  }
}

export const createGym = (gym) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GYM_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/gyms', gym, config)

    dispatch({
      type: GYM_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.response
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: GYM_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateGym = (gym) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GYM_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/gyms/${gym._id}`, gym, config)

    dispatch({
      type: GYM_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: GYM_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const deleteGym = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GYM_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/gyms/${id}`, config)

    dispatch({
      type: GYM_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: GYM_DELETE_FAIL,
      payload: message,
    })
  }
}
