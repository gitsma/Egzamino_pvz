const dotenv = require('dotenv').config();

const connectDB = require('./config/db');
connectDB();

const express = require('express');
const app = express();

const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/category', require('./routes/categoryRout'))
app.use('/api/ad', require('./routes/adRoutes'))

app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));