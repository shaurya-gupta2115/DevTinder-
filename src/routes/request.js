
const express = require("express")
const requestsRouter = express.Router()
const { userAuth } = require("../middlewares/auth");


requestsRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  //sending a connection request

  console.log("Sending a connection request");

  res.send(user.firstName + " sent the connection request");
});

module.exports = requestsRouter; 

