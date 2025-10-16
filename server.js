const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));

// DB connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root', // change this
  database: 'hostel_box'
});

// show form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// save complaint
app.post('/submit', async (req, res) => {
  const { name, room_no, complaint } = req.body;
  await pool.query('INSERT INTO complaints (name, room_no, complaint) VALUES (?,?,?)',
    [name, room_no, complaint]);
  res.send('<h2>Complaint submitted! <a href="/">Back</a></h2>');
});



app.get('/admin', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM complaints ORDER BY id ASC');

  let html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>All Complaints</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: #f1f2f6;
        margin: 0;
        padding: 20px;
      }

      h1 {
        text-align: center;
        color: #2d3436;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }

      th, td {
        padding: 12px 44px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }

      th {
        background: #0984e3;
        color: white;
        text-transform: uppercase;
        font-size: 14px;
      }

      tr:hover {
        background: #f1f9ff;
      }

      td {
        font-size: 14px;
        color: #2d3436;
      }

      .no-data {
        text-align: center;
        padding: 20px;
        font-size: 16px;
        color: #636e72;
      }
      .d{
      width:23%;
      text-align:center;
      padding:23px;
      font-size:20px;
      }
    </style>
  </head>
  <body>
    <h1>All Complaints</h1>
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Room</th>
        <th>Complaint</th>
        <th class="d">date</th>
      </tr>`;

  if (rows.length === 0) {
    html += `<tr><td colspan="5" class="no-data">No complaints found</td></tr>`;
  } else {
    rows.forEach(r => {
      html += `<tr>
        <td>${r.id}</td>
        <td>${r.name}</td>
        <td>${r.room_no}</td>
        <td>${r.complaint}</td>
        <td class="date">${r.date}</td>
      </tr>`;
    });
  }

  html += `
    </table>
  </body>
  </html>`;

  res.send(html);
});


app.listen(5000, () => console.log("Running at http://localhost:5000"));
