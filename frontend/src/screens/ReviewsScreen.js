import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listGymDetails } from '../actions/gymActions'
import { listReviews } from '../actions/reviewActions'

const ReviewsScreen = ({ match }) => {
  const gymId = match.params.id

  const dispatch = useDispatch()

  const reviewList = useSelector((state) => state.reviewList)
  const { loading, error, reviews } = reviewList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const gymDetails = useSelector((state) => state.gymDetails)
  const { gym } = gymDetails

  useEffect(() => {
    if (!gym.name || gym._id !== gymId) {
      dispatch(listGymDetails(gymId))
    }
    dispatch(listReviews(gymId))
  }, [dispatch, gymId])

  return (
    <section className='bootcamp mt-5'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8'>
                <Link
                  to={`/gyms/${gym._id}`}
                  className='btn btn-secondary my-3'
                >
                  <i className='fas fa-chevron-left'></i> Gym Info
                </Link>
                <h1 className='mb-4'>{gym.name} Reviews</h1>
                {(reviews ?? []).map((review) => (
                  <div className='card mb-3'>
                    <h5 className='card-header bg-dark text-white'>
                      {review.title}
                    </h5>
                    <>
                      <div className='card-body'>
                        <h5 className='card-title'>
                          Rating:{' '}
                          <span className='text-success'>{review.rating}</span>
                        </h5>
                        <p className='card-text'>{review.review}</p>
                        <p className='text-muted'>
                          Written By {review.user.name}
                        </p>
                      </div>
                    </>
                  </div>
                ))}
              </div>
              <div className='col-md-4'>
                {userInfo && userInfo.role === 'user' ? (
                  <Link
                    to={`/add-review/gym/${gym._id}`}
                    className='btn btn-light btn-block my-3'
                  >
                    <i className='fas fa-pencil-alt'></i> Write a Review
                  </Link>
                ) : userInfo && userInfo.role === 'publisher' ? (
                  <></>
                ) : (
                  <Link
                    className='btn btn-primary btn-block text-underline'
                    to='/login'
                  >
                    Please sign in to write a review
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default ReviewsScreen
