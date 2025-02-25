const express = require('express');
const router = express.Router();
const Product = require('../models/product-model');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const userModel = require('../models/user-model');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('index', { products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/cart', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate('cart');
    res.render('cart', { user });
});

module.exports = router;