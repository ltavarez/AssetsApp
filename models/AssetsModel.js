import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    logo: {
      type: String,
      default: null,
    },
    assetTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssetTypes", // reference to the AssetType model
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // reference to the User model
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Añade createdAt y updatedAt
    collection: "Assets",
  }
);

const Assets = mongoose.model("Assets", assetSchema);

export default Assets;