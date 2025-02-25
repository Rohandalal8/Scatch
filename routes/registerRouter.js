const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let error = req.flash('error');
    res.render('register', { error });
});

module.exports = router;