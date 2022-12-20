const router = require('express').Router();
const Exam = require('../models/examModel');
const authMiddlewre = require('../middlewares/authMiddleware');

router.post('/add', authMiddlewre, async (req, res) => {
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

router.post('/get-all-exams', authMiddlewre, async (req, res) => {
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

router.post('/get-exam-by-id', authMiddlewre, async (req, res) => {
  try {
    const exam = await Exam.findById(req.body.examId);
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
module.exports = router;
