require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvent");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const mongoose = require("mongoose");
const connectDb = require("./config/dbConn");
const PORT = process.env.PORT || 3500;
const corsOptions = require("./config/corsOptions");
const cookieParaser = require("cookie-parser");

connectDb();
app.use(logger);
//app.use(cors(corsOptions));
//app.options("*", cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParaser());
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/root"));

try {
  app.use("/insurance", require("./routes/api/insurance"));
} catch (e) {
  console.log(e);
}
app.use("/user", require("./routes/api/user-data"));

app.use("/sendmail", require("./routes/api/mail"));
//app.use(verifyJWT);
//app.use("/userdata", require("./routes/api/user-data"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDb");
  app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
});
