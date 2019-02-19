const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  imageUrl: {type: String, required: true},
  categories: {type: [String], required: true},
  gitRepository: {type: String, default: ''},
  createdDate: {type: Date, default: Date.now},
  likes: {type: Number, default: 0},
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  comments: [{
    messageBody: {type: String, required: true},
    messageDate: {type: Date, default: Date.now},
    messageUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
  }]
});

module.exports = mongoose.model("Project", projectSchema);