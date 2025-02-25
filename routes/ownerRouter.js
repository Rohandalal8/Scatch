const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
const productModel = require('../models/product-model');
const { registerOwner, loginOwner } = require('../controllers/ownerController');
const { isOwnerLoggedIn } = require('../middlewares/isOwnerLoggedIn');

router.get('/register', async (req, res) => {
    let error = req.flash('error');
    let owners = await ownerModel.find();
    res.render('ownerRegister', { error, owners });
});

router.get('/login', async (req, res) => {
    let error = req.flash('error');
    let owners = await ownerModel.find();
    res.render('ownerLogin', { error, owners });
});

router.get('/admin', isOwnerLoggedIn, async (req, res) => {
    const products = await productModel.find();
    res.render('admin', { products });
});

router.get('/create', isOwnerLoggedIn, (req, res) => {
    let success = req.flash('success');
    res.render('createProducts', { success });
});

router.get('/delete/:id', isOwnerLoggedIn, async (req, res) => {

    let product = await productModel.findById(req.params.id);
    await product.deleteOne();
    return res.redirect('/owner/admin');
});

router.post('/registered', registerOwner);
router.post('/logined', loginOwner);

module.exports = router;