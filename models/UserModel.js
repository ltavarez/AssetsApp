import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: {
    type: String,
    default: null
  },
  resetTokenExpiration: {
    type: Date,
    default: null
  },
  ActivateToken: {
    type: String, 
    default: null
  },
  isActive: {
    type: Boolean,
    default: false,
    required: true
  }
},
{
  timestamps: true, // Automatically manage createdAt and updatedAt fields
  collection: 'Users' // Specify the collection name, is equivalent to table name in SQL
});

const Users = mongoose.model("Users", userSchema); // Create the model from the schema

export default Users;
