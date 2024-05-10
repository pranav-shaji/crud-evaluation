const router = require("express").Router();
const bcrypt = require("bcrypt");
const userdetails = require("../crud evaluation/userSchema");
const jwt = require("jsonwebtoken")
const validate = require("../crud evaluation/jwtvalidation")

router.post("/signUp", async (req, res) => {
  if (req.body.email == "" || req.body.password == "") {
    return res.json({ message: "all fileds are required" });
  }
  try {
    result = await userdetails.findOne({ email: req.body.email });
    if (result) {
      return res.json({ message: "user already exist" });
    } else {
      hashpassword = await bcrypt.hash(req.body.password, 10);
      console.log(hashpassword);
      await userdetails.create({
        email: req.body.email,
        password: hashpassword,
        username:req.body.username
      });
      return res.json({ message: "user created" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "server error" });
  }
});

router.get("/login", async (req, res) => {
  if (req.body.email == "" || req.body.password == "") {
    return res.json({ message: "all fileds are required" });
  }
  try {
    result = await userdetails.findOne({ email: req.body.email });

    if (result) {
      match = await bcrypt.compare(req.body.password, result.password);
      if (match) {
      let token = jwt.sign(req.body,"123",{expiresIn:1000 * 60 * 60 * 24})
      console.log(token);
      res.json(token);
      }
    
    } else {
      return res.json({ message: "password is incorrect" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "server error" });
  }
});

router.get("/get-all-users",validate, async (req, res) => {
  try {
    result = await userdetails.find();
    return res.json({ message: "list of all users", result: result });
  } catch (error) {
    return res.json({ message: "server error" });
  }
});
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    result = await userdetails.findByIdAndDelete(req.params.id);
    console.log("user deleted");
    return res.json({ message: "user deleted" });
  } catch (error) {
    return res.json({ message: "server error" });
  }
});

router.patch("/updateUser/:id", async (req, res) => {
  try {
    result = await userdetails.findByIdAndUpdate(req.params.id, {
      email:req.body.email,
    });
    if (result) {
      return res.json({ message: "user updated" });
    } else {
      return res.json({ message: "user not updated" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "server error" });
  }
});

module.exports = router;
