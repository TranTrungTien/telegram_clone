const drive = require("../Utils/GoogledirveConnection");

module.exports = {
  getImageAsset: (req, res) => {
    const { asset_id } = req.params;

    try {
      drive.files.get(
        {
          fileId: asset_id,
          alt: "media",
        },
        {
          responseType: "stream",
        },
        (err, data) => {
          if (err) {
            console.log({ getImageAsset: err });
            return res.status(500).send({ getImageAsset: err });
          } else {
            data.data.pipe(res);
          }
        }
      );
    } catch (error) {
      console.log({ getImageAsset: error });
      return res.status(500).send({ getImageAsset: error });
    }
  },
  getVideoAsset: (req, res) => {
    const { asset_id, sizeSize } = req.params;

    const range = req.headers.range || "range=0";
    const video_id = asset_id;
    if (!range) return res.status(400).send({ message: "Require range" });

    const size = Number(sizeSize) || 0;

    console.log(video_id, " : ", size);
    //const start = Number(range.replace(/\D/g, ""));
    // const end = Math.min(start + chunk, size - 1);
    // const contentLength = end - start + 1;
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
    const contentLength = end - start + 1;
    const headers = {
      "Content-Type": "video/mp4",
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
    };
    try {
      drive.files.get(
        {
          fileId: video_id,
          alt: "media",
          headers: {
            Range: `bytes=${start}-${end}`,
          },
        },
        { responseType: "stream" },
        (err, data) => {
          if (err) return res.status(500).send({ getvideoAccess: error });
          if (data) {
            res.writeHead(206, headers);
            data.data
              .on("end", () => console.log("done"))
              .on("error", (error) => console.log(error))
              .pipe(res);
          }
        }
      );
    } catch (error) {
      console.log({ getvideoAccess: error });
      return res.status(500).send({ getvideoAccess: error });
    }
  },
};
