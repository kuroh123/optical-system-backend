import Billing from "../models/billing.model.js";

export const fetchbilling = async (req, res) => {
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
  console.log(req.body);
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

// export const fetchPatient = async (req, res) => {
//   const fetchedPatient = await Patient.findById(req.params.id);
//   try {
//     if (fetchedPatient) {
//       res.status(200).json(fetchedPatient);
//     }
//   } catch (e) {
//     res.status(409).json({ message: e.message });
//   }
// };

export const findPatientReq = async (req, res) => {
  const { id } = req.params;

  try {
    const foundReq = await PatientRequest.findById(id).populate("patient_data");
    // await updatedPatient.save();
    res.status(201).json(foundReq);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const deleteBilling = async (req, res) => {
  const { id } = req.params;
  const patient = await Billing.findByIdAndDelete(id);
  res.send(true);
};
