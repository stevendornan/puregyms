import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import { listGymDetails, updateGym } from '../actions/gymActions'
import { GYM_UPDATE_RESET } from '../constants/gymConstants'

const GymEditScreen = ({ history, match }) => {
  const gymId = match.params.id
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
  const [message, setMessage] = useState(null)
  setMessage('')

  const dispatch = useDispatch()

  const gymDetails = useSelector((state) => state.gymDetails)
  const { loading, error, gym } = gymDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const gymUpdate = useSelector((state) => state.gymUpdate)
  const { success: successUpdate } = gymUpdate

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else if (userInfo.role === 'user') {
      history.push('/dashboard')
    } else {
      if (!gym.name || gym._id !== gymId) {
        dispatch(listGymDetails(gymId))
      } else if (successUpdate) {
        setTimeout(() => dispatch({ type: GYM_UPDATE_RESET }), 3000)
        history.push('/manage-gyms')
      } else {
        setName(gym.name)
        setDescription(gym.description)
        setAddress(gym.address)
        setWebsite(gym.website)
        setEmail(gym.email)
        setPhone(gym.phone)
        setImage(gym.image)
        setcarPark(gym.carPark)
        setDisabledAccess(gym.disabledAccess)
      }
    }
  }, [dispatch, history, userInfo, gymId, gym, successUpdate])

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

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateGym({
        _id: gym._id,
        name,
        description,
        address,
        phone,
        email,
        website,
        image,
        carPark,
        disabledAccess,
      })
    )
  }

  return (
    <section className='container mt-5'>
      <h1 className='mb-2'>Edit Gym</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {successUpdate && <Message variant='success'>Gym Updated</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
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
                  ></textarea>
                  <small className='form-text text-muted'>
                    No more than 500 characters
                  </small>
                </div>

                <div className='mb-4'>
                  {image && (
                    <>
                      <img src={image} className='gym-image' alt='gym' />
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
                  <label className='form-check-label' htmlFor='disableAccess'>
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
    </section>
  )
}

export default GymEditScreen
