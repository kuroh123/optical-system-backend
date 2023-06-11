import Location from "../models/location.model.js";
import User from "../models/user.model.js";

export const locations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).json(locations);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const userLocationMap = async (req, res) => {
  try {
    const { location } = req.query;
    const foundLocation = await Location.findById(location);
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, {
      location: foundLocation._id,
    });
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
