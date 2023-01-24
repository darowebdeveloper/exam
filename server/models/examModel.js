const mongoose = require('mongoose');

const examSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    category: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'category',
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    passingMarks: {
      type: Number,
      required: true,
    },
    questions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'question',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Exam = mongoose.model('exam', examSchema);

module.exports = Exam;
