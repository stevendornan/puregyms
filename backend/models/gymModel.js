import slugify from 'slugify'
import mongoose from 'mongoose'

const gymSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name'],
      trim: true,
      unique: true,
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Please enter a description'],
      maxlength: [500, 'Description can not be more than 500 characters'],
    },
    image: {
      type: String,
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS',
      ],
    },
    phone: {
      type: String,
      maxlength: [20, 'Phone number can not be longer than 20 characters'],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    address: {
      type: String,
    },

    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    averageRating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [10, 'Rating must can not be more than 10'],
    },
    photo: {
      type: String,
      default: 'no-photo.jpg',
    },

    disabledAccess: {
      type: Boolean,
      default: false,
    },
    carPark: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

gymSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

const Gym = mongoose.model('Gym', gymSchema)

export default Gym
