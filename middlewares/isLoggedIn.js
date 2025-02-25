const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports.isLoggedIn = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash('error', 'You need to logged in');
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        const user = await userModel.findOne({ email: decoded.email }).select('-password');

        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/login');
        }

        req.user = user;
        next();
    } catch (error) {
        req.flash('error', 'You need to logged in');
        return res.redirect('/login');
    }
}