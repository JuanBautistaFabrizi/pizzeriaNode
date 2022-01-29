const Category = require("../Models/Category");

const allCategories = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate("user", "name")
      .skip(Number(limit))
      .skip(Number(from)),
  ]);
  res.status(200).json({total,categories});
};

const getCategory = async (req, res) => {};
