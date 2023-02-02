const Category = require('../models/categoryModel');
const Exam = require('../models/examModel');
module.exports.add = async (req, res) => {
  try {
    const categoryExists = await Category.findOne({ name: req.body.name });
    if (categoryExists) {
      return res.status(200).send({
        message: 'Category name existed!',
        success: false,
      });
    }

    const newCategory = new Category(req.body);
    await newCategory.save();

    return res.send({
      message: 'Category created successfully',
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Category creation failed!',
      data: error,
    });
  }
};

module.exports.get_all_categories = async (req, res) => {
  try {
    const { current = 1, pageSize = 5 } = req.query;
    const catgories = await Category.find({})
      // We multiply the "limit" variables by one just to make sure we pass a number and not a string
      .limit(pageSize * 1)
      // I don't think i need to explain the math here
      .skip((current - 1) * pageSize)
      // We sort the data by the date of their creation in descending order (user 1 instead of -1 to get ascending order)
      .sort({ createdAt: -1 });
    // Getting the numbers of products stored in database
    const count = await Category.countDocuments();

    return res.send({
      message: 'Fetch all categories',
      data: catgories,
      success: true,
      total: count, //Math.ceil(count / pageSize),
      currentPage: current,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

module.exports.get_category_by_id = async (req, res) => {
  try {
    const category = await Category.findById(req.body.categoryId);

    return res.send({
      message: 'Fetching category successfully',
      data: category,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

module.exports.edit_category_by_id = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.body.categoryId,
      req.body,
      {
        runValidators: true,
        new: true,
      },
    );

    return res.send({
      message: 'Category edited successfully',
      success: true,
      data: category,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
};

module.exports.delete_category_by_id = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.body.categoryId);
    const exams = await Exam.deleteMany({ category: req.body.categoryId });

    return res.send({
      message: 'Category deleted successfully',
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
};

module.exports.search_category = async (req, res) => {
  try {
    let categories;
    if (req.body.searchTerm) {
      categories = Category.find({
        $text: { $search: req.body.searchTerm },
      });
    } else if (req.body.categoryId) {
      categories = Category.find({ _id: req.body.categoryId });
    } else {
      categories = Category.find({});
    }
    categories.limit(5);
    categories.sort({ createdAt: -1 });
    categories = await categories.populate('exam').exec();
    return res.send({
      message: 'Category search successfully',
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
};
