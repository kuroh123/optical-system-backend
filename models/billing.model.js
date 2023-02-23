import mongoose from "mongoose";
const Schema = mongoose.Schema;
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const billingSchema = new Schema(
  {
    lens_name: String,
    lens_type: String,
    lens_expiry: Date,
    lens_for: String,
    lens_side: String,
    lens_price: Number,
    frame_name: String,
    frame_type: String,
    frame_price: String,
    other_items: [Object],
    bill_remarks: String,
    extra_charges: Number,
    vat: {
      type: Number,
      default: 0,
    },
    total_amount: Number,
    paid_amount: Number,
    balance_amount: Number,
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

billingSchema.plugin(AutoIncrement, { inc_field: "bill_no" });

// billingSchema.virtual("current_payment_status").get(function () {
//   if (this.paid_amount === 0) {
//     return "pending";
//   } else if (this.paid_amount < this.total_amount) {
//     return "partially_paid";
//   } else {
//     return "paid";
//   }
// });
const Billing = mongoose.model("Billing", billingSchema);

export default Billing;
