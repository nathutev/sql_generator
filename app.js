import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv'
dotenv.config();

import cors from 'cors';

import { InferenceClient } from "@huggingface/inference";
const client = new InferenceClient(process.env.HG_API);

import express from "express"
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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
  
  //const content = Date.now(); // just for testing
  
  res.send(content);
})

app.get("/", (req, res) => {
  //const htmlContent = paste content of the file if needed;
  
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log("server port: " + port)
})