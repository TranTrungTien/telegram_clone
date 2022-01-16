const ConversationController = require("../Controller/conversationController");
const verifyToken = require("../MiddleWare/verifyToken");
const router = require("express").Router();

router.post(
  "/:user_id",
  verifyToken,
  ConversationController.createConversation
);

router.get(
  "/:conversation_id",
  verifyToken,
  ConversationController.findConversation
);

router.patch(
  "/add_new_user/:conversation_id",
  verifyToken,
  ConversationController.addNewUser
);
router.patch(
  "/updateConversationImg/:conversation_id/:admin_id",
  verifyToken,
  ConversationController.updateConversationImage
);
router.get(
  "/read_all_member/:user_id",
  verifyToken,
  ConversationController.readAllMembers
);

router.delete(
  "/:conversation_id/:admin_id",
  verifyToken,
  ConversationController.deleteConversation
);

module.exports = router;
