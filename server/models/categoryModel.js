const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    exam: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'exam',
    },
  },
  {
    timestamps: true,
  },
);

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
