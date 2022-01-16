// {
//   attachment_object_id: Object_id;
//   message_object_id: messageModal;
//   data: [
//     {
//       id_attachment: string,
//       name: string,
//       path: string,
//       type: string_mp3_mp4____,
//       c_a: date,
//       u_a: date,
//     },
//     {
//       id_attachment: string,
//       name: string,
//       path: string,
//       type: string_mp3_mp4____,
//       c_a: date,
//       u_a: date,
//     },
//     ...
//   ];
//   c_a: date;
//   u_a: date;
// }

const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  attachment_id: {
    type: String,
    required: true,
  },
  dataName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
});

const attachmentSchema = new mongoose.Schema(
  {
    message: {
      type: mongoose.Types.ObjectId,
      ref: "Message",
      required: true,
    },
    data: [
      {
        type: Object,
        ref: dataSchema,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attachment", attachmentSchema);
