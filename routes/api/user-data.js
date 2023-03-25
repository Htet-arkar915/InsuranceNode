const express = require("express");
const router = express.Router();
const userDataController = require("../../controllers/userDataController");

router
  .get("/getalluser", userDataController.getAllUserData)
  .post("/createuser", userDataController.createUserData)
  .get("/finduser", userDataController.findUserbyNrc);
module.exports = router;
