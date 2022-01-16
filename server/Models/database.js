const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "config.env") });

module.exports = () => {
  try {
    mongoose.connect(
      process.env.MONGOOSE_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (error) => {
        if (!error) {
          console.log("Connect to DB Successfully");
        } else {
          throw error;
        }
      }
    );
  } catch (error) {
    console.log("Can not connect to DB");
    console.log({ error });
    process.exit();
  }
};
