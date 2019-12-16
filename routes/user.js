const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('Hello <h3>Bikash</h3> serving from router/user.js');
});

module.exports = router;