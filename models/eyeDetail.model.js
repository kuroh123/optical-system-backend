import mongoose from "mongoose";
const Schema = mongoose.Schema;
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const eyeDetailSchema = new Schema(
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
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    created_at: { type: Date, required: true, default: Date.now },
  },
  { timestamp: true }
);

// eyeDetailSchema.virtual("patient_data", {
//   ref: "Patient",
//   localField: "patient", // Of post collection
//   foreignField: "_id", // Of user collection
//   justOne: true,
// });

// eyeDetailSchema.plugin(AutoIncrement, { inc_field: "prescription_no" });
// eyeDetailSchema.pre('save', function(next) {
//     var doc = this;
//     counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
//         if(error)
//             return next(error);
//         doc.testvalue = counter.seq;
//         next();
//     });
// });

const EyeDetail = mongoose.model("EyeDetail", eyeDetailSchema);

export default EyeDetail;
