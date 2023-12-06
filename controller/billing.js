import Billing from "../models/billing.model.js";
import CustomerOrder from "../models/customerOrder.model.js";
import Patient from "../models/patient.model.js";
import Product from "../models/product.model.js";
import Transaction from "../models/transactions.model.js";

export const fetchBillings = async (req, res) => {
  const { location } = req.query;

  try {
    const billings = await Billing.find({ location })
      .populate("patient")
      .populate("products.product")
      .populate("customer_orders")
      .populate("transactions")
      .sort({ created_at: -1 })
      .exec();
    res.json(billings);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

// export const createBilling = async (req, res) => {
//   // console.log(req.body);
//   const newBilling = new Billing({ ...req.body });
//   try {
//     await newBilling.save();
//     if (newBilling.paid_amount === 0) {
//       newBilling.payment_status = "pending";
//     } else if (newBilling.paid_amount < newBilling.grand_total) {
//       newBilling.payment_status = "partially_paid";
//     } else {
//       newBilling.payment_status = "paid";
//     }
//     await newBilling.save();
//     res.status(201).json(newBilling);
//   } catch (e) {
//     res.status(409).json({ message: e.message });
//   }
// };

export const createDirectBilling = async (req, res) => {
  const { location } = req.query;
  const { billingData } = req.body;
  const { patientDetails } = req.body;
  const products = billingData.items.filter((item) => item.type === "PRODUCT");
  const services = billingData.items.filter((item) => item.type === "SERVICE");
  const customerOrders = billingData.items.filter(
    (item) => item.type === "CUSTOMER_ORDER"
  );
  const savedCustomerOrderIds = [];

  try {
    let patient;
    if (patientDetails?._id) {
      patient = patientDetails;
    } else {
      const newPatient = new Patient({ ...patientDetails });
      patient = await newPatient.save();
    }
    const newBilling = new Billing({
      patient: patient._id,
      products,
      services,
      total_amount: billingData.total_amount,
      vat: billingData.vat,
      discount: billingData.discount,
      grand_total: billingData.grand_total,
      location,
    });

    const savedBilling = await newBilling.save();

    for (let order of customerOrders) {
      const createdOrder = new CustomerOrder({
        ...order,
        billing: savedBilling._id,
      });
      const savedOrder = await createdOrder.save();
      savedCustomerOrderIds.push(savedOrder._id);
    }

    // savedBilling.customer_orders = savedCustomerOrderIds;
    await savedBilling.updateOne({ customer_orders: savedCustomerOrderIds });
    res.status(201).json(savedBilling);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const fetchBilling = async (req, res) => {
  const fetchedBilling = await Billing.findById(req.params.id);
  try {
    if (fetchedBilling) {
      res.status(200).json(fetchedBilling);
    }
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

// export const updateBilling = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const updatedBilling = await Billing.findByIdAndUpdate(id, { ...req.body });
//     // await updatedPatient.save();
//     if (updatedBilling.paid_amount === 0) {
//       updatedBilling.payment_status = "pending";
//     } else if (updatedBilling.paid_amount < updatedBilling.grand_total) {
//       updatedBilling.payment_status = "partially_paid";
//     } else {
//       updatedBilling.payment_status = "paid";
//     }
//     await updatedBilling.save();
//     res.status(201).json(updatedBilling);
//   } catch (e) {
//     res.status(409).json({ message: e.message });
//   }
// };

export const deleteBilling = async (req, res) => {
  const { id } = req.params;
  const patient = await Billing.findByIdAndDelete(id);
  res.send(true);
};

export const fetchTransactions = async (req, res) => {
  const { billing } = req.query;
  try {
    const transactions = await Transaction.find({ billing: billing })
      .populate("billing")
      .sort({ created_at: -1 })
      .exec();
    res.json(transactions);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const createTransaction = async (req, res) => {
  const newTransaction = new Transaction({ ...req.body });
  try {
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const transaction = await Transaction.findByIdAndDelete(id);
  res.send(true);
};
