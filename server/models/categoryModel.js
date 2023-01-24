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
categorySchema.index({ name: 'text' });

const Category = mongoose.model('category', categorySchema);
Category.ensureIndexes();

module.exports = Category;
