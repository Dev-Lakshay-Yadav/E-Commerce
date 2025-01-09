import mongoose from "mongoose";

export const AddressSchema = new mongoose.Schema(
  {
    userId : String,
    address : String,
    city: String,
    pincode : String,
    phone : String,
    notes : String,
  },
  { timestamps: true }
);
const Address = mongoose.model("Address", AddressSchema);

export default Address;