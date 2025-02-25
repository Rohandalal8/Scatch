const ownerModel = require('../models/owner-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateOwnerToken } = require('../utils/generateOwnerToken');

module.exports.registerOwner = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;

        let owner = await ownerModel.findOne({ email });
        if (owner) {
            req.flash('error', 'You are already registered, Please login.');
            res.redirect('/owner/register');
        }

        // hash password before saving
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    res.send(err.message);
                } else {
                    let owner = await ownerModel.create({
                        fullname,
                        email,
                        password: hash
                    });

                    let token = generateOwnerToken(owner);
                    res.cookie('token', token);
                    return res.redirect('/owner/admin');
                }
            });
        });
    } catch (error) {
        res.send(error.message);
    }
}

module.exports.loginOwner = async (req, res) => {
    try {
        let { email, password } = req.body;

        let owner = await ownerModel.findOne({ email });

        if (!owner) {
            req.flash('error', 'Wrong email or password');
            return res.redirect('/owner/login');
        } else {
            bcrypt.compare(password, owner.password, (err, result) => {
                if (err) {
                    res.send(err.message);
                } else if (!result) {
                    req.flash('error', 'Wrong email or password');
                    return res.redirect('/login');
                } else {
                    let token = generateOwnerToken(owner);
                    res.cookie('token', token);
                    return res.redirect('/owner/admin');
                }
            });
        }

    } catch (error) {
        res.send(error.message);
    }
}