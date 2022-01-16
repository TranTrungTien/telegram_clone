const AttachmentController = require("../Controller/attachmentsController");
const router = require("express").Router();

router.post("/:message_id", AttachmentController.createNewAttachment);

router.get("/:message_id", AttachmentController.readAttachment);

router.put("/:message_id", AttachmentController.updateNewAttachment);

router.delete("/:message_id", AttachmentController.deleteAttachment);

module.exports = router;
