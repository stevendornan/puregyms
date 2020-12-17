import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import { listGymDetails } from '../actions/gymActions'

const GymScreen = ({ match }) => {
  const gymId = match.params.id

  const dispatch = useDispatch()

  const gymDetails = useSelector((state) => state.gymDetails)
  const { loading, error, gym } = gymDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!gym.name || gym._id !== gymId) {
      dispatch(listGymDetails(gymId))
    }
  }, [dispatch, gymId, gym])

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
                <h1>{gym && gym.name}</h1>
                <p>{gym.description}</p>
              </div>
              <div className='col-md-4'>
                <Link
                  to={`/reviews/gym/${gym._id}`}
                  className='btn btn-dark btn-block my-3'
                >
                  <i className='fas fa-comments'></i> Read Reviews
                </Link>
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
                {gym.website && (
                  <a
                    href={gym.website}
                    target='_blank'
                    className='btn btn-secondary btn-block my-3'
                  >
                    <i className='fas fa-globe'></i> Visit Website
                  </a>
                )}

                <div id='map'></div>
                <ul className='list-group list-group-flush mt-4'>
                  {gym.disabledAccess ? (
                    <li className='list-group-item'>
                      <i className='fas fa-check text-success'></i> Disabled
                      Access
                    </li>
                  ) : (
                    <li className='list-group-item'>
                      <i className='fas fa-check text-danger'></i> Disabled
                      Access
                    </li>
                  )}
                  {gym.carPark ? (
                    <li className='list-group-item'>
                      <i className='fas fa-check text-success'></i> Car Park
                    </li>
                  ) : (
                    <li className='list-group-item'>
                      <i className='fas fa-check text-danger'></i> Car Park
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default GymScreen
