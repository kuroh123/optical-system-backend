import mongoose from "mongoose";
const Schema = mongoose.Schema;
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const userSchema = new Schema(
  {
    name: String,
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true }
);
userSchema.plugin(AutoIncrement, { inc_field: "user_code" });

const User = mongoose.model("User", userSchema);

export default User;
