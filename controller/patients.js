import Patient from "../models/patient.model.js";

export const patients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).json(patients);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const createPatient = async (req, res) => {
  const {
    first_name,
    last_name,
    mobile,
    address,
    age,
    gender,
    examined_by,
    dob,
  } = req.body;
  const newPatient = new Patient({
    first_name,
    last_name,
    mobile,
    address,
    examined_by,
    dob,
    age,
    gender,
  });
  try {
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};
