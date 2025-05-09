//import path from "path";
//import { fileURLToPath } from "url";

import dotenv from 'dotenv'
dotenv.config();

import cors from 'cors';

import { InferenceClient } from "@huggingface/inference";
const client = new InferenceClient(process.env.HG_API);

import express from "express"
const app = express();
const port = process.env.PORT || 8080;

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
//app.use(express.static(path.join(__dirname, "public")));

app.post("/query", async (req, res) => {
  //res.send("Hello, server is working!");

  let table = req.body.table;
  let columnNames = req.body.column;
  let userInput = req.body.query;

  const chatCompletion = await client.chatCompletion({
    provider: "novita",
    model : "meta-llama/Llama-3.1-8B-Instruct",
    messages: [
      { 
        role: 'system', 
        content: 'Only respond with SQL code that represents the input text. Do not include any explanations, comments, or additional information. Return a complete SQL statement or query that matches the users request as accurately as possible. You will have table and column names in input from user.' 
      },
      {
        role: "user",
        content: `${userInput}, THIS IS TABLE NAME: ${table} AND THESE ARE THE COLUMN NAMES: ${columnNames}, DONT USE ANYTHING ELSE.`,
      },
    ],
  });

  const content = chatCompletion.choices[0].message.content;
  res.send(content);
})

app.get("/", (req, res) => {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SQL Generator</title>
  <style>
/* style.css */

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f7fa;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  min-height: 100vh;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2c3e50;
}

input[type="text"] {
  width: 100%;
  max-width: 500px;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 16px;
  transition: border 0.3s ease;
}

input[type="text"]:focus {
  border-color: #3498db;
  outline: none;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

button:hover {
  background-color: #2980b9;
}

pre#result {
  margin-top: 24px;
  width: 100%;
  max-width: 600px;
  background: #ecf0f1;
  padding: 16px;
  border-radius: 8px;
  white-space: pre-wrap;
  word-wrap: break-word;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  font-size: 24px;
}
  </style>
</head>
<body>
  <h1>Text to SQL</h1>
  <input type="text" id="table" placeholder="List tables that you want to use">
  <br>
  <input type="text" id="column" placeholder="List all column that you want to use">
  <br>
  <input type="text" id="query" placeholder="What do you want query to do">
  <button onclick="sendQuery()">Submit</button>
  <pre id="result">SELECT * FROM .......</pre>

  <script>
    async function sendQuery() {
      const table = document.getElementById("table").value;
      const column = document.getElementById("column").value;
      const query = document.getElementById("query").value;

      if (!table || !column || !query) {
        document.getElementById("result").textContent = "⚠️ All fields are required!";
        return;
      }

      const response = await fetch("http://localhost:10000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ table, column, query })
      });

      const resultText = await response.text();
      document.getElementById("result").textContent = resultText;
    }
  </script>
</body>
</html>`;
  res.send(htmlContent);
});

app.listen(port, () => {
  console.log("server is listening on port " + port)
})

/* NO SOLUTION FOR INPUT RN
import readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';
const rl = readline.createInterface({ input, output });
*/

/* RENDER IS WITHOUT DATABASE
import mysql from 'mysql2';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DBpasswrd,
  database: 'eshop'
});
*/


// users -> dynamic edit needed
/* RENDER IS WITHOUT DATABASE
connection.query(`SELECT * FROM ${table} LIMIT 1`, (err, results, fields) => {
  if (err) throw err;

  columnNames = fields.map(field => field.name);
  console.log(columnNames);
  connection.end();
});
*/
