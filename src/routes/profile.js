const express = require("express");
const User = require("../model/user");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(":::::::::::; Here is your profile:::::::::::;" + user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Editing of certain fields are not allowed");
    }
    const loggedInUser = req.user;
    // console.log("User info without change : " + req.user);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save(); // do not send without using await 

    // console.log("User info after change : " + req.user);

    // res.send(`${loggedInUser.firstName} User Information Updated Succesfully`);
    res.json({
      message: `${loggedInUser.firstName} User Information Updated Succesfully`,
      data: loggedInUser
    });

    // loggedInUser.firstName = req.body.firstName;
    // loggedInUser.lastName = req.body.lastName;
  } catch (err) {
    res.status(400).send("Error is ; " + err.message);
  }
});



module.exports = profileRouter;
