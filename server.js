const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios'); // You'll need to install the axios package

// Serve the static files (HTML, CSS, JS) from the current directory
app.use(express.static(__dirname));

// Define a route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Define a route to handle webhook data
app.post('/webhook', (req, res) => {
  const webhookData = req.body; // Assuming the data is sent as JSON in the request body

  // You can modify the URL to your Google Apps Script web app
  const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbxHNDfr4X5qs-mQiYoeDw_0xjeqv8y9UCLIv2Y1zm0S7hXD86aB0_EDx4wowHwGktnF/exec';

  // Send the data to the Google Apps Script using a POST request
  axios.post(googleAppsScriptUrl, webhookData)
    .then(response => {
      res.status(200).send('Webhook data sent to Google Apps Script');
    })
    .catch(error => {
      console.error('Error sending data to Google Apps Script:', error);
      res.status(500).send('Error sending data to Google Apps Script');
    });
});

// Start the server
const port = process.env.PORT || 3000; // You can use any available port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
