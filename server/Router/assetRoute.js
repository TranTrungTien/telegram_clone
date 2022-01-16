const router = require("express").Router();
const AssetController = require("../Controller/assetController");

router.get("/image/:asset_id", AssetController.getImageAsset);
router.get("/video/:asset_id/:sizeSize", AssetController.getVideoAsset);
module.exports = router;
