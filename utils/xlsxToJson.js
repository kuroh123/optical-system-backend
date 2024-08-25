import mongoose from "mongoose";
import xlsx from "xlsx";
import Patient from "../models/patient.model.js";
import EyeDetail from "../models/eyeDetail.model.js";
import Billing from "../models/billing.model.js";
import Transaction from "../models/transactions.model.js";
import Product from "../models/product.model.js";
const uri = "mongodb+srv://obaid_7860:7oWhXc4DQomEwu7v@optical-management.l1pmgpi.mongodb.net/?retryWrites=true&w=majority&appName=optical-management";
// const uri = 'mongodb://localhost:27017'
mongoose.connect(uri, { useNewUrlParser: true, dbName: "optical-system" });
mongoose.set("strictQuery", true);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to database");
});

// Function to convert Excel data to JSON format for MongoDB
const saveToModels = async (filePath) => {
  // Read the Excel file
  console.log("inside func")
  const workbook = xlsx.readFile(filePath);

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convert the sheet to JSON format
  console.log("file read!")
  const data = xlsx.utils.sheet_to_json(sheet, { raw: false,  range: "A1:Z20" });
  console.log("converted to json")

  // Transform the data to the desired JSON structure
  for (const row of data) {
    // const frame_price = parseFloat(row["frame_price"]);
    // const lens_price = parseFloat(row["lens_price"]);

    const [day, month, year] = row["purchase_date"]
      .trim()
      .replace("'", "")
      .split("/");
    const dateObject = new Date(`${year}-${month}-${day}`);
    console.log(dateObject);
    console.log(row["name"], row["GSM"]);

    const patientData = {
      first_name: row["name"],
      created_at: dateObject,
      mobile: row["GSM"],
    };

    const newPatient = new Patient(patientData);
    try {
      const patient = await newPatient.save();
      const eyeData = {
        patient: patient._id,
        right_eye: {
          spherical: row["sph_1"],
          cylindrical: row["cyc_1"],
          axis: row["axis_1"],
          add: row["add_1"],
        },
        left_eye: {
          spherical: row["sph_2"],
          cylindrical: row["cyl_2"],
          axis: row["axis_2"],
          add: row["add_2"],
        },
        created_at: dateObject,
      };
      const newEyeDetail = new EyeDetail(eyeData);
      await newEyeDetail.save();
      let productIds = [];
      if (row["frame"]) {
        const productData = {
          product_name: row["frame"],
          // selling_price: parseFloat(row["frame_price"]),
          selling_price: 0,
          product_category: "frame",
          ordered_quantity: 1,
          location: "65635fe94175374ba69ba9e4",
          created_at: dateObject,
        };
        const newProduct = new Product(productData);
        const product = await newProduct.save();
        productIds.push(product._id);
      }
      if (row["lens_type"]) {
        const productData = {
          product_name: row["lens_type"],
          selling_price: parseFloat(row["amount"]),
          product_category: "lens",
          ordered_quantity: 1,
          location: "65635fe94175374ba69ba9e4",
          created_at: dateObject,
        };
        const newProduct = new Product(productData);
        const product = await newProduct.save();
        productIds.push(product._id);
      }

      const productsData = productIds.map((productId) => ({
        product: productId,
        sold_quantity: 1, // Default value for sold_quantity
        vat_applicable: false, // Default value for vat_applicable
      }));

      const billingData = {
        file_no: row["order_no"],
        patient: patient._id,
        products: productsData,
        total_amount:
          parseFloat(row["amount"]),
        grand_total:
          parseFloat(row["amount"]),
        location: "65635fe94175374ba69ba9e4",
        created_at: dateObject,
      };
      const newBilling = new Billing(billingData);
      const billing = await newBilling.save();

      const transactionData = {
        billing: billing._id,
        payment_type: "cash",
        amount: parseFloat(row["amount"]),
        created_at: dateObject,
      };
      const newTransaction = new Transaction(transactionData);
      await newTransaction.save();
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};

// Example usage
const filePath =
  "/home/obaid031/Projects/optical-system/optical-system-backend/utils/full_main.xlsx";
// const filePath =
//   "/home/obaid031/Projects/optical-system/optical-system-backend/utils/less_data.xlsx";
saveToModels(filePath);

// Write the JSON data to a file (optional)
// fs.writeFileSync('output.json', JSON.stringify(jsonData, null, 2), 'utf-8');

// Print the JSON data
// console.log(JSON.stringify(jsonData, null, 2));
