import axios from 'axios'

import {
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_LIST_FAIL,
} from '../constants/reviewConstants'
import { logout } from './userActions'

export const createReview = (gymId, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEW_CREATE_REQUEST,
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

    const { data } = await axios.post(
      `/api/reviews/${gymId}/reviews`,
      review,
      config
    )

    dispatch({
      type: REVIEW_CREATE_SUCCESS,
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
      type: REVIEW_CREATE_FAIL,
      payload: message,
    })
  }
}

export const listReviews = (gymId) => async (dispatch) => {
  try {
    dispatch({
      type: REVIEW_LIST_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`/api/reviews/gym/${gymId}`, config)

    dispatch({
      type: REVIEW_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.response
    dispatch({
      type: REVIEW_LIST_FAIL,
      payload: message,
    })
  }
}
