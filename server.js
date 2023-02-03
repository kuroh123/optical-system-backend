import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
mongoose.set("strictQuery", true);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to database");
});

import userRoutes from "./routes/users.js";
import patientRoutes from "./routes/patients.js";

app.use("/api/", userRoutes);
app.use("/api/patients", patientRoutes);

app.listen(port, () => {
  console.log(`server is running`);
});
