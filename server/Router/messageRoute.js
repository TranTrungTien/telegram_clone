const MessageController = require("../Controller/messageController");
const verifyToken = require("../MiddleWare/verifyToken");
const router = require("express").Router();

router.post(
  "/:conversation_id/:user_id",
  verifyToken,
  MessageController.createNewMessage
);

router.get(
  "/:conversation_id/:user_id",
  verifyToken,
  MessageController.readMessage
);

router.get("/:conversation_id", verifyToken, MessageController.readAllMessage);

router.get(
  "/:conversation_id/:limit/:date",

  MessageController.readPaginateMessage
);

router.patch(
  "/update-content/:conversation_id/:user_id",
  verifyToken,
  MessageController.updateContentMessage
);

router.patch(
  "/update-attachment/:conversation_id/:user_id/:message_id",
  verifyToken,
  MessageController.updateAttachmentMessage
);

router.delete(
  "/:conversation_id/:user_id",
  verifyToken,
  MessageController.deleteMessage
);

module.exports = router;
