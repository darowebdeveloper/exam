const router = require('express').Router();
const Question = require('../models/questionModel');
const Exam = require('../models/examModel');
const Category = require('../models/categoryModel');

router.post('/add', async (req, res) => {
  try {
    const categoryExists = await Category.findOne({
      _id: req.body.category,
    });
    if (!categoryExists) {
      return res.status(200).send({
        message: 'Category not exists!',
        success: false,
      });
    }
    req.body.questions = [];
    const newExam = new Exam(req.body);
    categoryExists.exam.push(newExam);
    await categoryExists.save();
    await newExam.save();
    return res.send({
      message: 'Exam created successfully',
      success: true,
      data: newExam,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Exam creation failed!',
      data: error,
    });
  }
});

router.post('/get-all-exams-in-category', async (req, res) => {
  try {
    const exams = await Exam.find({ category: req.body.categoryId }).populate(
      'category',
    );

    return res.send({
      message: 'Fetch all exams in a category',
      data: exams,
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

router.post('/get-exam-by-id', async (req, res) => {
  try {
    const exam = await Exam.findById(req.body.examId).populate('questions');
    return res.send({
      message: 'Fetching the exam successfully',
      data: exam,
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

router.post('/edit-exam-by-id', async (req, res) => {
  try {
    await Exam.findByIdAndUpdate(req.body.examId, req.body);
    return res.send({
      message: 'Exam edited successfully',
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

router.post('/delete-exam-by-id', async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.body.examId);
    await Question.deleteMany({ exam: req.body.examId });
    const category = await Category.find({ exam: req.body.examId });
    if (category[0]) {
      category[0].exam = category[0].exam.filter(
        (exam) => exam._id != req.body.examId,
      );
      await category[0].save();
    }
    return res.send({
      message: 'Exam deleted successfully',
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
