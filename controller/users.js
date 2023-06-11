import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const users = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPass });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({ message: e.message });
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
