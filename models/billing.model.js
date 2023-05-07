import mongoose from "mongoose";
const Schema = mongoose.Schema;
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const billingSchema = new Schema(
  {
    product_details: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        sold_quantity: { type: Number, default: 0 },
      },
    ],
    extra_charges: Number,
    vat: {
      type: Number,
      default: 0,
    },
    discount: { type: Number, default: 0 },
    total_amount: Number,
    grand_total: Number,
    payment_type: { type: String, enum: ["Cash", "Visa"] },
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

const Billing = mongoose.model("Billing", billingSchema);

export default Billing;
