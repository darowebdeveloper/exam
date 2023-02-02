const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    uploaded: {
      type: String,
    },
    oneAnswer: {
      type: Boolean,
      default: false,
    },
    correctOption: {
      type: String,
      required: true,
      default: 'A',
    },
    options: {
      type: Object,
      required: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'exam',
    },
  },
  {
    timestamps: true,
  },
);

const Question = mongoose.model('question', questionSchema);

module.exports = Question;
