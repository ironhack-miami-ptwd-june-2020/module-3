const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const authorSchema = new Schema(
  {
    // unless you are defining more than the "type" property, you don't have to use {} (see below)
    // firstName: {type: String, require: true}
    firstName: String,
    lastName: String,
    nationality: String,
    birthday: Date,
    pictureUrl: String
  },
  {
    // keeps record when is created and updated
    timestamps: true
  }
);

// const Author = model('Author', authorSchema);
// module.exports = Author;

module.exports = model('Author', authorSchema);
