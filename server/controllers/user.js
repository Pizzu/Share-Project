const User = require('../models/user');
const Project = require('../models/project');
const Joi = require('joi');

const updateUserSchema = Joi.object().keys({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(),
  email: Joi.string().email().trim().required(),
  avatar: Joi.string().uri().trim().required()
});

//Helpers
function checkAuthorization(user, currentUser) {
  //The id returned from the mongoDb is an obj, so we have to use the methods equals.
  if (user.equals(currentUser)) {
    return true;
  } else {
    return false;
  }
}

async function getUserProjects(req, res, next) {
  try {
    const userFound = await User.findOne({username: req.params.username}).exec();
    if (userFound) {
      const projectsFound = await Project.find({createdBy: userFound._id}).sort({createdDate: 'desc'}).populate({path: 'createdBy', model: 'User'}).exec();
      res.json({projects: projectsFound, user: userFound});
    } else {
      res.status(422);
      const err = new Error('No user found.');
      next(err);
    }
  } catch (error) {
    console.log(error);
    const err = new Error('Sorry! Something went wrong. Try again.');
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const userFound = await User.findOne({username: req.params.username}).exec();
    if (userFound) {
      //We check if the user has the authorization to update the user
      if (checkAuthorization(userFound._id, req.userId)) {
        //We update the user
        const result = Joi.validate(req.body, updateUserSchema);
        if (result.error === null) {
          const userUpdated = await User.findByIdAndUpdate(userFound._id, {$set: req.body}, {new: true}).populate({path: 'favorites', model: 'Project', populate: {path:'createdBy', model: 'User'}}).exec();
          res.json({user: userUpdated});
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
      const err = new Error('No user found.');
      next(err);
    }
  } catch (error) {
    const err = new Error('Sorry! Something went wrong. Try again.');
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const userFound = await User.findOne({username: req.params.username}).exec();
    if (userFound) {
      //We check if the user has the authorization to update the user
      if (checkAuthorization(userFound._id, req.userId)) {
        //We update the user
        await User.findByIdAndDelete(userFound._id).exec();
        res.json({deleted: true});
      } else {
        const err = new Error('Unauthorized');
        res.status(401);
        next(err);
      }
    } else {
      res.status(400);
      const err = new Error('No user found.');
      next(err);
    }
  } catch (error) {
    const err = new Error('Sorry! Something went wrong. Try again.');
    next(err);
  }
}



module.exports = {
  getUserProjects,
  updateUser,
  deleteUser
}