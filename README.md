# 🧠 Text-to-SQL Generator
This project is a simple Text-to-SQL Generator web app built using Node.js, Express.js, and the Hugging Face Inference API. It converts natural language input into SQL queries based on user-defined tables and columns. It is deployed at https://sql-generator-xivz.onrender.com
## 🚀 Features
Converts natural language text into SQL queries using AI (via Hugging Face).

Clean, responsive front-end with simple UI.

Built-in CORS and JSON handling.

Customizable table and column inputs.

## 🛠️ Tech Stack
Node.js

Express.js

Hugging Face Inference API

dotenv

CORS

Vanilla HTML, CSS (Frontend)

## 📦 Installation
Clone the Repository
```
git clone https://github.com/nathutev/sql_generator.git
cd sql_generator
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
node app.js
```
Visit in Browser
Open http://localhost:10000 (or your selected port from .env) in your web browser. It is also deployed online at https://sql-generator-xivz.onrender.com

## 📁 Project Structure

├── public/
  └── index.html
  └── local.js
  └── styles.css

├── .env

├── app.js

├── package.json

├── package-lock.json

└── README.md

## ✨ Example Usage
Enter your table name(s), column name(s), and query intent in plain English.
Hit Submit.
Receive a clean SQL statement, ready to copy-paste and run.

## 🧠 Powered By (current version)
🤖 Hugging Face Inference API
🐘 LLaMA 3.1 - 8B Instruct Model

## 🧪 Future Improvements
Add history of generated queries. - DONE IN v2
