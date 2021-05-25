const mongoose =require ("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    is_posted_by:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    reviewed_product:{type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    public_name: { type: String, required: true },
    review: { type: Number, required: true },
    title: { type: String, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;