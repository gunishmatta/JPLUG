const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const serviceAccount = require("./config/firebaseKey.json"); /* Create this file */

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://jplug-87c44.firebaseio.com/" /* Change to your database */
});

function checkAuth(req, res, next) {
  if (req.headers.authtoken) {
    admin
      .auth()
      .verifyIdToken(req.headers.authtoken)
      .then(() => next())
      .catch(() => res.status(403).send("Unauthorized"));
  } else {
    res.status(403).send("Unauthorized!");
  }
}

app.use("/", checkAuth);

app.get("/", (req, res) => {
  res.json({
    message: "Data accessed from server!"
  });
});

module.exports = app;
