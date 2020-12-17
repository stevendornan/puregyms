import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DashboardActions from '../components/dashboard/DashboardActions'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import { getUserDetails, deleteUser, logout } from '../actions/userActions'

const DashboardScreen = ({ history }) => {
  const dispatch = useDispatch()

  const gymListMy = useSelector((state) => state.gymListMy)
  const { loading: gymListLoading, error: gymListError, gyms } = gymListMy

  const userDetails = useSelector((state) => state.userDetails)
  const { user, loading, error } = userDetails

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else if (successDelete) {
      dispatch(logout())
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails('profile'))
      }
    }
  }, [dispatch, history, user, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <section className='dashboard my-5'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h1>Dashboard</h1>
          <p className='lead'>
            <i className='fas fa-user' /> Welcome {userInfo && userInfo.name}
          </p>
          {userInfo && (
            <>
              <DashboardActions />
            </>
          )}
          <p>
            I lost my job a month a go due to the pandemic. <br /> If the apps I
            produce is helping you or your interested in a similar web app,{' '}
            <br /> a donation of any amount would be appreciated. <br /> Helps
            me survive over Christmas and to build better web apps.
          </p>
          <a
            className='btn donate btn-primary mt-1'
            href='https://donorbox.org/to-improve-my-web-applications-for-public-use?default_interval=o'
          >
            Donate With Kindness
          </a>
          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={() => deleteHandler(user.id)}
            >
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default DashboardScreen
