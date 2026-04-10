const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: 'expense-db.csjy8kesyd45.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'YOUR_PASSWORD',
  database: 'expense_db'
});

db.connect((err) => {
  if (err) {
    console.log('DB connection failed:', err);
  } else {
    console.log('Connected to RDS MySQL ✅');
  }
});

// API to add expense
app.post('/add', (req, res) => {
  const { title, amount } = req.body;

  const sql = 'INSERT INTO expenses (title, amount) VALUES (?, ?)';
  db.query(sql, [title, amount], (err, result) => {
    if (err) return res.send(err);
    res.send('Expense added');
  });
});

// API to get expenses
app.get('/expenses', (req, res) => {
  db.query('SELECT * FROM expenses', (err, results) => {
    if (err) return res.send(err);
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
// const express = require('express');
// const app = express();
// const cors = require('cors');

// app.use(cors());
// app.use(express.json());

// app.get('/api/health', (req, res) => {
//   res.send('API is working');
// });

// let expenses = [];

// app.post('/api/expenses', (req, res) => {
//   const { title, amount } = req.body;
//   const newExpense = { id: Date.now(), title, amount };
//   expenses.push(newExpense);
//   res.json(newExpense);
// });

// app.get('/api/expenses', (req, res) => {
//   res.json(expenses);
// });

// app.delete('/api/expenses/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   expenses = expenses.filter(exp => exp.id !== id);
//   res.send('Deleted');
// });

// app.listen(3000, '0.0.0.0', () => {
//   console.log('Server running on port 3000');
// });