import Assets from "../models/AssetsModel.js";
import AssetsTypes from "../models/AssetsTypeModel.js";
import path from "path";
import fs from "fs";
import { projectRoot } from "../utils/Paths.js";

export async function GetIndex(req, res, next) {
  try {
    const assets = await Assets.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate("assetTypeId")
      .lean();

    res.render("assets/index", {
      assetsList: assets,
      hasAssets: assets.length > 0,
      "page-title": "Assets type list",
    });
  } catch (err) {
    req.flash("errors", "Error fetching assets");
    console.error("Error fetching assets:", err);
  }
}

export async function GetCreate(req, res, next) {
  try {

    const assetsTypes = await AssetsTypes.find({userId: req.user.id}).lean();

    res.render("assets/save", {
      editMode: false,
      assetsTypesList: assetsTypes,
      hasAssetsTypes: assetsTypes.length > 0,
      "page-title": "New Assets",
    });
  } catch (err) {
    req.flash("errors", "Error fetching asset types");
    console.error("Error fetching assets types:", err);
  }
}

export async function PostCreate(req, res, next) {
  try {
    const { Name, Description, Symbol, AssetsTypeId } = req.body; // Destructure the request body (Destructuring)    

    const Logo = req.file;
    const LogoPath = "\\" + path.relative("public", Logo.path); // Get the relative path of the uploaded file

    await Assets.create({
      name: Name,
      description: Description,
      logo: LogoPath,
      symbol: Symbol,
      assetTypeId: AssetsTypeId,
      userId: req.user.id, // Associate the asset with the logged-in user
    });

    req.flash("success", "Asset created successfully");
    res.redirect("/assets/index");
  } catch (err) {
    console.error("Error creating asset:", err);
    req.flash("errors", "Error creating asset");
  }
}

export async function GetEdit(req, res, next) {
  try {
    const id = req.params.assetsId;
    const asset = await Assets.findOne({ _id: id, userId: req.user.id }).lean();

    if (!asset) {
      return res.redirect("/assets/index");
    }

    const assetsTypes = await AssetsTypes.find({ userId: req.user.id }).lean();

    res.render("assets/save", {
      editMode: true,
      asset,
      assetsTypesList: assetsTypes,
      hasAssetsTypes: assetsTypes.length > 0,
      "page-title": `Edit Asset ${asset.name}`,
    });
  } catch (err) {
    console.error("Error fetching asset or asset types:", err);
    req.flash("errors", "Error fetching asset or asset types");
  }
}

export async function PostEdit(req, res, next) {
  try {
    const { Name, Description, AssetsTypeId, Symbol, AssetsId } = req.body;
    const Logo = req.file;

    const asset = await Assets.findOne({ _id: AssetsId, userId: req.user.id });

    if (!asset) {
      return res.redirect("/assets/index");
    }

    let LogoPath = asset.logo;
    if (Logo) {
      LogoPath = "\\" + path.relative("public", Logo.path);
    }

    await Assets.findByIdAndUpdate(AssetsId, {
      name: Name,
      description: Description,
      logo: LogoPath,
      symbol: Symbol,
      assetTypeId: AssetsTypeId,
      userId: req.user.id,
    });

    req.flash("success", "Asset updated successfully");
    res.redirect("/assets/index");
  } catch (err) {
    console.error("Error updating asset:", err);
    req.flash("errors", "Error updating asset");
  }
}

export async function Delete(req, res, next) {
  try {
    const id = req.body.AssetsId;

    const asset = await Assets.findOne({ _id: id, userId: req.user.id });

    if (!asset) {
      return res.redirect("/assets/index");
    }

    // Si tiene logo, eliminar el archivo físico
    if (asset.logo) {
      const logoPath = path.join(projectRoot, "public", asset.logo);
      if (fs.existsSync(logoPath)) {
        fs.unlinkSync(logoPath);
      }
    }

    await Assets.deleteOne({ _id: id, userId: req.user.id });

    req.flash("success", "Asset deleted successfully");
    res.redirect("/assets/index");
  } catch (err) {
    console.error("Error deleting asset:", err);
    req.flash("errors", "Error deleting asset");
  }
}
