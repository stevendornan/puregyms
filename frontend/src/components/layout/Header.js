import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <nav className='navbar navbar-expand-md navbar-dark bg-primary fixed-top'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            <i className='fas fa-dumbbell'></i> PureGyms
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav ml-auto'>
              {userInfo && userInfo.role !== 'admin' ? (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/dashboard'>
                      Dashboard
                    </Link>
                  </li>
                  <li className='nav-item dropdown'>
                    <a
                      className='nav-link dropdown-toggle'
                      href='#'
                      id='navbarDropdown'
                      role='button'
                      data-toggle='dropdown'
                    >
                      <i className='fas fa-user'></i> Account
                    </a>
                    <div className='dropdown-menu'>
                      {userInfo.role === 'publisher' ? (
                        <>
                          <Link className='dropdown-item' to='/manage-gyms'>
                            Manage Gyms
                          </Link>
                          <Link className='dropdown-item' to='/profile'>
                            Manage Account
                          </Link>
                          <div className='dropdown-divider'></div>
                          <a className='dropdown-item' onClick={logoutHandler}>
                            <i className='fas fa-sign-out-alt'></i> Logout
                          </a>
                        </>
                      ) : (
                        <>
                          <Link className='dropdown-item' to='/profile'>
                            Manage Account
                          </Link>
                          <div className='dropdown-divider'></div>
                          <a className='dropdown-item' onClick={logoutHandler}>
                            <i className='fas fa-sign-out-alt'></i> Logout
                          </a>
                        </>
                      )}
                    </div>
                  </li>
                  <li className='nav-item d-none d-md-block'>
                    <a className='nav-link' href='#'>
                      |
                    </a>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/gyms'>
                      Browse Gyms
                    </Link>
                  </li>
                </>
              ) : userInfo && userInfo.role === 'admin' ? (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/dashboard'>
                      Dashboard
                    </Link>
                  </li>
                  <li className='nav-item dropdown'>
                    <a
                      className='nav-link dropdown-toggle'
                      href='#'
                      id='navbarDropdown'
                      role='button'
                      data-toggle='dropdown'
                    >
                      <i className='fas fa-user'></i> Account
                    </a>
                    <div className='dropdown-menu'>
                      <>
                        <Link className='dropdown-item' to='/profile'>
                          Manage Account
                        </Link>
                        <Link className='dropdown-item' to='/manage-gyms'>
                          Users
                        </Link>
                        <div className='dropdown-divider'></div>
                        <a className='dropdown-item' onClick={logoutHandler}>
                          <i className='fas fa-sign-out-alt'></i> Logout
                        </a>
                      </>
                    </div>
                  </li>
                  <li className='nav-item d-none d-md-block'>
                    <a className='nav-link' href='#'>
                      |
                    </a>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/gyms'>
                      Browse Gyms
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/login'>
                      <i className='fas fa-sign-in-alt'></i> Login
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/register'>
                      <i className='fas fa-user-plus'></i> Register
                    </Link>
                  </li>
                  <li className='nav-item d-none d-md-block'>
                    <a className='nav-link' href='#'>
                      |
                    </a>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/gyms'>
                      Browse Gyms
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
