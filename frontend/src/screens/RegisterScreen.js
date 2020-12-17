import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import { register } from '../actions/userActions'

const RegisterScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      history.push('/dashboard')
    } else if (error) {
      setTimeout(() => setMessage(''), 2000)
      setMessage(error)
    }
  }, [history, userInfo, error])

  const registerHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password, role))
    }
  }

  return (
    <section className='form mt-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 m-auto'>
            <div className='card bg-white p-4 mb-4'>
              <div className='card-body'>
                <h1>
                  <i className='fas fa-user-plus'></i> Register
                </h1>
                <p>
                  Register to list your gym or rate, review and favourite gyms
                </p>
                {message && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <form onSubmit={registerHandler}>
                  <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                      type='text'
                      name='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='form-control'
                      placeholder='Enter full name'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                      type='email'
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='form-control'
                      placeholder='Enter email'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                      type='password'
                      name='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='form-control'
                      placeholder='Enter password'
                      minLength='8'
                      required
                    />
                    <small>Password must be at least 8 characters long</small>
                  </div>

                  <div className='form-group mb-4'>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input
                      type='password'
                      name='password2'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className='form-control'
                      placeholder='Confirm password'
                      required
                    />
                  </div>

                  <div className='card card-body mb-3'>
                    <h5>User Role</h5>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='role'
                        value='user'
                        onChange={(e) => setRole(e.target.value)}
                        required
                      />
                      <label className='form-check-label'>
                        Regular User (Browse, Write reviews, etc)
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='role'
                        value='publisher'
                        onChange={(e) => setRole(e.target.value)}
                        required
                      />
                      <label className='form-check-label'>Gym Publisher</label>
                    </div>
                  </div>
                  <p className='text-danger'>
                    * You must be affiliated with the gym in some way in order
                    to add it to the website.
                  </p>
                  <div className='form-group'>
                    <input
                      type='submit'
                      value='Register'
                      className='btn btn-primary btn-block'
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterScreen
