import mongoose from "mongoose";

const assetsTypeModel = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: false,
    default: "" 
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId for MongoDB references
    ref: "Users", // Reference to the Users model
    required: true
  }
},
{
  timestamps: true, // Automatically manage createdAt and updatedAt fields
  collection: 'AssetTypes' // Specify the collection name, equivalent to table name in SQL
});

const AssetTypes = mongoose.model("AssetTypes", assetsTypeModel); // Create the model from the schema

export default AssetTypes;