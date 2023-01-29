import mongoose from "mongoose";
const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    mobile: Number,
    address: String,
    age: Number,
    gender: String,
  },
  { timestamp: true }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
