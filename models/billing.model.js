import mongoose from "mongoose";
const Schema = mongoose.Schema;
import AutoIncrementFactory from "mongoose-sequence";
import Product from "./product.model.js";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const billingSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        sold_quantity: { type: Number, default: 1 },
        vat_applicable: {
          type: Boolean,
          default: false,
        },
      },
    ],
    customer_orders: [
      // { description: String, quantity: Number, cost: Number, remarks: String },
      { type: Schema.Types.ObjectId, ref: "CustomerOrder" },
    ],
    services: [{ description: String, amount: Number, remarks: String }],
    total_amount: { type: Number, default: 0 },

    vat: {
      type: Number,
      default: 0,
    },
    discount: { type: Number, default: 0 },
    grand_total: { type: Number, default: 0 },
    // payment_type: { type: String, enum: ["Cash", "Visa"] },
    // paid_amount: { type: Number, default: 0 }, //calculated
    // balance_amount: Number, //calculated
    // payment_status: {
    //   //automatically set
    //   type: String,
    //   enum: ["pending", "partially_paid", "paid"],
    //   default: "pending",
    // },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
    created_at: { type: Date, required: true, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

billingSchema.plugin(AutoIncrement, { inc_field: "bill_no" });

billingSchema.virtual("prefix_bill_no").get(function () {
  return "INV00" + this.bill_no.toString();
});

billingSchema.virtual("transactions", {
  ref: "Transaction",
  localField: "_id",
  foreignField: "billing",
  justOne: false,
});

billingSchema.virtual("paidAmount", {
  ref: "Transaction",
  localField: "_id",
  foreignField: "billing",
  justOne: false,
  options: { sort: { created_at: -1 } }, // Assuming createdAt is a field in the Transaction schema
  get: function () {
    if (this.transactions && this.transactions.length > 0) {
      return this.transactions.reduce(
        (total, transaction) => total + transaction.amount,
        0
      );
    }
    return 0;
  },
});

billingSchema.virtual("balanceAmount").get(function () {
  if (this.paidAmount) {
    return (this.grand_total - this.paidAmount).toFixed(3);
  }
  return this.grand_total;
});

billingSchema.virtual("payment_status").get(function () {
  if (this.paidAmount >= this.grand_total) {
    return "paid";
  } else if (this.paidAmount > 0) {
    return "partially_paid";
  } else {
    return "pending";
  }
});

// billingSchema.virtual()

billingSchema.pre("save", async function (next) {
  try {
    // Iterate through the products in the billing and update the quantity in the Product model
    for (const productItem of this.products) {
      const product = await Product.findById(productItem.product);

      if (!product) {
        throw new Error("Product not found");
      }

      // Update the quantity in the product model
      product.current_quantity -= productItem.sold_quantity;

      // Save the updated product
      await product.save();
    }

    next();
  } catch (error) {
    next(error);
  }
});

// billingSchema.pre("save", function (next) {
//   const grandTotal = this.grand_total;
//   const paidAmount = this.paidAmount;

//   if (paidAmount === 0) {
//     this.payment_status = "pending";
//   } else if (paidAmount < grandTotal) {
//     this.payment_status = "partially_paid";
//   } else {
//     this.payment_status = "paid";
//   }

//   // Continue with the save operation
//   next();
// });

const Billing = mongoose.model("Billing", billingSchema);

export default Billing;
