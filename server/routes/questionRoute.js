const router = require('express').Router();
const Question = require('../models/questionModel');
const Exam = require('../models/examModel');
const Category = require('../models/categoryModel');

router.post('/questions/get-questions-in-exam', async (req, res) => {
  try {
    const exam = await Question.find({ exam: req.body.examId }).populate(
      'exam',
    );

    return res.send({
      message: 'Question added successfully',
      success: true,
      data: exam,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
      data: error,
    });
  }
});
router.post('/questions/add-question-to-exam', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    const question = await newQuestion.save();

    const exam = await Exam.findById(req.body.exam);
    exam.questions.push(question._id);
    await exam.save();
    return res.send({
      message: 'Question added successfully',
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
      data: error,
    });
  }
});
router.post('/questions/get-question-by-id', async (req, res) => {
  try {
    const question = await Question.findById(req.body.questionId);
    return res.send({
      message: 'Question fetched successfully',
      success: true,
      data: question,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
      data: error,
    });
  }
});

router.post('/questions/edit-question-by-id', async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.body.questionId,
      req.body,
    );
    return res.send({
      message: 'Question edited successfully',
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
      data: error,
    });
  }
});

router.post('/questions/delete-question-in-exam', async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.body.questionId);
    const exam = await Exam.findById(req.body.examId);
    exam.questions = exam.questions.filter(
      (question) => question._id != req.body.questionId,
    );
    await exam.save();
    return res.send({
      message: 'Question deleted successfully',
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
      data: error,
    });
  }
});

module.exports = router;
