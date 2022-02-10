require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();


// Enable HTTP request logging
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
// Upload limit of 5MB
app.use(bodyParser.json({ limit: '5mb' }));

// Enable CORS
app.use(cors());

// CORS pre-flight
app.options('*', cors());

// routes
const routes = require('./routes');

// Database connection
require('./db');

// API endpoints
routes(app, '/');

app.get('/', (req, res) => {
  res.status(200).json('WELCOME TO THE SLACK BOT API');
});

app.get('*', function(req, res) {
  res.status(404).json({ success: false, error: 'Path not found' });
});

// Remove some header info
app.disable('x-powered-by');

// Handle Errors
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};
  const message =
    typeof err.error === 'string' ? err.error : 'An error occurred';
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }
  if (!err.status || err.status >= 500) {
    console.error(err);
  }
  res.status(err.status || 500).json({ success: false, error: message });
});

const port = process.env.PORT;
var host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(port, host, () => {
  console.log(`Listening on port: ${port}`);
});

module.exports = app;
