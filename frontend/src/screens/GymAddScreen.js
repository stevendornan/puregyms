import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Message from '../components/layout/Message'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/layout/Loader'
import { createGym } from '../actions/gymActions'

const GymAddScreen = ({ history }) => {
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [website, setWebsite] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [disabledAccess, setDisabledAccess] = useState(false)
  const [carPark, setcarPark] = useState(false)

  const dispatch = useDispatch()

  const gymCreate = useSelector((state) => state.gymCreate)
  const { gym, success, error, loading } = gymCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else if (userInfo.role === 'user') {
      history.push('/dashboard')
    }
    if (success) {
      history.push('/manage-gyms')
    }
  }, [success, history])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const addGymHandler = (e) => {
    e.preventDefault()
    dispatch(
      createGym({
        name,
        description,
        image,
        phone,
        email,
        website,
        address,
        disabledAccess,
        carPark,
      })
    )
  }

  return (
    <section className='container mt-5'>
      {loading ? (
        <Loader />
      ) : error ? (
        <>
          <Message variant='danger'>{error}</Message>
          <Link to='/manage-gyms' className='btn btn-light my-3'>
            Go Back
          </Link>
        </>
      ) : (
        <>
          <h1 className='mb-2'>Add Gym</h1>
          <p>
            Important: You must be affiliated with a gym to add it to the
            website
          </p>
          <form onSubmit={addGymHandler}>
            <div className='row'>
              <div className='col-md-6'>
                <div className='card bg-white py-2 px-4'>
                  <div className='card-body'>
                    <h3>Location & Contact</h3>
                    <p className='text-muted'>
                      If multiple locations, use the main or largest
                    </p>
                    <div className='form-group'>
                      <label>Name</label>
                      <input
                        type='text'
                        name='name'
                        className='form-control'
                        placeholder='Gym Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label>Address</label>
                      <input
                        type='text'
                        name='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className='form-control'
                        placeholder='Full Address'
                        required
                      />
                      <small className='form-text text-muted'>
                        Street, city, postcode, etc
                      </small>
                    </div>
                    <div className='form-group'>
                      <label>Phone Number</label>
                      <input
                        type='text'
                        name='phone'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className='form-control'
                        placeholder='Phone'
                      />
                    </div>
                    <div className='form-group'>
                      <label>Email</label>
                      <input
                        type='text'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='form-control'
                        placeholder='Contact Email'
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label>Website</label>
                      <input
                        type='text'
                        name='website'
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className='form-control'
                        placeholder='Website URL'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='card bg-white py-2 px-4'>
                  <div className='card-body'>
                    <h3>Other Info</h3>
                    <div className='form-group'>
                      <label>Description</label>
                      <textarea
                        name='description'
                        rows='5'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='form-control'
                        placeholder='Description (What you offer, etc)'
                        maxlength='500'
                        required
                      ></textarea>
                      <small className='form-text text-muted'>
                        No more than 500 characters
                      </small>
                    </div>

                    <div className='mb-4'>
                      {image && (
                        <>
                          <img src={image} className='gym-image' />
                        </>
                      )}
                      <div className='form-group mt-2'>
                        <input
                          type='text'
                          placeholder='Image url'
                          value={image}
                          disabled
                          className='form-control'
                        />
                        <div className='custom-file'>
                          <input
                            type='file'
                            name='photo'
                            className='custom-file-input'
                            id='photo'
                            onChange={uploadFileHandler}
                          />
                          {uploading && <Loader />}
                          <label className='custom-file-label' htmlFor='photo'>
                            Add Gym Image
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        name='disableAccess'
                        id='disableAccess'
                        checked={disabledAccess}
                        value={disabledAccess}
                        onChange={() => setDisabledAccess(!disabledAccess)}
                      />
                      <label
                        className='form-check-label'
                        htmlFor='disableAccess'
                      >
                        Disabled Access
                      </label>
                    </div>

                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        name='carPark'
                        id='carPark'
                        checked={carPark}
                        value={carPark}
                        onChange={() => setcarPark(!carPark)}
                      />
                      <label className='form-check-label' htmlFor='carPark'>
                        Car Park
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='form-group'>
              <input
                type='submit'
                value='Submit Gym'
                className='btn btn-success btn-block my-4'
              />
              <Link to='/manage-gyms' className='btn btn-danger btn-block mb-4'>
                Cancel
              </Link>
            </div>
          </form>
        </>
      )}
    </section>
  )
}

export default GymAddScreen
