const Insurance = require("../models/insurance");

const getInsuranceResult = async (req, res) => {
  console.log(`${req?.body?.day} ${req?.body?.age}`);
  if (!req?.body?.day || !req?.body?.age) {
    return res
      .status(401)
      .json({ message: "Insurance day and age are required" });
  }

  let day = req.body.day;
  let age = req.body.age;
  let insurance = null;
  insurance = await Insurance.findOne({
    day: day,
    //$and: [
    //  {
    //    type: req?.body?.type,
    //  },
    //  {
    //    numday: day,
    //  },
    //],
  });
  if (!insurance) {
    res.status(400).json({ message: `Insurance Details not found` });
  } else {
    let Iprice = 0;
    if (1 < age && age <= 60) {
      Iprice = insurance.age1to60;
    } else if (61 <= age && age <= 75) {
      Iprice = insurance.age61to75;
    } else {
      Iprice = insurance.ageabove75;
    }
    res.status(201).json({ price: `${Iprice}` });
  }
  //res.json({ message: "data" });
  //res.end();
};
const getAllInsurance = async (req, res) => {
  res.header(Access - Control - Allow - Origin, "*");
  res.header(
    Access - Control - Allow - origin,
    "https://insurancenode.onrender.com/"
  );
  res.header(
    Access - Control - Allow - Headers,
    Origin,
    X - Requested - With,
    Content - Type,
    Accept
  );

  const allinsurances = await Insurance.find();
  if (!allinsurances) {
    return res.status(400).json({ message: "There is no insurance" });
  } else {
    res.json(allinsurances);
  }
};
const createInsurance = async (req, res) => {
  if (
    !req?.body?.day ||
    !req?.body?.age1to60 ||
    !req?.body?.age61to75 ||
    !req?.body?.ageabove75
  ) {
    return res.status(401).json({
      message: "Insurance data are required",
    });
  } else {
    try {
      const result = await Insurance.create({
        day: req.body.day,
        age1to60: req.body.age1to60,
        age61to75: req.body.age61to75,
        ageabove75: req.body.ageabove75,
      });
      res.status(201).json(result);
    } catch (e) {
      console.log(e);
    }
  }
};

module.exports = { getInsuranceResult, getAllInsurance, createInsurance };
