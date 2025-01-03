import mongoose from "mongoose";

export const ProductReviewSchema = new mongoose.Schema(
  {
    productId: String,
    userId: String,
    userName: String,
    reviewMessage: String,
    reviewValue: Number
  },
  { timestamps: true }
);
const ProductReview = mongoose.model("ProductReview", ProductReviewSchema);

export default ProductReview;
