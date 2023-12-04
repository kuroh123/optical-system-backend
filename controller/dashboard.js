import Billing from "../models/billing.model.js";
import Patient from "../models/patient.model.js";
// import PatientRequest from "../models/eyeDetail.model.js";

export const dashboard = async (req, res) => {
  try {
    const patients = await Patient.find({});
    // const patientRequests = await PatientRequest.find({});
    const bill = await Billing.find({});
    let total_revenue = 0;
    let total_vat = 0;
    let total_balance = 0;
    for (let i = 0; i < bill.length; i++) {
      total_revenue += bill[i].paid_amount;
      total_vat += bill[i].vat;
      total_balance += bill[i].balance_amount;
    }

    res.status(200).json({
      patients: patients.length,
      // patientRequests: patientRequests.length,
      bill: bill.length,
      total_revenue,
      total_vat,
      total_balance,
    });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
