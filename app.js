const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const db = "mongodb+srv://token:1234@cluster0-p38df.gcp.mongodb.net/test?retryWrites=true&w=majority";

const nhso = require("./routes/nhso");
const h2s = require("./routes/h2s");

mongoose.connect(db, { dbName: "nhso" });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","GET,POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/nhso", nhso);

app.use("/h2s", h2s);

app.get("/", function(req, res) {
  res.send("hello world");
});

app.listen(port, function() {
  console.log("app listening on port: " + port);
});
