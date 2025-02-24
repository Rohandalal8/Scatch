const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const ownerRouter = require('./routes/ownerRouter');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const registerRouter = require('./routes/registerRouter');
const loginRouter = require('./routes/loginRouter');
const dbgr = require('debug')('development:app');

const db = require('./config/mongoose-connection');
const { register } = require('module');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/owner', ownerRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter)

app.listen(3000, () => {    
    dbgr('Server is running on port 3000');
});