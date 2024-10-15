const express = require('express');
const app = express();
app.disable("x-powered-by");

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World! This is new branch');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});