const express = require('express');
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World! This is new branch! I have added a new tag!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});