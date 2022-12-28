const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'exam',
    },
    result: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true },
);

const Report = mongoose.model('report', reportSchema);

module.exports = Report;
