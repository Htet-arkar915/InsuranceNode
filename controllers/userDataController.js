const UserData = require("../models/userInformations");

const getAllUserData = async (req, res) => {
  const userdata = await UserData.find();
  if (!userdata) return res.status(204).json({ message: "No User data found" });
  res.json(userdata);
  res.end();
};
function isValidEmail(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  return emailRegex.test(email);
}

const createUserData = async (req, res) => {
  if (
    !req?.body?.name ||
    !req?.body?.nrc ||
    !req?.body?.phone ||
    !req?.body?.dob ||
    !req?.body?.email ||
    !req?.body?.benifitName ||
    !req?.body?.benifitContact
  ) {
    return res.status(401).json({ message: "User Information are require" });
  } else if (!isValidEmail(req.body.email)) {
    return res.status(401).json({ message: "Email is not valid" });
  } else {
    try {
      const User = await UserData.create({
        name: req.body.name,
        nrc: req.body.nrc,
        phone: req.body.phone,
        dob: req.body.dob,
        email: req.body.email,
        benifitName: req.body.benifitName,
        benifitContact: req.body.benifitContact,
      });
      res.status(201).json(User);
    } catch (e) {
      console.log(e);
    }
  }
};

const findUserbyNrc = async (req, res) => {
  if (!req?.body?.nrc) {
    return res.status(401).json({ message: "User NRC is required" });
  } else {
    const userdata = await UserData.findOne({
      nrc: req.body.nrc,
    });

    if (!userdata) {
      return res.json({ message: `There is no user with NRC ${req.body.nrc}` });
    } else {
      res.status(201).json(userdata);
    }
  }
};
module.exports = {
  getAllUserData,
  createUserData,
  findUserbyNrc,
};
