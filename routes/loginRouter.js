const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let error = req.flash('error');
    res.render('login', { error });
});

module.exports = router;