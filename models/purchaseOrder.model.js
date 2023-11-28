import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const purchaseOrderSchema = new Schema({
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

purchaseOrderSchema.plugin(AutoIncrement, { inc_field: "purchase_order_no" });

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);

export default PurchaseOrder;
