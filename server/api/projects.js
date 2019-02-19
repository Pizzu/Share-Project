const express = require('express');
const router = express.Router();

const middleware = require('../middlewares');
const projects = require('../controllers/projects');

router.get('/', (req, res, next) => {
  //Retrive all projects
  projects.getAllProjects(req, res, next);
});


router.get('/:id', (req, res, next) => {
  //Retrive a specific project
  projects.getProject(req, res, next);
});


router.post('/', middleware.checkTokenValidity ,(req, res, next) => {
  //Create a new project
  projects.createProject(req, res, next);
});

router.put('/:id', middleware.checkTokenValidity, (req, res, next) => {
  //Update a specific project
  projects.updateProject(req, res, next);
});

router.put('/:id/like', middleware.checkTokenValidity, (req, res, next) => {
  //Update a specific project
  projects.likeProject(req, res, next);
});

router.put('/:id/unlike', middleware.checkTokenValidity, (req, res, next) => {
  //Update a specific project
  projects.unlikeProject(req, res, next);
});

router.put('/:id/comments', middleware.checkTokenValidity, (req, res, next) => {
  //Update a specific project
  projects.createComments(req, res, next);
});

router.delete('/:id', middleware.checkTokenValidity, (req, res, next) =>{
  //Delete a specific project
  projects.deleteProject(req, res, next);
});

module.exports = router;