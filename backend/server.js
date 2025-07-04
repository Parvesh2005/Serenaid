require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./db/connect');
const admins = require('./routes/admins');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/admin', admins);

const port = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
};

start();