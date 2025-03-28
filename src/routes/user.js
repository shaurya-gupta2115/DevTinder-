// ## userRouter
// - Get /user/requests
// - GET /user/connections
// - GET /user/dfeel -> Gets you all the profiles present in the platform

// thought process of post api and get api is different here.....you are not allowing to put some data
// into your database instead here authorisation and authentication should be there so that any data to be sent
// should be sent to that user who has the access of the account to modify

const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../model/connectionRequest");
// here userRouter has became router

//get all the pending connection requests for loggedInUser
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName skills age gender about photoUrl")
    // .populate("fromUserId", ["firstName", "lastName"]);

    // if (!connectionRequests) {
    //   throw new Error("You do not have any connection request ;) ");
    // }

    res.json({
      message:"This is the following data for the connection request : ",
      data : connectionRequests,
    })

  } catch (err) {
    res.status(400).send("Error is ; " + err.message);
  }
});

userRouter.get("")

module.exports = userRouter;