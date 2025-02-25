const jwt = require('jsonwebtoken');

const generateOwnerToken = (owner) => {
    return jwt.sign({ email: owner.email, id: owner._id }, process.env.JWT_KEY, {
        expiresIn: '30d',
    });
}

module.exports.generateOwnerToken = generateOwnerToken;