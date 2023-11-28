import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const customerOrderSchema = new Schema({
  product_name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "received"],
    default: "pending",
  },
  remarks: String,
  purchase_cost: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  created_at: { type: Date, required: true, default: Date.now },
});

customerOrderSchema.plugin(AutoIncrement, { inc_field: "customer_order_no" });

const CustomerOrder = mongoose.model("CustomerOrder", customerOrderSchema);

export default CustomerOrder;
