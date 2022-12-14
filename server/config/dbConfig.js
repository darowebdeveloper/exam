const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('Mongo db connected successfully!');
});

connection.on('error', () => {
  console.log('Mongo db connected failed!');
});

module.exports = connection;
