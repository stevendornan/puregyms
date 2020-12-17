import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import { updateUser } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const UpdatePasswordScreen = ({ history }) => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [message, setMessage] = useState(null)

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
    } else if (success) {
      setNewPassword('')
      setConfirmNewPassword('')
      setTimeout(() => dispatch({ type: USER_UPDATE_PROFILE_RESET }), 3000)
    }
  }, [dispatch, history, userInfo, success])

  const updateProfileHandler = (e) => {
    e.preventDefault()
    if (newPassword !== confirmNewPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUser({ _id: user._id, password: newPassword }))
    }
  }

  return (
    <section className='container mt-5'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='row'>
            <div className='col-md-2'>
              <Link className='btn btn-light' to='/profile'>
                Go Back
              </Link>
            </div>
            <div className='col-md-8'>
              <div className='card bg-white py-2 px-4'>
                <div className='card-body'>
                  {message && <Message variant='danger'>{message}</Message>}
                  {error && <Message variant='danger'>{error}</Message>}
                  {success && (
                    <Message variant='success'>Password Updated</Message>
                  )}
                  <h1 className='mb-2'>Update Password</h1>

                  <form onSubmit={updateProfileHandler}>
                    <div className='form-group'>
                      <label>New Password</label>
                      <input
                        type='password'
                        name='newPassword'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className='form-control'
                        placeholder='New Password'
                        minLength='8'
                        required
                      />
                      <small>Password must be at least 8 characters long</small>
                    </div>
                    <div className='form-group'>
                      <label>Confirm New Password</label>
                      <input
                        type='password'
                        name='newPassword2'
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className='form-control'
                        placeholder='Confirm New Password'
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='submit'
                        value='Update Password'
                        className='btn btn-dark btn-block'
                      />
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

export default UpdatePasswordScreen
