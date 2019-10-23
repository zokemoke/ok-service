const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdapterSchema = new Schema(
  {
    LogTime: { type: String },
    Type: { type: String },
    // data: [Schema.Types.Mixed]
  },
  { strict: false }
);

module.exports = mongoose.model('h2s_adapter', AdapterSchema);
