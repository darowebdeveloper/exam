const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const dbConfig = require('./config/dbConfig');

const userRoute = require('./routes/userRoute');
const examRoute = require('./routes/examRoute');
const reportRoute = require('./routes/reportRoute');

const authMiddleware = require('./middlewares/authMiddleware');
app.use('/api/users', userRoute);
app.use('/api/exams', authMiddleware, examRoute);
app.use('/api/reports', authMiddleware, reportRoute);

const PORT = process.env.PORT || 5000;

__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log('Server starting on port ' + PORT);
});
