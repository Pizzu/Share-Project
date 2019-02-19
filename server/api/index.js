const express = require('express');
const router = express.Router();

const projects = require('./projects');
const user = require('./user');


router.use('/users', user);
router.use('/projects', projects);

module.exports = router;