const Product = require("../Models/Product");

const allProducts = async (req, res) => {
  const { limit = 5, from = 0 } = req.params;
  const query = { status: true };
  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("category", "name")
      .skip(Number(limit))
      .skip(Number(from))
  ]);
  res.status(200).json({ total, products });
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.status(200).json(product);
};

const createProduct = async (req, res) => {
  const name = req.body.name.toUpperCase();
  const productDB = await Product.findOne({ name });
  if (productDB) {
    res.status(400).json({ msg: `El producto ${productDB} ya existe` });
  }

  const data = {
    name: name.toUpperCase(),
  };

  const product = await Product(data);
  await product.save();
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { status, ...data } = req.body;
  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  const updateProduct = await Product.findByIdAndUpdate(id, data);
  res.status(200).json(updateProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id, { status: false });
  res.status(200).json(deletedProduct);
};

module.exports = {
  allProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
