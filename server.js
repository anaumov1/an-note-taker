const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmalRoutes');

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;
