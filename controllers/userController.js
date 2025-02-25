const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;

        let user = await userModel.findOne({ email });
        if (user) {
            req.flash('error', 'You are already registered, Please login.');
            res.redirect('/register');
        }

        // hash password before saving
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    res.send(err.message);
                } else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    });

                    let token = generateToken(user);
                    res.cookie('token', token);
                    res.redirect('/');
                }
            });
        });
    } catch (error) {
        res.send(error.message);
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (!user) {
            req.flash('error', 'You are not registered, Please register.');
            res.redirect('/login');
        } else {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.send(err.message);
                } else if (!result) {
                    req.flash('error', 'Password is incorrect');
                    res.redirect('/login');
                } else {
                    let token = generateToken(user);
                    res.cookie('token', token);
                    res.redirect('/');
                }
            });
        }

    } catch (error) {
        res.send(error.message);
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
}