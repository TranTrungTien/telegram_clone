const AttachmentModel = require("../Models/attachmentsModel");
const Busboy = require("busboy");
const { v4 } = require("uuid");
const drive = require("../Utils/GoogledirveConnection");

module.exports = {
  createNewAttachment: async (req, res) => {
    const { message_id } = req.params;
    let hasFinished = false;
    let filesCounter = 0;
    let filesList = [];
    const busboy = new Busboy({ headers: req.headers });

    busboy.on("file", async (fieldName, file, fileName, encoding, mimeType) => {
      console.log({ fieldName, fileName });
      ++filesCounter;
      try {
        const response = await drive.files.create({
          requestBody: {
            name: v4() + "-" + fieldName + "-" + fileName,
            mimeType: mimeType,
            parents: ["1eOKOmwOdJ5T4Q3DNc_ZC3dprbqVVVHEa"],
          },
          media: {
            mimeType: mimeType,
            body: file,
          },
        });
        if (response) {
          --filesCounter;
          const fileData = {
            attachment_id: response.data?.id,
            dataName: response.data?.name,
            path:
              `http://localhost:8080/api/assets/${
                mimeType.includes("image") ? "image/" : "video/"
              }` + response.data?.id,
            type: mimeType,
            size: Number(fieldName),
          };
          filesList.push(fileData);
          if (filesCounter === 0 && hasFinished) {
            try {
              const attachment = new AttachmentModel({
                message: message_id,
                data: filesList,
              });
              const response = await attachment.save();
              console.log({ response });
              if (response) {
                return res.status(201).send({ response });
              } else {
                return res.status(500).send({ createAttchment: err });
              }
            } catch (error) {
              console.log({ error });
              return res.status(500).send({ createAttchment: err });
            }
          }
        }
      } catch (err) {
        console.log({ createAttchment: err });
        return res.status(500).send({ createAttchment: err });
      }
    });

    busboy.on("finish", () => {
      hasFinished = true;
    });
    req.pipe(busboy);
  },
  updateNewAttachment: (req, res) => {
    const { message_id } = req.params;

    const tmpData = {
      attachment: "attachmentID",
      dataName: "dataName",
      path: "/path",
      type: "mp4",
    };

    try {
      AttachmentModel.findOneAndUpdate(
        {
          message: message_id,
        },
        {
          $push: {
            data: tmpData,
          },
        },
        { upsert: false, new: true },
        (err, doc) => {
          if (err) {
            throw err;
          } else {
            return res.status(200).send({ doc });
          }
        }
      );
    } catch (error) {
      console.log({ updateAttachment: err });
      return res.status(500).send({ updateAttachment: err });
    }
  },
  deleteAttachment: (req, res) => {
    const { message_id } = req.params;
    try {
      AttachmentModel.findOneAndDelete(
        {
          message: message_id,
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
      console.log({ deleteAttachment: err });
      return res.status(500).send({ deleteAttachment: err });
    }
  },
  readAttachment: (req, res) => {
    const { message_id } = req.params;
    try {
      AttachmentModel.findOne({
        message: message_id,
      })
        .populate("message")
        .exec((err, result) => {
          if (err) {
            throw err;
          } else {
            return res.status(200).send({ result });
          }
        });
    } catch (error) {
      console.log({ readAttachment: err });
      return res.status(500).send({ readAttachment: err });
    }
  },
};
