const mongoose = require('mongoose');
const MongooseValidation = require('mongoose-beautiful-unique-validation');

const { Schema } = mongoose;
const connection = require('./db');

const UserSchema = new Schema(
  {
    user_id: {
      type: String,
      required: [true, 'Fullname is required'],
    },
    username: { 
      type: String, 
      required: [true, 'Fullname is required'],
      trim: true
    },
    question: { 
        type: String, 
        required: true,
        trim: true
      },
    answer: { 
      type: String, 
      required: [true, 'Answer is required'],
      trim: true
    }
  },
  { timestamps: true }
);

UserSchema.plugin(MongooseValidation);

module.exports = connection.model('UserResponse', UserSchema);