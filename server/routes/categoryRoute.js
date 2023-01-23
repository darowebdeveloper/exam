const router = require('express').Router();

const Category = require('../models/categoryModel');

router.post('/add', async (req, res) => {
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
});

router.get('/get-all-categories', async (req, res) => {
  try {
    const catgories = await Category.find({});

    return res.send({
      message: 'Fetch all categories',
      data: catgories,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      data: error,
    });
  }
});

router.post('/get-category-by-id', async (req, res) => {
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
});

router.post('/edit-category-by-id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.body.categoryId,
      req.body
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
});

router.post('/delete-category-by-id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.body.categoryId);

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
});

module.exports = router;
