import Billing from "../models/billing.model.js";
import Patient from "../models/patient.model.js";
import Product from "../models/product.model.js";

export const fetchBillings = async (req, res) => {
  const startDate = req.query.startDate.split(" ");
  const endDate = req.query.endDate.split(" ");
  try {
    const billings = await Billing.find({
      created_at: {
        $gte: startDate[0],
        $lte: endDate[0],
      },
    })
      .populate("patient")
      .populate("product_details.product");
    res.status(200).json(billings);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const createBilling = async (req, res) => {
  // console.log(req.body);
  const newBilling = new Billing({ ...req.body });
  try {
    await newBilling.save();
    if (newBilling.paid_amount === 0) {
      newBilling.payment_status = "pending";
    } else if (newBilling.paid_amount < newBilling.grand_total) {
      newBilling.payment_status = "partially_paid";
    } else {
      newBilling.payment_status = "paid";
    }
    await newBilling.save();
    res.status(201).json(newBilling);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const createDirectBilling = async (req, res) => {
  // console.log(req.body);
  const newPatient = new Patient({ ...req.body.patientData });
  try {
    const savedPatient = await newPatient.save();
    const newBilling = new Billing({
      ...req.body.billData,
      patient: savedPatient._id,
    });

    await newBilling.save();
    for (const elem of newBilling.product_details) {
      console.log(elem);
      const existingProduct = await Product.findOne({ _id: elem.product });
      console.log(existingProduct);
      const currentQuantity =
        existingProduct.current_quantity - elem.sold_quantity;
      await Product.updateOne(
        { _id: elem.product },
        { current_quantity: currentQuantity }
      );
    }
    if (newBilling.paid_amount === 0) {
      newBilling.payment_status = "pending";
    } else if (newBilling.paid_amount < newBilling.grand_total) {
      newBilling.payment_status = "partially_paid";
    } else {
      newBilling.payment_status = "paid";
    }
    await newBilling.save();
    res.status(201).json(newBilling);
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

export const updateBilling = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBilling = await Billing.findByIdAndUpdate(id, { ...req.body });
    // await updatedPatient.save();
    if (updatedBilling.paid_amount === 0) {
      updatedBilling.payment_status = "pending";
    } else if (updatedBilling.paid_amount < updatedBilling.grand_total) {
      updatedBilling.payment_status = "partially_paid";
    } else {
      updatedBilling.payment_status = "paid";
    }
    await updatedBilling.save();
    res.status(201).json(updatedBilling);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const deleteBilling = async (req, res) => {
  const { id } = req.params;
  const patient = await Billing.findByIdAndDelete(id);
  res.send(true);
};
