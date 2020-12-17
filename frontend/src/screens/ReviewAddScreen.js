import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import { listGymDetails } from '../actions/gymActions'
import { createReview } from '../actions/reviewActions'
import { REVIEW_CREATE_RESET } from '../constants/reviewConstants'

const ReviewAddScreen = ({ match, history }) => {
  const gymId = match.params.id

  const [rating, setRating] = useState(1)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const gymDetails = useSelector((state) => state.gymDetails)
  const { gym } = gymDetails

  const reviewCreate = useSelector((state) => state.reviewCreate)
  const {
    success: successReview,
    loading: loadingReview,
    error: errorReview,
  } = reviewCreate

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else if (userInfo.role === 'publisher') {
      history.push(`/reviews/gym/${gymId}`)
    } else if (successReview) {
      setRating(0)
      setTitle('')
      setComment('')
      setTimeout(() => dispatch({ type: REVIEW_CREATE_RESET }), 3000)
    } else if (errorReview) {
      setTimeout(() => dispatch({ type: REVIEW_CREATE_RESET }), 3000)
    } else if (!gym.name || gym._id !== gymId) {
      dispatch(listGymDetails(gymId))
      dispatch({ type: REVIEW_CREATE_RESET })
    }
  }, [dispatch, gymId, errorReview, successReview])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createReview(gymId, {
        rating,
        title,
        comment,
      })
    )
  }

  return (
    <section className='container mt-5'>
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <div className='card bg-white py-2 px-4'>
            <div className='card-body'>
              <Link
                to={`/gyms/${gym._id}`}
                className='btn btn-link text-secondary my-3'
              >
                <i className='fas fa-chevron-left'></i> Gym Info
              </Link>
              <h1 className='mb-2'>{gym.name}</h1>
              <h3 className='text-primary mb-4'>Write a Review</h3>
              <p>You must have attended this gym to review</p>
              {successReview && (
                <Message variant='success'>
                  Review submitted successfully
                </Message>
              )}
              {loadingReview && <Loader />}
              {errorReview && <Message variant='danger'>{errorReview}</Message>}

              <form onSubmit={submitHandler}>
                <div className='form-group'>
                  <label for='rating'>
                    Rating: <span className='text-primary'>{rating}</span>
                  </label>
                  <input
                    type='range'
                    className='custom-range'
                    min='1'
                    max='10'
                    step='1'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    id='rating'
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    name='title'
                    className='form-control'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Review title'
                    required
                  />
                </div>
                <div className='form-group'>
                  <textarea
                    name='comment'
                    rows='10'
                    className='form-control'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Your review'
                    required
                  ></textarea>
                </div>
                <div className='form-group'>
                  <input
                    type='submit'
                    value='Submit Review'
                    className='btn btn-dark btn-block'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReviewAddScreen
