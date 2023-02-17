import PatientRequest from "../models/patientRequest.model.js";

export const patientRequests = async (req, res) => {
  try {
    const patientRequests = await PatientRequest.find({}).populate({
      path: "patient",
    });
    res.status(200).json(patientRequests);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const createPatientRequest = async (req, res) => {
  console.log(req.body);
  const newPatientRequest = new PatientRequest({ ...req.body });
  try {
    await newPatientRequest.save();
    if (newPatientRequest) {
      newPatientRequest.patient = req.body.patient;
      // Right eye details
      newPatientRequest.right_eye.spherical = req.body.r_sph;
      newPatientRequest.right_eye.cylindrical = req.body.r_cyl;
      newPatientRequest.right_eye.axis = req.body.r_axis;
      newPatientRequest.right_eye.add = req.body.r_add;
      newPatientRequest.right_eye.prism = req.body.r_prism;
      newPatientRequest.right_eye.va = req.body.r_va;
      // Left eye details
      newPatientRequest.left_eye.spherical = req.body.l_sph;
      newPatientRequest.left_eye.cylindrical = req.body.l_cyl;
      newPatientRequest.left_eye.axis = req.body.l_axis;
      newPatientRequest.left_eye.add = req.body.l_add;
      newPatientRequest.left_eye.prism = req.body.l_prism;
      newPatientRequest.left_eye.va = req.body.l_va;

      await newPatientRequest.save();
    }
    res.status(201).json(newPatientRequest);
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

export const deletePatientReq = async (req, res) => {
  const { id } = req.params;
  const patient = await PatientRequest.findByIdAndDelete(id);
  res.send(true);
};
