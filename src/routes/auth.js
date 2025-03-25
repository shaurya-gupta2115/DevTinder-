//authRouter manages the routes for  auth from apiList.md

const express = require("express");
const validator = require("validator")
const authRouter = express.Router();
// Unlike express(), which creates a full Express application, express.Router() is used to create modular route handler
// This is useful for grouping related routes together (e.g., authentication-related routes inside authRouter)

const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const { userAuth } = require("../middlewares/auth")

authRouter.post("/signup", async (req, res) => {
  // console.log(req.body)
  // const user = new User({
  //   firstName: "Sanskriti",
  //   lastName: "Jaiswal",
  //   email: "sansu2125@gmail.com ",
  //   mobileNumber: 9842323717,
  // });

  try {
    // const bcrypt = require("bcrypt"); //module imported

    //validation of data from the signup given by the user
    validateSignUpData(req);

    // extraction the data from the dataset gained from the req body
    const { firstName, lastName, mobileNumber, email, age, gender, password } =
      req.body;

    //encrypting the password entered by the user
    // we use bcrypt algorithm to encrypt the password

    // bcrypt.hash(password, 10, function (err, hashedPassword) {
    //   if (err) {
    //     console.log("error generating the hash function ");
    //   }
    //   req.body.password = hashedPassword;
    //   console.log("hashed password is : ", hashedPassword); //here we just displayed the password ..we even had not manipulated anything hence
    // });

    const passwordHash = await bcrypt.hash(password, 10);

    //thing i have to remember is that when we are usign the bcrypt then it can return both a promise as well as callback.
    //since  await bcrypt.hash(password, 10, function (err, hash) {....} is callback, a promise then await use is no mean hence
    // either return a promise  or remove the "await" word ...
    // if your are using promise to be returned then we have to use the word await in this

    //bcrypt.hash() is asynchronous
    // •	It does NOT return a value directly.
    // •	Instead, it executes the callback later, once hashing is complete.

    const user = new User({
      firstName,
      lastName,
      mobileNumber,
      email,
      age,
      gender,
      password: passwordHash,
    });

    await user.save();
    res.send("Yes , data is successfuly stored at the databse ...");
  } catch (err) {
    res.status(400).send("Data Failed to store: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    //WE WILL do email sanitization
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      // throw new Error("The email is wrong please enter correct one") //do not display whether it is present or not =  data leaking ...just say invalid credential
      throw new Error("Enter valid e-mail ");
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    // console.log(user)

    // there  is function to check which is bcrypt.compare() which gives true or false boolean vlaue

    // const isPasswordValid = await bcrypt.compare(password, user.password) ; //or we can do the same using the following code devised in the userSchema Model
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // console.log("yes password is valid")

      //when the password is valid then we create JWT token and the concept of cookie comes here
      //(JWT - TOKEN CREATION)::::::::::::::::::::::::::::::::::::::::::
      const token = await user.getJWT(); //first is the {data to be hidden} and Dev@Tinder2025 is secret key which server only know it

      //(ADDING TOKEN TO COOKIE and Sending response back to the user)::::::::::::::::::::::::::::::::::::
      res.cookie("token", token), { expires: new Date(Date.now() + 900000) }; //login just injects the cookie into cookies section
      // for cookie to expire we use {expires: new Date(Date.now() + 900000)} while in JWT token expiry we write {expiresIn : "0d"}

      res.send("yes password is Correct!! --> Login Successful ");
    } else {
      // console.log("password is not valid");
      // return res.status(400).json({ error: "NO -> password entered is not valid" })
      // throw new Error("Password entered is not valid")
      throw new Error("Invalid Credential");
    }
  } catch (err) {
    // console.log("Login api - catch block hit" + err.message)
    res.status(400).send("ERROR: " + err.message); // ab jaha se. errror aa rha hai wo error --> err me store ho ga aur usko as a message hum user ko bhej de rhe haiii
    // this is the logic behind ..ki waha pr throw krdoge aur yaha pr bhi throw to kya hi mtlb rhega...ye catch block haii ...agar error ho rha hai to yaha manage krna hai...yaha
    //pr bhi error nhi maar dena haiii....to as a response send kro .jonsa error hit kiya haii then use
  }
});

authRouter.post("/logout", async (req,res) => {
  // this is logout api 
  res.cookie("token", null, {
    expires: new Date(Date.now())
  })
  res.send("Logout is successful");

})

module.exports = authRouter;
