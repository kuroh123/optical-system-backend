import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const customerOrderSchema = new Schema({
  billing: {
    type: Schema.Types.ObjectId,
    ref: "Billing",
  },
  product_code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "received"],
    default: "pending",
  },
  remarks: String,
  purchase_cost: {
    type: Number,
  },
  amount: {
    type: Number,
    required: true,
  },
  sold_quantity: {
    type: Number,
    required: true,
  },
  vat_applicable: {
    type: Boolean,
    default: false,
  },
  vendor_name: String,
  vendor_mobile: Number,
  created_at: { type: Date, required: true, default: Date.now },
});

customerOrderSchema.plugin(AutoIncrement, { inc_field: "customer_order_no" });

const CustomerOrder = mongoose.model("CustomerOrder", customerOrderSchema);

export default CustomerOrder;
