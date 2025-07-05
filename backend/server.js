require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./db/connect');
const admins = require('./routes/admins');
const doctors = require('./routes/doctors');
const nurses = require('./routes/nurses');
const patients = require('./routes/patients');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/admins', admins);
app.use('/api/v1/doctors', doctors);
app.use('/api/v1/nurses', nurses);
app.use('/api/v1/patients', patients);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () =>
      console.log(`Server running on port ${port}`)
    );
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};

start();