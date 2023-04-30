import mongoose from "mongoose";
const Schema = mongoose.Schema;
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const productSchema = new Schema({
  product_code: String,
  product_name: { type: String, required: true },
  product_category: {
    type: String,
    enum: [
      "lens",
      "frame",
      "contanct lens",
      "cleaning solution",
      "accessories",
    ],
    required: true,
  },
  brand: { type: String },
  description: String,
  batch_no: { type: String },
  ordered_quantity: { type: Number, required: true },
  current_quantity: { type: Number },
  sold_quantity: { type: Number },
  reorder_level: { type: Number },
  supplier_cost: { type: Number },
  vat_applicable: { type: Boolean, default: false },
  vat: { type: Number },
  selling_price: { type: Number, required: true },

  created_at: { type: Date, required: true, default: Date.now },
});

productSchema.plugin(AutoIncrement, { inc_field: "product_no" });

const Product = mongoose.model("Product", productSchema);

export default Product;