import AssetsTypes from "../models/AssetsTypeModel.js";
import { sendEmail } from "../services/EmailServices.js";

export async function GetIndex(req, res, next) {
  try {
    const result = await AssetsTypes.find({ userId: req.user.id })
      .sort({ createdAt: -1 }) // Fetch assets types for the logged-in user, sorted by creation date
      .lean(); // Convert to plain JavaScript objects

    const assetsTypes = result || []; // Ensure assetsTypes is an array

    res.render("assets-type/index", {
      assetsTypesList: assetsTypes,
      hasAssetsTypes: assetsTypes.length > 0,
      "page-title": "Assets type list",
    });
  } catch (err) {
    console.error("Error fetching assets types:", err);
    req.flash("errors", "Error fetching assets types");
  }
}

export function GetCreate(req, res, next) {
  res.render("assets-type/save", {
    editMode: false,
    "page-title": "New Assets type",
  });
}

export async function PostCreate(req, res, next) {
  const { Name, Description } = req.body;

  try {
    await AssetsTypes.create({
      name: Name,
      description: Description,
      userId: req.user.id, // Associate the asset with the logged-in user
    });

    await sendEmail({
      to: req.user.email,
      subject: "New Assets Type Created",
      html: `<p>A new assets type has been created:</p>
             <p><strong>Name:</strong> ${Name}</p>
             <p><strong>Description:</strong> ${Description}</p>`,
    });

    req.flash("success", "Assets type created successfully");
    return res.redirect("/assets-type/index");
  } catch (err) {
    console.error("Error creating assets type:", err);
    req.flash("errors", "Error creating assets type");
  }
}

export async function GetEdit(req, res, next) {
  const id = req.params.assetsTypeId;

  try {
    const assetsType = await AssetsTypes.findOne({
      _id: id,
      userId: req.user.id,
    }).lean(); // Convert to plain JavaScript object

    if (!assetsType) {
      return res.redirect("/assets-type/index");
    }

    res.render("assets-type/save", {
      editMode: true,
      assetsType: assetsType,
      "page-title": `Edit Assets type ${assetsType.name}`,
    });
  } catch (err) {
    console.error("Error fetching assets type:", err);
    req.flash("errors", "Error fetching assets type");
  }
}

export async function PostEdit(req, res, next) {
  const { Name, Description, AssetsTypeId } = req.body;

  try {
    const assetsType = await AssetsTypes.findOne({
      _id: AssetsTypeId,
      userId: req.user.id,
    }).lean(); // Convert to plain JavaScript object

    if (!assetsType) {
      return res.redirect("/assets-type/index");
    }

    // Update the assets type
    await AssetsTypes.findByIdAndUpdate(assetsType._id, {
      name: Name,
      description: Description,
      userId: req.user.id,
    });

    req.flash("success", "Assets type updated successfully");
    return res.redirect("/assets-type/index");
  } catch (err) {
    console.error("Error in PostEdit:", err);
    req.flash("errors", "Error updating assets type");
  }
}

export async function Delete(req, res, next) {
  const id = req.body.AssetsTypeId;

  try {
    const assetsType = await AssetsTypes.findOne({
      _id: id,
      userId: req.user.id,
    }).lean(); // Convert to plain JavaScript object

    if (!assetsType) {
      return res.redirect("/assets-type/index");
    }
    // Delete the assets type
    await AssetsTypes.deleteOne({ _id: id, userId: req.user.id });

    req.flash("success", "Assets type deleted successfully");
    return res.redirect("/assets-type/index");
  } catch (err) {
    console.error("Error in Delete:", err);
    req.flash("errors", "Error deleting assets type");
  }
}
