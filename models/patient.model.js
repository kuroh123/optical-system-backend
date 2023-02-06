import mongoose from "mongoose";
const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    mobile: Number,
    address: String,
    dob: Date,
    age: Number,
    gender: String,
    examined_by: String,
  },
  { timestamp: true }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
