const UserModel = require("../Models/userModel");
const drive = require("../Utils/GoogledirveConnection");
const { v4 } = require("uuid");
const Busboy = require("busboy");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../Utils/jwtSecret");

module.exports = {
  createUser: async (req, res) => {
    const { username, email, password } = req.body;
    console.log({ username, email, password });

    try {
      const user = new UserModel({
        username: username,
        email: email,
        password: password,
        blockList: [],
        profile: "",
      });
      const isSaveUser = await user.save();
      if (isSaveUser) {
        return res.status(201).send({ message: "Successfully" });
      }
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error: "Something went wrong !!!" });
    }
  },

  updateAvatar: (req, res) => {
    const { user_id } = req.params;
    const busboy = new Busboy({ headers: req.headers });
    busboy.on(
      "file",
      async (fieldName, fileStream, fileName, encoding, mimeType) => {
        try {
          const profile = await drive.files.create({
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
          console.log({ profile });
          if (!profile.data) {
            throw new Error("Something went wrong");
          } else {
            try {
              UserModel.findOneAndUpdate(
                { _id: user_id },
                {
                  $set: {
                    profileImgUrl: `http://localhost:8080/api/assets/image/${profile.data?.id}`,
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

  readUser: async (req, res) => {
    console.log({ user: req.user });
    const { email, password } = req.user;

    try {
      const user = await UserModel.findOne({
        email: email,
        password: password,
      })
        .populate("conversationList")
        .populate("blockList")
        .exec();
      console.log({ user });
      res.status(200).send({ user });
    } catch (error) {
      console.log({ readUser: error });
      return res.status(500).send({ readUser: error });
    }
  },

  createNewConversation: (req, res) => {
    const { user_id } = req.params;
    const { newConversation } = req.body;
    console.log({ user_id, newConversation });
    try {
      UserModel.findByIdAndUpdate(
        user_id,
        {
          $push: {
            conversationList: newConversation,
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

  deleteUser: async (req, res) => {
    const { user_id } = req.params;
    try {
      const response = await UserModel.findByIdAndDelete(user_id);
      return res.status(200).send({ response });
    } catch (error) {
      console.log({ deleteUser: error });
      return res.status(500).send({ deleteUser: error });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({
        email: email,
        password: password,
      })
        .populate("conversationList")
        .populate("blockList")
        .exec();
      console.log({ user });
      const token = jwt.sign(
        { email: user.email, password: user.password },
        jwtSecretKey,
        {
          expiresIn: 3600,
        }
      );
      return res.status(200).send({ user, token });
    } catch (error) {
      console.log({ login: error });
      return res.status(500).send({ login: error });
    }
  },

  updateBlockList: (req, res) => {
    const { user_id } = req.params;
    const { blockUserId } = req.body;
    try {
      UserModel.findOneAndUpdate(
        {
          _id: user_id,
        },
        {
          $push: {
            blockList: blockUserId,
          },
        },
        null,
        (err, doc) => {
          if (err) {
            throw err;
          } else {
            return res.status(200).send({ doc });
          }
        }
      );
    } catch (error) {
      console.log({ updateBL: error });
      return res.status(500).send({ updateBL: error });
    }
  },
};
