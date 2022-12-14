const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const dbConfig = require('./config/dbConfig');

const userRoute = require('./routes/userRoute');
app.use('/api/users', userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server starting on port ' + PORT);
});
