import Billing from "../models/billing.model.js";

export const fetchBillings = async (req, res) => {
  const startDate = req.query.startDate.split(" ");
  const endDate = req.query.endDate.split(" ");
  try {
    const billings = await Billing.find({
      created_at: {
        $gte: startDate[0],
        $lte: endDate[0],
      },
    }).populate({
      path: "patient",
    });
    res.status(200).json(billings);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const createBilling = async (req, res) => {
  const newBilling = new Billing({ ...req.body });
  try {
    await newBilling.save();
    if (newBilling.paid_amount === 0) {
      newBilling.payment_status = "pending";
    } else if (newBilling.paid_amount < newBilling.total_amount) {
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
    } else if (updatedBilling.paid_amount < updatedBilling.total_amount) {
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
