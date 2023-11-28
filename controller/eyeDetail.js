import EyeDetail from "../models/eyeDetail.model.js";

export const eyeDetails = async (req, res) => {
  const patient = req.query.patient;
  try {
    const eyeDetails = await EyeDetail.find({
      patient: patient,
    }).populate({
      path: "patient",
    });
    res.status(200).json(eyeDetails);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const createEyeDetail = async (req, res) => {
  const newEyeDetail = new EyeDetail({ ...req.body });
  try {
    await newEyeDetail.save();
    if (newEyeDetail) {
      newEyeDetail.patient = req.body.patient;
      // Right eye details
      newEyeDetail.right_eye.spherical = req.body.r_sph;
      newEyeDetail.right_eye.cylindrical = req.body.r_cyl;
      newEyeDetail.right_eye.axis = req.body.r_axis;
      newEyeDetail.right_eye.add = req.body.r_add;
      newEyeDetail.right_eye.prism = req.body.r_prism;
      newEyeDetail.right_eye.va = req.body.r_va;
      // Left eye details
      newEyeDetail.left_eye.spherical = req.body.l_sph;
      newEyeDetail.left_eye.cylindrical = req.body.l_cyl;
      newEyeDetail.left_eye.axis = req.body.l_axis;
      newEyeDetail.left_eye.add = req.body.l_add;
      newEyeDetail.left_eye.prism = req.body.l_prism;
      newEyeDetail.left_eye.va = req.body.l_va;

      await newEyeDetail.save();
    }
    res.status(201).json(newEyeDetail);
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

export const findEyeDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const foundEyeDetail = await EyeDetail.findById(id).populate(
      "patient_data"
    );
    // await updatedPatient.save();
    res.status(201).json(foundEyeDetail);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const deleteEyeDetail = async (req, res) => {
  const { id } = req.params;
  const eyeDetail = await EyeDetail.findByIdAndDelete(id);
  res.send(true);
};
