const { google } = require("googleapis");
require("dotenv").config({ path: __dirname + "/../config.env" });

const OAuth2 = new google.auth.OAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

OAuth2.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: OAuth2,
});

module.exports = drive;
