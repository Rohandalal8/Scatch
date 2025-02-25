const jwt = require('jsonwebtoken');
const ownerModel = require('../models/owner-model');

module.exports.isOwnerLoggedIn = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash('error', 'You need to logged in');
        return res.redirect('/owner/login');
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        const owner = await ownerModel.findOne({ email: decoded.email }).select('-password');

        if (!owner) {
            req.flash('error', 'Admin not found');
            return res.redirect('/owner/login');
        }

        req.owner = owner;
        next();
    } catch (error) {
        req.flash('error', 'You need to logged in');
        return res.redirect('/owner/login');
    }
}