const userController = require("../Controller/userController");
const router = require("express").Router();
const verifyToken = require("../MiddleWare/verifyToken");

router.post("/create", userController.createUser);

router.post("/", userController.login);

router.get("/", verifyToken, userController.readUser);

router.patch(
  "/update/:user_id",
  verifyToken,
  userController.createNewConversation
);

router.patch(
  "/update-blocklist/:user_id",
  verifyToken,
  userController.updateBlockList
);

router.delete("/delete/:user_id", verifyToken, userController.deleteUser);
router.patch(
  "/update-profile/:user_id",
  verifyToken,
  userController.updateAvatar
);

module.exports = router;
