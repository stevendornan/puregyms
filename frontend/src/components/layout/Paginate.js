import React from 'react'
import { Link } from 'react-router-dom'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <nav aria-label='Page navigation example'>
        <ul className='pagination'>
          {[...Array(pages).keys()].map((x) => (
            <>
              <li className='page-item'>
                <Link
                  key={x + 1}
                  className='page-link ml-1'
                  to={
                    !isAdmin
                      ? keyword
                        ? `/search/${keyword}/page/${x + 1}`
                        : `/page/${x + 1}`
                      : `/admin/gymlist/${x + 1}`
                  }
                >
                  {x + 1}
                </Link>
              </li>
            </>
          ))}
        </ul>
      </nav>
    )
  )
}

export default Paginate
