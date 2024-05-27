require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');

app.use(cors());

// Create a connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Express Session
app.use(session());

  
// Routes
app.get('/articles', (req, res) => {
    let sql = 'SELECT articleId, articleName, articleDescription, articleData, authorName, authorEmail FROM articles';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving articles');
            return;
        }
        res.json(results); // Send the results as JSON
    });
});

app.post('/faq', (req, res) => {
    const question = req.body.question; // Assuming the question is sent in the request body under the key 'question'
    let answer = "I'm not sure how to answer that. Can you ask something else?"; // Default response

    // Define your FAQ logic here
    switch (question.toLowerCase()) {
        case "what are your main skills?":
            answer = "I specialize in Full-Stack Web Development, particularly with Node.js and React.";
            break;
        case "what projects have you worked on?":
            answer = "I have worked on several web application projects, including an e-commerce site and a personal portfolio.";
            break;
        case "are you available for hire?":
            answer = "Yes, I am currently available for freelance projects. Please contact me for more details.";
            break;
        // add more cases as needed
    }

    res.json({ answer }); // Send the answer back to the client
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});