const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Payments endpoint');
});

module.exports = router;
