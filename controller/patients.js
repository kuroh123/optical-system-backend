import moment from "moment/moment.js";
import Patient from "../models/patient.model.js";
import CustomerOrder from "../models/customerOrder.model.js";

export const patients = async (req, res) => {
  let { page, perPage } = req.query;
  page = parseInt(page) || 1;
  perPage = parseInt(perPage) || 10;
  try {
    const patients = await Patient.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ created_at: -1 })
      .exec();
    const totalRows = await Patient.countDocuments();
    res.status(200).json({ patients, totalRows });
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

export const customerOrders = async (req, res) => {
  try {
    const customerOrders = await CustomerOrder.find()
      .populate("billing")
      .sort({ created_at: -1 })
      .exec();
    res.status(200).json(customerOrders);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const fetchCustomerOrder = async (req, res) => {
  const fetchedCustomerOrder = await CustomerOrder.findById(req.params.id);
  try {
    if (fetchedCustomerOrder) {
      res.status(200).json(fetchedCustomerOrder);
    }
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const updateCustomerOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedCustomerOrder = await CustomerOrder.findByIdAndUpdate(id, {
      ...req.body,
    });
    res.status(201).json(updatedCustomerOrder);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};
