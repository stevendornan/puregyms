import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    comment: {
      type: String,
      required: [true, 'Please add a comment'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: [true, 'Please add a rating between 1 and 10'],
    },
    gym: {
      type: mongoose.Schema.ObjectId,
      ref: 'Gym',
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

reviewSchema.index({ gym: 1, user: 1 }, { unique: true })

reviewSchema.statics.getAverageRating = async function (gymId) {
  const obj = await this.aggregate([
    {
      $match: { gym: gymId },
    },
    {
      $group: {
        _id: '$gym',
        averageRating: { $avg: '$rating' },
      },
    },
  ])

  try {
    await this.model('Gym').findByIdAndUpdate(gymId, {
      averageRating: obj[0].averageRating,
    })
  } catch (err) {
    console.error(err)
  }
}

const Review = mongoose.model('Review', reviewSchema)

export default Review
