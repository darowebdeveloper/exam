const router = require('express').Router();
const Question = require('../models/questionModel');
const Exam = require('../models/examModel');

router.post('/add', async (req, res) => {
  try {
    const examExists = await Exam.findOne({ name: req.body.name });
    if (examExists) {
      return res.status(200).send({
        message: 'Exam name existed!',
        success: false,
      });
    }
    req.body.questions = [];
    const newExam = new Exam(req.body);
    await newExam.save();
    return res.send({
      message: 'Exam created successfully',
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Exam creation failed!',
      data: error,
    });
  }
});

router.post('/get-all-exams', async (req, res) => {
  try {
    const exams = await Exam.find({});
    return res.send({
      message: 'Fetch all exams',
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

router.post('/add-question-to-exam', async (req, res) => {
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

router.post('/edit-question-in-exam', async (req, res) => {
  try {
    const quesiton = await Question.findByIdAndUpdate(
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

router.post('/delete-question-in-exam', async (req, res) => {
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
