import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listMyGyms, deleteGym } from '../actions/gymActions'
import { GYM_CREATE_RESET } from '../constants/gymConstants'

const ManageGymScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { error } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const gymListMy = useSelector((state) => state.gymListMy)
  const { loading: loadingGyms, error: errorGyms, gyms } = gymListMy

  const gymDelete = useSelector((state) => state.gymDelete)
  const { success: successDelete } = gymDelete

  const gymCreate = useSelector((state) => state.gymCreate)
  const { success: successCreate, gym: createdGym } = gymCreate

  useEffect(() => {
    dispatch({ type: GYM_CREATE_RESET })
    if (!userInfo) {
      history.push('/login')
    } else {
      if (successCreate) {
        history.push(`/manage-gyms`)
      } else {
        dispatch(listMyGyms())
      }
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdGym])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteGym(id))
    }
  }

  return (
    <section className='container mt-5'>
      {loadingGyms ? (
        <Loader />
      ) : errorGyms ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <div className='card bg-white py-2 px-4'>
              <div className='card-body'>
                <h1 className='mb-4'>Manage Gym</h1>

                <>
                  {gyms === undefined ||
                    (gyms.length === 0 && (
                      <Link to='/add-gym' className='btn btn-light'>
                        <i className='fas fa-dumbbell text-primary' /> Add Gym
                      </Link>
                    ))}
                </>
                {gyms.length > 0
                  ? (gyms ?? []).map((gym) => (
                      <div key={gym._id}>
                        <div className='card mb-3'>
                          <div className='row no-gutters'>
                            <div className='col-md-4'>
                              <img
                                src={gym.image}
                                className='card-img'
                                alt='...'
                              />
                            </div>
                            <div className='col-md-8'>
                              <div className='card-body'>
                                <h5 className='card-title'>
                                  <a href=''>
                                    {gym.name}
                                    <span className='float-right badge badge-success'>
                                      8.8
                                    </span>
                                  </a>
                                </h5>
                                <span className='badge badge-dark mb-2'></span>
                                <p className='card-text'></p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Link
                          to={`/edit-gym/${gym._id}`}
                          className='btn btn-primary btn-block'
                        >
                          Edit Gym Details
                        </Link>

                        <Button
                          className='btn btn-danger btn-block'
                          onClick={() => deleteHandler(gym._id)}
                        >
                          Remove Gym
                        </Button>
                      </div>
                    ))
                  : null}

                <p className='text-muted mt-5'>
                  * You can only publish one gym per account.
                </p>
                <p className='text-muted'>
                  * You must be affiliated with the gym in some way in order to
                  add it to the website.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ManageGymScreen
