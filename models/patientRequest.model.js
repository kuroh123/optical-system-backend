import mongoose from "mongoose";
const Schema = mongoose.Schema;
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

// const eyeDetailSchema = new Schema({
//   spherical: String,
//   cylindrical: String,
//   axis: String,
//   add: String,
//   prism: String,
//   va: String,
// });

const patientRequestSchema = new Schema(
  {
    right_eye: {
      spherical: String,
      cylindrical: String,
      axis: String,
      add: String,
      prism: String,
      va: String,
    },
    left_eye: {
      spherical: String,
      cylindrical: String,
      axis: String,
      add: String,
      prism: String,
      va: String,
    },
    lens_type: String,
    lens_for: String,
    lens_side: String,
    lens_price: Number,
    frame_type: String,
    frame_price: String,
    remarks: String,
    extra_charges: Number,
    total_amount: Number,
    paid_amount: Number,
    payment_status: {
      type: String,
      enum: ["pending", "partially_paid", "paid"],
      default: "pending",
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    created_at: { type: Date, required: true, default: Date.now },
  },
  { timestamp: true }
);

patientRequestSchema.virtual("patient_data", {
  ref: "Patient",
  localField: "patient", // Of post collection
  foreignField: "_id", // Of user collection
  justOne: true,
});

patientRequestSchema.plugin(AutoIncrement, { inc_field: "visit_id" });
// patientRequestSchema.pre('save', function(next) {
//     var doc = this;
//     counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
//         if(error)
//             return next(error);
//         doc.testvalue = counter.seq;
//         next();
//     });
// });

const PatientRequest = mongoose.model("PatientRequest", patientRequestSchema);

export default PatientRequest;
