const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const db = "mongodb+srv://token:1234@cluster0-p38df.gcp.mongodb.net/test?retryWrites=true&w=majority";

const nhso = require("./routes/nhso");

mongoose.connect(db, { dbName: "nhso" });

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/nhso", nhso);

app.get("/", function(req, res) {
  console.log("app starting on port: " + port);
  res.send("tes express nodejs mongodb");
});

app.listen(port, function() {
  console.log("app listening on port: " + port);
});
