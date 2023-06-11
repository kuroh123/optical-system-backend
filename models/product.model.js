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
      "sunglasses",
      "contanct lens",
      "cleaning solution",
      "accessories",
    ],
    required: true,
  },
  brand: { type: String },
  description: String,
  product_for: { type: String, enum: ["Male", "Female", "Kids"] },
  ordered_quantity: { type: Number, required: true },
  current_quantity: {
    type: Number,
    default: function () {
      return this.ordered_quantity;
    },
  },
  // giving default cuz of problem in billing calculation
  sold_quantity: { type: Number, default: 1 },
  discount: { type: Number, default: 0 },
  //
  reorder_level: { type: Number },
  supplier_cost: { type: Number },
  selling_price: { type: Number, required: true },
  location: {
    type: Schema.Types.ObjectId,
    ref: "Location",
  },

  created_at: { type: Date, required: true, default: Date.now },
});

productSchema.plugin(AutoIncrement, { inc_field: "product_no" });

const Product = mongoose.model("Product", productSchema);

export default Product;
