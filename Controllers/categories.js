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
  res.status(200).json({ total, categories });
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id).populate("user", "name");
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createCategory = async (req, res) => {
  const name = req.body.name.toUpperCase();
  try {
    const categoryDB = await Category.findOne({ name });
    if (categoryDB) {
      return res
        .status(400)
        .json({ msg: `La categoria ${categoryDB.name} ya exixste` });
    }
    const data = {
      name,
      user: req.user_id,
    };

    const category = new Category(data);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, data);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id, {
      status: false,
    });
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  allCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
