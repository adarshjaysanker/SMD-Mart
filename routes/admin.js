var express = require('express');
var router = express.Router();

const {getAdminHomePage} = require('../Controllers/adminControllers');

/* GET users listing. */
router.get('/admin',getAdminHomePage)

module.exports = router;
