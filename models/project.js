const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  github: {
    type: String
  },
  website: {
    type: String
  }
});

module.exports = mongoose.model('Project', projectSchema);
