const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  datetime: String,
  token: String,
  cid: Number,
  local: String
});

module.exports = mongoose.model("token", TokenSchema);
