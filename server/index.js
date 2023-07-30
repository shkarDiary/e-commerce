const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model.js"); // Update the import to the correct User model
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://shkar:shkardiary123@cluster0.ethg3gu.mongodb.net/shkar",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.post("/api/register", async (req, res) => {
  console.log(req.body);

  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.send(user);
  } catch (error) {
    res.json({ status: "error", error: error });
    console.error(error);
  }
});
app.post("/api/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        "secret123"
      );
      console.log(token);
      res.json({ status: "ok", user: token });
    } else {
      res.json({ status: "400" });
    }
  } catch (error) {
    res.json({ status: "error", error: error });
    console.error(error);
  }
});
app.listen(1337, () => {
  console.log("Server started on port 1337");
});
