import mongoose from "mongoose";
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Location = mongoose.model("Location", locationSchema);

export default Location;
