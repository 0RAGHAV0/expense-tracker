const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: 'expense-db.csjy8kesyd45.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'password', // 🔥 Replace with your actual password
  database: 'expense_db'
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error('❌ DB connection failed:', err);
  } else {
    console.log('✅ Connected to RDS MySQL');
  }
});

// Root route (for browser check)
app.get('/', (req, res) => {
  res.send('🚀 Expense Tracker API is running');
});

// Add expense
app.post('/add', (req, res) => {
  const { title, amount } = req.body;

  if (!title || !amount) {
    return res.status(400).send('Title and amount are required');
  }

  const sql = 'INSERT INTO expenses (title, amount) VALUES (?, ?)';

  db.query(sql, [title, amount], (err, result) => {
    if (err) {
      console.error('❌ Insert error:', err);
      return res.status(500).send('Database error');
    }
    res.send('✅ Expense added successfully');
  });
});

// Get all expenses
app.get('/expenses', (req, res) => {
  db.query('SELECT * FROM expenses', (err, results) => {
    if (err) {
      console.error('❌ Fetch error:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
})
