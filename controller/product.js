import moment from "moment/moment.js";
import Product from "../models/product.model.js";

export const products = async (req, res) => {
  const startDate = req.query.startDate?.split(" ");
  const endDate = req.query.endDate?.split(" ");
  try {
    const products = await Product.find({
      // created_at: {
      //   $gte: startDate[0],
      //   $lte: endDate[0],
      // },
    });
    res.status(200).json(products);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const createProduct = async (req, res) => {
  const newProduct = new Product({ ...req.body });
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const fetchProduct = async (req, res) => {
  const fetchedProduct = await Product.findById(req.params.id);
  try {
    if (fetchedProduct) {
      res.status(200).json(fetchedProduct);
    }
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, { ...req.body });
    res.status(201).json(updatedProduct);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  await Product.deleteOne(product);
  res.send(true);
};
