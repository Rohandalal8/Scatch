// Description: Main file for the application.
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');

// require dotenv
require('dotenv').config();

// require routes
const indexRouter = require('./routes/index');
const ownerRouter = require('./routes/ownerRouter');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const registerRouter = require('./routes/registerRouter');
const loginRouter = require('./routes/loginRouter');
const dbgr = require('debug')('development:app');

// require db connection
const db = require('./config/mongoose-connection');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.use('/', indexRouter);
app.use('/owner', ownerRouter);
app.use('/products', productRouter);
app.use('/user', userRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// Server
app.listen(3000, () => {
    dbgr('Server is running on port 3000');
});