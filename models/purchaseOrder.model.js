import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const purchaseOrderSchema = new Schema({
  product_code: {
    type: String,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_category: {
    type: String,
    enum: [
      "lens",
      "frame",
      "sunglasses",
      "contanct lens",
      "cleaning solution",
      "accessories",
    ],
    required: true,
  },
  brand: { type: String },

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
  vendor_name: String,
  vendor_mobile: Number,
  created_at: { type: Date, required: true, default: Date.now },
});

purchaseOrderSchema.plugin(AutoIncrement, { inc_field: "purchase_order_no" });

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);

export default PurchaseOrder;
