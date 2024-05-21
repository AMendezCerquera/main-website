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

// Dynamic CORS configuration to allow specific origins and support credentials
app.use(cors({
    origin: function (origin, callback) {
        // List of domains you want to allow
        const allowedOrigins = ['http://127.0.0.1:5500'];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);  // Allow requests with no origin (like mobile apps or curl requests)
        } else {
            callback(new Error('CORS not allowed for this origin'));
        }
    },
    credentials: true  // Reflect the origin in the CORS headers and allow credentials
}));


// Create a connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Express Session
app.use(session({
    secret: process.env.Secret_key,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 3600000 }
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use('local-strategy', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
  },
  function(name, password, done) {
    db.promise().query('SELECT id, name, password FROM users WHERE name = ?', [name])
        .then(([results, fields]) => {
            if (results.length === 0) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const user = results[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            });
        })
        .catch(err => done(err));
}));

// Serialize user into the sessions
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from the sessions
passport.deserializeUser((id, done) => {
    db.promise().query('SELECT id, name FROM users WHERE id = ?', [id])
        .then(([results, fields]) => {
            if (results.length === 0) {
                return done(new Error('User not found'));
            }
            return done(null, results[0]);
        })
        .catch(err => done(err));
});

  
// Define routes
// Routes

app.post('/login',
    passport.authenticate('local-strategy', {
        successRedirect: 'http://127.0.0.1:5500/MyShelf/MyShelf.html',
        failureRedirect: 'http://127.0.0.1:5500/index.html',
        failureFlash: false
    }) 
);

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('Welcome to your blog! <a href="/logout">Logout</a>');
    } else {
        res.redirect('/login');
    }
});

app.post('/register', (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).send('Username and password are required');
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }

        // Store the new user in the database
        db.query(
            'INSERT INTO users (name, password) VALUES (?, ?)',
            [name, hashedPassword],
            (err, results) => {
                if (err) {
                    return res.status(500).send('Error registering the user');
                }
                res.redirect('http://127.0.0.1:5500/MyShelf/MyShelf.html'); // Redirect to login page or send success message
            }
        );
    });
});


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


app.get('/api/user/status', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});