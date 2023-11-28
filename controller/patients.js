import moment from "moment/moment.js";
import Patient from "../models/patient.model.js";

export const patients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ created_at: -1 }).exec();
    res.status(200).json(patients);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const createPatient = async (req, res) => {
  const newPatient = new Patient({ ...req.body });
  try {
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const fetchPatient = async (req, res) => {
  const fetchedPatient = await Patient.findById(req.params.id);
  try {
    if (fetchedPatient) {
      res.status(200).json(fetchedPatient);
    }
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const updatePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(id, { ...req.body });
    // await updatedPatient.save();
    res.status(201).json(updatedPatient);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const deletePatient = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);
  await Patient.deleteOne(patient);
  // const patient = await Patient.remove(id);
  res.send(true);
};
