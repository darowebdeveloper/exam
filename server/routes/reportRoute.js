const Report = require('../models/reportModel');

const router = require('express').Router();

router.post('/add-report', async (req, res) => {
  try {
    const newReport = new Report(req.body);
    await newReport.save();
    res.send({
      message: 'Report added successfully',
      data: newReport,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

router.post('/get-all-reports', async (req, res) => {
  try {
    const reports = await Report.find();
    res.send({
      message: 'Reports fetched successfully',
      data: reports,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      data: error,
      message: error.message,
    });
  }
});

router.post('/get-all-reports-by-user', async (req, res) => {
  try {
    const reports = await Report.find({ user: req.body.userId })
      .populate('exam')
      .populate('user')
      .sort({ createdAt: -1 });
    res.send({
      message: 'Reports fetched successfully',
      data: reports,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      data: error,
      message: error.message,
    });
  }
});

module.exports = router;
