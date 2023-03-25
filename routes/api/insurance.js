const express = require("express");
const router = express.Router();
const insuranceController = require("../../controllers/insuranceController");

router
  .post("/", insuranceController.getInsuranceResult)
  .get("/alldata", insuranceController.getAllInsurance)
  .post("/", insuranceController.createInsurance);
module.exports = router;
