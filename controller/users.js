import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const users = async (req, res) => {
  try {
    const users = await User.find({}).populate({
      path: "location",
    });
    res.status(200).json(users);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const register = async (req, res) => {
  const { name, email, password, isAdmin, location } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPass,
      isAdmin,
      location,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const fetchUser = async (req, res) => {
  const fetchedUser = await User.findById(req.params.id);
  try {
    if (fetchUser) {
      res.status(200).json(fetchedUser);
    }
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, location } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      name,
      email,
      location,
    });
    res.status(201).json(updatedUser);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user.isAdmin) {
    await User.deleteOne(user);
    res.send(true);
  } else {
    res.status(401).json({ message: "Not Authorized" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ email: username }).populate("location");
    if (user) {
      const authenticated = await bcrypt.compare(password, user.password);
      if (authenticated) {
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
          },
          "authenticatingopticalsystem",
          { expiresIn: "24h" }
        );
        res.status(200).json({ message: "Login successful", user, token });
      } else {
        res.status(400).json({ message: "Wrong Username or Password" });
      }
    } else {
      res.status(400).json({ message: "User does not exist" });
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
