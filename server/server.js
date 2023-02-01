const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const dbConfig = require('./config/dbConfig');

const userRoute = require('./routes/userRoute');
const examRoute = require('./routes/examRoute');
const reportRoute = require('./routes/reportRoute');
const categoryRoute = require('./routes/categoryRoute');

const authMiddleware = require('./middlewares/authMiddleware');
const { notFound } = require('./middlewares/notFoundMiddleware');
const { errorHandlerMiddleware } = require('./middlewares/errorMiddleware');

app.use('/api/v1/users', userRoute);
app.use('/api/v1/exams', authMiddleware, examRoute);
app.use('/api/v1/reports', authMiddleware, reportRoute);
app.use('/api/v1/category', authMiddleware, categoryRoute);

app.use(notFound);
app.use(errorHandlerMiddleware);

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
