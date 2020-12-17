import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import { login } from '../actions/userActions'
import { USER_LOGIN_FAIL } from '../constants/userConstants'

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push('/dashboard')
    } else if (error) {
      setTimeout(() => setMessage(''), 2000)
      setMessage('Invalid Credentials')
    }
  }, [history, userInfo, error])

  const loginHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <section className='form mt-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 m-auto'>
            <div className='card bg-white p-4 mb-4'>
              <div className='card-body'>
                <h1>
                  <i className='fas fa-sign-in-alt'></i> Login
                </h1>
                {message && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <p>
                  Log in to list your gym or rate, review and favourite gyms
                </p>
                <form onSubmit={loginHandler}>
                  <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                      type='email'
                      name='email'
                      className='form-control'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Enter email'
                      required
                    />
                  </div>
                  <div className='form-group mb-4'>
                    <label htmlFor='password'>Password</label>
                    <input
                      type='password'
                      name='password'
                      className='form-control'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Enter password'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='submit'
                      value='Login'
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

export default LoginScreen
