import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import Paginate from '../components/layout/Paginate'
import { listGyms } from '../actions/gymActions'

const GymsScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const gymList = useSelector((state) => state.gymList)
  const { loading, error, gyms, page, pages } = gymList

  useEffect(() => {
    dispatch(listGyms(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <section className='browse my-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <>
                {gyms.length < 1 ? (
                  <>
                    <Link to='/' className='btn btn-light my-3'>
                      Go Back
                    </Link>
                    <h4>No Gyms found. Please search again.</h4>
                  </>
                ) : (
                  <>
                    {gyms.map((gym) => (
                      <>
                        <div className='card mb-3'>
                          <div className='row no-gutters'>
                            <div className='col-md-2'>
                              <img
                                src={gym.image}
                                className='card-img'
                                alt='...'
                              />
                            </div>
                            <div className='col-md-8'>
                              <div className='card-body'>
                                <h5 className='card-title'>
                                  <Link to={`/gyms/${gym._id}`}>
                                    {gym.name}
                                  </Link>
                                  <Link to={`/gyms/${gym._id}`}>
                                    <span className='float-right badge badge-success p-2'>
                                      More Info
                                    </span>
                                  </Link>
                                </h5>
                                {gym.phone && (
                                  <p className='card-text'>Tel: {gym.phone}</p>
                                )}
                                {gym.email && (
                                  <p className='card-text'>
                                    Email: {gym.email}
                                  </p>
                                )}
                                {gym.website && (
                                  <p className='card-text'>
                                    Website:{' '}
                                    <a target='_blank' href={gym.website}>
                                      {gym.website}/
                                    </a>
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Paginate
                          pages={pages}
                          page={page}
                          keyword={keyword ? keyword : ''}
                        />
                      </>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GymsScreen
