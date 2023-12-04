import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;
import AutoIncrementFactory from "mongoose-sequence";
import Billing from "./billing.model.js";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const transactionSchema = new Schema({
  billing: {
    type: Schema.Types.ObjectId,
    ref: "Billing",
  },
  amount: {
    type: Number,
    required: true,
  },
  payment_type: { type: String, enum: ["cash", "visa"] },
  created_at: { type: Date, required: true, default: Date.now },
});

transactionSchema.plugin(AutoIncrement, { inc_field: "transaction_id" });

// transactionSchema.post("save", async function () {
//   const transaction = this;

//   try {
//     // Find the corresponding Billing document
//     const billing = await Billing.findOne({ _id: transaction.billing });

//     if (!billing) {
//       throw new Error("Billing not found");
//     }

//     // Update the paid_amount in Billing based on transactions
//     const totalPaidAmount = await Transaction.aggregate([
//       {
//         $match: { billing: billing._id },
//       },
//       {
//         $group: {
//           _id: null,
//           totalAmount: { $sum: "$amount" },
//         },
//       },
//     ]);

//     billing.paid_amount = totalPaidAmount.length
//       ? totalPaidAmount[0].totalAmount
//       : 0;

//     // Save the updated Billing document
//     await billing.save();
//   } catch (error) {
//     console.error(error);
//   }
// });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
