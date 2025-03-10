import Billing from "../models/billing.model.js";
import Patient from "../models/patient.model.js";

// import PatientRequest from "../models/eyeDetail.model.js";

function parseDate(dateStr, setEndOfDay = false) {
  const [day, month, year] = dateStr.split("-").map(Number);
  if (setEndOfDay) {
    return new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));
  }
  return new Date(Date.UTC(year, month - 1, day));
}

export const dashboard = async (req, res) => {
  // const { from, to } = req.body;
  // const fromDate = parseDate(from);
  // const toDate = parseDate(to, true);
  const { location } = req.query;

  try {
    const patients = await Patient.find({
      // created_at: {
      //   $gte: fromDate,
      //   $lte: toDate,
      // },
    });

    // const billings = await Billing.find({
    //   created_at: {
    //     $gte: fromDate,
    //     $lte: toDate,
    //   },
    // });
    // const patientRequests = await PatientRequest.find({});
    const bill = await Billing.find({ location: location })
      .populate("transactions")
      .exec();
    let total_revenue = 0;
    let total_vat = 0;
    let total_balance = 0;

    for (let i = 0; i < bill.length; i++) {
      total_revenue += bill[i].paidAmount;
      total_vat += bill[i].vat;
      total_balance += parseInt(bill[i].balanceAmount);
    }

    res.status(200).json({
      patients: patients.length,
      // patientRequests: patientRequests.length,
      bill: bill.length,
      total_revenue: total_revenue.toFixed(3),
      total_vat,
      total_balance: total_balance.toFixed(3),
    });
    // res.status(200).json(patients);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
