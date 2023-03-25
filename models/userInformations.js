const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userDataSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  nrc: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  benifitName: {
    type: String,
    required: true,
  },
  benifitContact: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Userdata", userDataSchema);
