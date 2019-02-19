const express = require('express');
const router = express.Router();

const user = require('../controllers/user');
const middleware = require('../middlewares');


router.get('/:username/projects', (req, res, next) => {
  //Retrive all projects for a specific user
  user.getUserProjects(req, res, next);
});

router.put('/:username', middleware.checkTokenValidity ,(req, res, next) => {
  user.updateUser(req, res, next);
});

router.delete('/:username', middleware.checkTokenValidity  ,(req, res, next) => {
  user.deleteUser(req, res, next);
});

module.exports = router;