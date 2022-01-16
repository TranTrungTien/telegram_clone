const ConversationModel = require("../Models/conversationModel");
const Busboy = require("busboy");
const { v4 } = require("uuid");
const drive = require("../Utils/GoogledirveConnection");
const { ObjectId } = require("mongoose").Types;

module.exports = {
  createConversation: (req, res) => {
    const { user_id } = req.params;
    const { conversationName } = req.body;
    try {
      const conversation = new ConversationModel({
        conversationName: conversationName,
        admin: user_id,
      });
      conversation.save((err) => {
        if (err) {
          throw err;
        }
        return res.status(201).send({ conversation });
      });
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error: "Something went wrong !!!" });
    }
  },

  updateConversationImage: (req, res) => {
    const { admin_id, conversation_id } = req.params;
    const busboy = new Busboy({ headers: req.headers });
    busboy.on(
      "file",
      async (fieldName, fileStream, fileName, encoding, mimeType) => {
        try {
          const conversationImg = await drive.files.create({
            requestBody: {
              name: v4() + "-" + fieldName + "-" + fileName,
              mimeType: mimeType,
              parents: ["1eOKOmwOdJ5T4Q3DNc_ZC3dprbqVVVHEa"],
            },
            media: {
              mimeType: mimeType,
              body: fileStream,
            },
          });
          console.log({ conversationImg });
          if (!conversationImg.data) {
            throw new Error("Something went wrong");
          } else {
            try {
              ConversationModel.findOneAndUpdate(
                { _id: conversation_id, admin: admin_id },
                {
                  $set: {
                    imgUrl: `http://localhost:8080/api/assets/image/${conversationImg.data?.id}`,
                  },
                },
                { upsert: false, new: true },
                (err, doc) => {
                  if (err) {
                    return res.status(500).send({ updateProfileError: err });
                  }
                  return res.status(200).send({ doc });
                }
              );
            } catch (error) {
              console.log({ error });
              return res
                .status(500)
                .send({ error: "Something went wrong !!!" });
            }
          }
        } catch (error) {
          console.log({ error });
          return res.status(500).send({ error: "Something went wrong !!!" });
        }
      }
    );
    req.pipe(busboy);
  },

  addNewUser: (req, res) => {
    const { conversation_id } = req.params;
    const { newUser } = req.body;
    console.log({ conversation_id });
    console.log({ newUser });
    try {
      ConversationModel.findOneAndUpdate(
        { _id: conversation_id },
        {
          $push: {
            usersList: newUser,
          },
        },
        {
          upsert: false,
          new: true,
        },
        (err, doc) => {
          if (err) {
            throw err;
          } else {
            return res.status(201).send({ doc });
          }
        }
      );
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error: "Something went wrong !!!" });
    }
  },
  readAllMembers: (req, res) => {
    const { user_id } = req.params;
    try {
      ConversationModel.findOne({ admin: user_id })
        .populate("usersList")
        .exec((err, result) => {
          if (err) {
            throw err;
          }
          console.log({ result });
          return res.status(200).send({ result });
        });
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error: "Something went wrong !!!" });
    }
  },
  deleteConversation: (req, res) => {
    const { admin_id, conversation_id } = req.params;
    try {
      ConversationModel.findOneAndDelete(
        { admin: admin_id, _id: conversation_id },
        null,
        (err) => {
          if (err) {
            throw err;
          } else {
            res.status(200).send({ message: "Deleted Successfully" });
          }
        }
      );
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error: "Something went wrong !!!" });
    }
  },
  findConversation: (req, res) => {
    const { conversation_id } = req.params;

    if (!ObjectId.isValid(conversation_id)) {
      return res.status(404).send({ message: "Invalid ID" });
    }
    try {
      ConversationModel.findOne(
        { _id: conversation_id },
        null,
        null,
        (err, result) => {
          if (err) {
            throw err;
          }
          console.log({ result });
          return res.status(200).send({ result });
        }
      );
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ readConversation: error });
    }
  },
};
