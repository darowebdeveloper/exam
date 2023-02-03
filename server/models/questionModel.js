const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Uploaded',
    },
    upload: {
      type: Object,
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
