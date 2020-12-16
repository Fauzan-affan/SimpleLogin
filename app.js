// Import Dependencies
const express = require('express');
const routes = require('./routes'); // route index.js
const user = require('./routes/user'); // route user.js

const session = require('express-session');
let bodyParser = require("body-parser"); // req.body dependency

const mysql = require('mysql'); // mysql dependency

// Instance Express
const app = express();

// Set Public Folder (img, css, etc)
app.use(express.static('public'))

// Create Connection
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'db_manage_user'
});

connection.connect(); // mulai koneksi ke server 
global.db = connection; // set supaya db bisa dipakai di file manapun (global)

// Set Template Engine
app.set('view engine', 'ejs');

// Set Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // mengembalikan json data

// Set Session (Presistant Storage)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 } // max session exist = 1 hour (3600000 ms)
}))

// Set Routes
app.get('/', routes.index); //call for main index page
app.get('/signup', user.signup); //call for signup page
app.post('/signup', user.signup); //call for signup post 
app.get('/login', routes.index); //call for login page
app.post('/login', user.login); //call for login post
app.get('/home/dashboard', user.dashboard); //call for dashboard page after login
app.get('/home/logout', user.logout); //call for logout
app.get('/home/profile', user.profile); //to render users profile

// Listen PORT 8080
app.listen(8080)
