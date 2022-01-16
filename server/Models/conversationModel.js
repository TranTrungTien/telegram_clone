// {
//   conversation_objectid: Objectid;
//   user_object_id: [userModel];
//   name_conversation: string;
//   c_a: date;
//   u_a: date;
// }

const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    usersList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    conversationName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    imgUrl: {
      type: String,
      default: "",
    },
    pinnedMessage: {
      type: Object,
      default: null,
      user_id: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);
