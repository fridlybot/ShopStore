const express = require('express');
const app = express();
const path = require('path');

// Serve the static files (HTML, CSS, JS) from the current directory
app.use(express.static(__dirname));

// Define a route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000; // You can use any available port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
