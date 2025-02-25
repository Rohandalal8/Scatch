const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logout } = require('../controllers/userController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const userModel = require('../models/user-model');

// send main page
router.get('/', (req, res) => {
    res.send('User Router');
});

router.get('/addtocart/:id', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    const productId = req.params.id;

    if (!user.cart.includes(productId)) {
        user.cart.push(productId);
        await user.save();
    }
    res.redirect('/');
});

// get user name,email,password
router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logout);

module.exports = router;