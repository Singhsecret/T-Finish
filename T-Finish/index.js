//structure of our Express.js server in index.js-

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'code_snippets_db'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/submit', (req, res) => {
  const { username, language, stdin, sourceCode } = req.body;
  // Insert code snippet into database
  const sql = `INSERT INTO code_snippets (username, language, stdin, source_code) VALUES (?, ?, ?, ?)`;
  db.query(sql, [username, language, stdin, sourceCode], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error submitting code snippet' });
      throw err;
    }
    res.status(200).json({ message: 'Code snippet submitted successfully' });
  });
});

app.get('/snippets', (req, res) => {
  // Fetch all code snippets from database
  const sql = `SELECT username, language, stdin, LEFT(source_code, 100) as source_code_preview, timestamp FROM code_snippets`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching code snippets' });
      throw err;
    }
    res.status(200).json(result);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
