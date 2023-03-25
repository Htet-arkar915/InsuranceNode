const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const insuranceSchema = new Schema({
  day: {
    type: Number,
    require: true,
  },
  age1to60: {
    type: Number,
    require: true,
  },
  age61to75: {
    type: Number,
    require: true,
  },
  ageabove75: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Insurance", insuranceSchema);
