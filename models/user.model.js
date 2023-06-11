import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an Email!"],
      unique: [true, "Email Exist"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password!"],
      unique: false,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
  },
  { timestamp: true }
);

const User = mongoose.model("User", userSchema);

export default User;
