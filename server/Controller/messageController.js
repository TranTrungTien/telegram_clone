const MessageModel = require("../Models/messageModel");
const mongoose = require("mongoose");

module.exports = {
  createNewMessage: async (req, res) => {
    const { user_id, conversation_id } = req.params;
    const { content, reply_message_id } = req.body;
    try {
      const message = new MessageModel({
        user: user_id,
        conversation: conversation_id,
        content: content,
        reply: reply_message_id,
      });
      const response = await message.save();
      if (response) {
        return res.status(201).send({ response });
      } else {
        return res.status(500).send({ error: "Something went wrong !!!" });
      }
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error: "Something went wrong !!!" });
    }
  },
  updateAttachmentMessage: (req, res) => {
    const { user_id, conversation_id, message_id } = req.params;
    const { attachment_id } = req.body;
    try {
      MessageModel.findOneAndUpdate(
        {
          _id: message_id,
          user: user_id,
          conversation: conversation_id,
        },
        {
          $set: {
            attachment: attachment_id,
          },
        },
        { upsert: false, new: true },
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
  updateContentMessage: (req, res) => {
    const { user_id, conversation_id } = req.params;
    const { newContent } = req.body;
    try {
      MessageModel.findOneAndUpdate(
        {
          user: user_id,
          conversation: conversation_id,
        },
        {
          $set: {
            content: newContent,
          },
        },
        { upsert: false, new: true },
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
  deleteMessage: (req, res) => {
    const { user_id, conversation_id } = req.params;
    try {
      MessageModel.findOneAndDelete(
        {
          user: user_id,
          conversation: conversation_id,
        },
        {},
        (err, doc) => {
          if (err) {
            throw err;
          } else {
            return res.status(200).send({ doc });
          }
        }
      );
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error: "Something went wrong !!!" });
    }
  },
  readMessage: (req, res) => {
    const { user_id, conversation_id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).send({ error: "Bad Request !!!" });
    }
    try {
      MessageModel.findOne({
        user: user_id,
        conversation: conversation_id,
      })
        .populate("user")
        .populate("conversation")
        .populate("reply")
        .exec((err, result) => {
          if (err) {
            throw err;
          } else {
            res.status(200).send({ result });
          }
        });
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error });
    }
  },
  readAllMessage: async (req, res) => {
    const { conversation_id } = req.params;
    console.log({ conversation_id });

    try {
      await MessageModel.find({
        conversation: conversation_id,
      })
        .populate("user")
        .populate("conversation")
        .populate({
          path: "reply",
          model: "Message",
          populate: [
            {
              path: "user",
              model: "User",
            },
            {
              path: "attachment",
              model: "Attachment",
            },
          ],
        })
        .populate("attachment")
        .exec((err, allMessage) => {
          if (err) {
            throw err;
          } else {
            console.log({ allMessage });
            return res.status(200).send({ allMessage });
          }
        });
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error });
    }
  },
  readPaginateMessage: (req, res) => {
    const { date, limit, conversation_id } = req.params;
    MessageModel.find({
      conversation: conversation_id,
      createdAt: {
        $lt: new Date(date),
      },
    })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .populate("user")
      .populate("conversation")
      .populate({
        path: "reply",
        model: "Message",
        populate: [
          {
            path: "user",
            model: "User",
          },
          {
            path: "attachment",
            model: "Attachment",
          },
        ],
      })
      .populate("attachment")
      .exec((err, result) => {
        if (err) {
          return res.status(500).send({ error });
        }
        const doc = result.reverse();
        return res.status(200).send({ doc });
      });
  },
};
