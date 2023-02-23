import mongoose from "mongoose";
import Billing from "./billing.model.js";
import PatientRequest from "./patientRequest.model.js";

const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: String,
    mobile: Number,
    address: String,
    dob: Date,
    age: Number,
    gender: String,
    examined_by: String,
    created_at: { type: Date, required: true, default: Date.now },
  },
  { timestamp: true }
);

patientSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function () {
    const doc = await this.model.findOne(this.getFilter());
    await PatientRequest.deleteMany({ patient: doc._id });
    await Billing.deleteMany({ patient: doc._id });
  }
);
const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
