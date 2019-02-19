const User = require('../models/user');
const Project = require('../models/project');
const Joi = require('joi');

//Joi validation schemas --- Project Schema
const addProjectSchema = Joi.object().keys({
  title: Joi.string().min(2).max(30).required(),
  description: Joi.string().trim().min(2).required(),
  imageUrl: Joi.string().uri().trim().required(),
  gitRepository: Joi.string().allow('').uri(),
  categories: Joi.array().items(Joi.string().required())
});

//Helpers
function checkAuthorization(projectAuthor, currentUser) {
  //The id returned from the mongoDb is an obj, so we have to use the methods equals.
  if (projectAuthor.equals(currentUser)) {
    return true;
  } else {
    return false;
  }
}

async function getAllProjects(req, res, next) {
  try {
    const projectsFound = await Project.find({}).sort({createdDate: 'desc'}).populate({path: 'createdBy', model: 'User'}).exec();
    res.json({projects: projectsFound});
  } catch (error) {
    const err = new Error('Sorry! Something went wrong. Try again.');
    next(err);
  }
}

async function getProject(req, res, next) {
  try {
    const projectFound = await Project.findOne({_id: req.params.id}).populate({path: 'createdBy', model: 'User'}).populate({path: 'comments.messageUser', model: 'User'}).exec();
    if (projectFound) {
      res.json({project: projectFound});
    } else {
      res.status(400);
      const err = new Error('No project found.');
      next(err);
    }
  } catch (error) {
    const err = new Error('Sorry! Something went wrong. Try again.');
    next(err);
  }
}

async function createProject(req, res, next) {
  const result = Joi.validate(req.body, addProjectSchema);
  if (result.error === null) {
    try {
      const projectObj = {...req.body, createdBy: req.userId};
      const projectCreated = await Project.create(projectObj);
      res.json({project: projectCreated});
    } catch (error) {
      const err = new Error('Sorry! Something went wrong. Try again.');
      next(err);
    }
  } else {
    res.status(400);
    next(result.error);
  }
}

async function updateProject(req, res, next) {
  try {
    const projectFound = await Project.findOne({_id: req.params.id}).exec();
    if (projectFound) {
      if (checkAuthorization(projectFound.createdBy, req.userId)) {
        const result = Joi.validate(req.body, addProjectSchema);
        if (result.error === null) {
          const projectUpdated = await Project.findByIdAndUpdate(projectFound._id, {$set: req.body}, {new: true}).populate({path: 'createdBy', model: 'User'}).populate({path: 'comments.messageUser', model: 'User'}).exec();
          res.json({project: projectUpdated});
        } else {
          res.status(400);
          next(result.error);
        }
      } else {
        const err = new Error('Unauthorized');
        res.status(401);
        next(err);
      }
    } else {
      res.status(400);
      const err = new Error('No project found.');
      next(err);
    }
  } catch (error) {
    const err = new Error('Sorry! Something went wrong. Try again.');
    next(err);
  }
}

async function likeProject(req, res, next) {
  try {
    const projectFound = await Project.findOne({_id: req.params.id}).exec();
    if (projectFound) {
      const projectUpdated = await Project.findByIdAndUpdate(projectFound._id, {$inc: {likes: 1} }, {new: true}).exec();
      const userUpdated = await User.findByIdAndUpdate(req.userId, {$addToSet: {favorites: projectUpdated._id}}, {new: true}).populate({path: 'favorites', model: 'Project', populate: {path:'createdBy', model: 'User'}}).exec();
      res.json({likes: projectUpdated.likes, favorites: userUpdated.favorites});
    } else {
      res.status(400);
      const err = new Error('No project found.');
      next(err);
    }
  } catch (error) {
    const err = new Error('Sorry! Something went wrong. Try again.');
    next(err);
  }
}

async function unlikeProject(req, res, next) {
  try {
    const projectFound = await Project.findOne({_id: req.params.id}).exec();
    if (projectFound) {
      const projectUpdated = await Project.findByIdAndUpdate(projectFound._id, {$inc: {likes: -1} }, {new: true}).exec();
      const userUpdated = await User.findByIdAndUpdate(req.userId, {$pull: {favorites: projectUpdated._id}}, {new: true}).populate({path: 'favorites', model: 'Project', populate: {path:'createdBy', model: 'User'}}).exec();
      res.json({likes: projectUpdated.likes, favorites: userUpdated.favorites});
    } else {
      res.status(400);
      const err = new Error('No project found.');
      next(err);
    }
  } catch (error) {
    const err = new Error('Sorry! Something went wrong. Try again.');
    next(err);
  }
}

async function createComments(req, res, next) {
  const comment = {...req.body, messageUser: req.userId}
  try {
    const projectFound = await Project.findOne({_id: req.params.id}).exec();
    if (projectFound) {
      const projectUpdated = await Project.findByIdAndUpdate(
        projectFound._id, 
        {$push: {comments: {$each: [comment], $position: 0}}},
        {new: true})
        .populate({path: 'comments.messageUser', model: 'User'}).exec();
        res.json({projectComment:  projectUpdated.comments[0]});
    } else {
      res.status(400);
      const err = new Error('No project found.');
      next(err);
    }
  } catch (error) {
    const err = new Error('Sorry! Something went wrong. Try again.');
    next(err);
  }
}

async function deleteProject(req, res, next) {
  try {
    const projectFound = await Project.findOne({_id: req.params.id}).exec();
    if (projectFound) {
      if (checkAuthorization(projectFound.createdBy, req.userId)) {
        await Project.findByIdAndDelete(projectFound._id).exec();
        res.json({deleted: true});    
      } else {
        const err = new Error('Unauthorized');
        res.status(401);
        next(err);
      }
    } else {
      res.status(400);
      const err = new Error('No project found.');
      next(err);
    }
  } catch (error) {
    const err = new Error('Sorry! Something went wrong. Try again.');
    next(err);
  }
}

module.exports = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  likeProject,
  unlikeProject,
  createComments,
  deleteProject
}