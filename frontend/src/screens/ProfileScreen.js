import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [role, setRole] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails('profile'))
      } else if (success) {
        setTimeout(() => setMessage(''), 2000)
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
        setRole(user.role)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const updateProfileHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: user._id, name, email }))
    setMessage('Profile Updated')
  }

  return (
    <section className='container mt-5'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div class='row'>
            <div className='col-md-2'>
              <Link className='btn btn-light' to='/dashboard'>
                Go Back
              </Link>
            </div>
            <div className='col-md-8'>
              <div className='card bg-white py-2 px-4'>
                <div className='card-body'>
                  {message && (
                    <Message variant='success'>Profile Updated</Message>
                  )}
                  <h1 className='mb-2'>User Profile</h1>
                  <form onSubmit={updateProfileHandler}>
                    <div className='form-group'>
                      <label>Name</label>
                      <input
                        type='text'
                        name='title'
                        className='form-control'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                      />
                    </div>
                    <div className='form-group'>
                      <label>Email</label>
                      <input
                        type='email'
                        name='email'
                        className='form-control'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label>Role</label>
                      <input
                        type='text'
                        name='role'
                        className='form-control'
                        value={role}
                        disabled
                      />
                    </div>
                    <div className='form-group'>
                      <div className='row'>
                        <div className='col-md-6'>
                          <input
                            type='submit'
                            value='Update'
                            className='btn btn-success btn-block'
                          />
                        </div>
                        <div className='col-md-6'>
                          <Link
                            to='/update-password'
                            className='btn btn-secondary btn-block'
                          >
                            Update Password
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default ProfileScreen
