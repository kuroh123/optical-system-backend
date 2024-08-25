import Billing from "../models/billing.model.js";
import Patient from "../models/patient.model.js";

// import PatientRequest from "../models/eyeDetail.model.js";

function parseDate(dateStr, setEndOfDay = false) {
  const [day, month, year] = dateStr.split('-').map(Number);
  if (setEndOfDay) {
      return new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));
  }
  return new Date(Date.UTC(year, month - 1, day));
}

export const dashboard = async (req, res) => {
  const {from, to} = req.body
  const fromDate = parseDate(from)
  const toDate = parseDate(to, true)

  console.log(fromDate, toDate)

  try {
    const patients = await Patient.find({
      created_at: {
        $gte: fromDate,
        $lte: toDate
      }
    });

    const billings = await Billing.find({
      created_at: {
        $gte: fromDate,
        $lte: toDate
      },
      location: req.user.location
    })
  //   // const patientRequests = await PatientRequest.find({});
  //   const bill = await Billing.find({});
  //   let total_revenue = 0;
  //   let total_vat = 0;
  //   let total_balance = 0;
  //   for (let i = 0; i < bill.length; i++) {
  //     total_revenue += bill[i].paid_amount;
  //     total_vat += bill[i].vat;
  //     total_balance += bill[i].balance_amount;
  //   }

  //   res.status(200).json({
  //     patients: patients.length,
  //     // patientRequests: patientRequests.length,
  //     bill: bill.length,
  //     total_revenue,
  //     total_vat,
  //     total_balance,
  //   });
  res.status(200).json(patients)
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
