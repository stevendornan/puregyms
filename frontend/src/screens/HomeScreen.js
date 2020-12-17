import React, { useState } from 'react'

const Homescreen = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <section className='showcase'>
      <div className='dark-overlay'>
        <div className='showcase-inner container'>
          <h1 className='display-4'>Find a Gym</h1>
          <p className='lead'>Find, rate and read reviews on gyms</p>
          <form onSubmit={submitHandler}>
            <div className='row'>
              <div className='col-md-12'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    name='q'
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder='Enter gym name'
                    required
                  />
                </div>
              </div>
            </div>
            <input
              type='submit'
              value='Find Gyms'
              className='btn btn-primary btn-block'
            />
          </form>
        </div>
      </div>
    </section>
  )
}

export default Homescreen
