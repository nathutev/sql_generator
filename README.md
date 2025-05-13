# 🧠 Text-to-SQL Generator
This project is a simple Text-to-SQL Generator web app built using Node.js, Express, and the Hugging Face Inference API. It converts natural language input into SQL queries based on user-defined tables and columns.

## 🚀 Features
Converts natural language text into SQL queries using Meta LLaMA 3.1 (via Hugging Face).

Clean, responsive front-end with simple UI.

Built-in CORS and JSON handling.

Customizable table and column inputs.

## 🛠️ Tech Stack
Node.js

Express

Hugging Face Inference API

dotenv

CORS

Vanilla HTML/CSS/JS (Frontend)

## 📦 Installation
Clone the Repository
```
git clone https://github.com/yourusername/text-to-sql.git
cd text-to-sql
```

Install Dependencies
```
npm install
```

Set Up Environment Variables
Create a .env file in the root directory and add:
```
HG_API=your_huggingface_api_key
PORT=10000 # or any port you want to run it on
```

Start the Server
```
node index.js
```
Visit in Browser
Open http://localhost:10000 in your web browser.

## 📁 Project Structure

├── .env
├── index.js
├── package.json
└── README.md

## ✨ Example Usage
Enter your table name(s), column name(s), and query intent in plain English.
Hit Submit.
Receive a clean SQL statement, ready to copy-paste or run.

## 🧠 Powered By
🤖 Hugging Face Inference API
🐘 LLaMA 3.1 - 8B Instruct Model

## 🧪 Future Improvements
Add history of generated queries. - DONE IN v2