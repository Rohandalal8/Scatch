const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');

router.get('/', (req, res) => {
    res.send('Onwer Router');
});

if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res.status(500).send("You don't have permission to create a new owner");
        } else {
            let {fullname, email, password} = req.body;
            let createdOwner = new ownerModel({
                fullname,
                email,
                password
            });
            res.status(201).send(createdOwner);
        }
    });
}

module.exports = router;