// {
//   message_object_id: Object_id;
//   conversation_object_id: conversationModel;
//   user_object_id: useModal;
//   reply: {
//     user_object_id: useModal;
//     content: string;
//   }
//   content: string;
//   attachment: boolean;
//   c_a: date;
//   u_a: date;
// }

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    conversation: {
      type: mongoose.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    reply: {
      type: mongoose.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    content: {
      type: String,
      default: "",
    },
    attachment: {
      type: mongoose.Types.ObjectId,
      ref: "Attachment",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
