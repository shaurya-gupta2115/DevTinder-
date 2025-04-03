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
const { ConnectionPoolMonitoringEvent } = require("mongodb");
const User = require("../model/user");
// here userRouter has became router

const USER_SAFE_DATA = "firstName lastName skills age gender about photoUrl";

//get all the pending connection requests for loggedInUser
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstName lastName skills age gender about photoUrl"
    );
    // .populate("fromUserId", ["firstName", "lastName"]);

    const data = connectionRequests.map((single) => single.fromUserId);

    // if (!connectionRequests) {
    //   throw new Error("You do not have any connection request ;) ");
    // }

    res.json({
      message: "This is the following data for the connection request : ",
      data: connectionRequests,
      // data,
    });
  } catch (err) {
    res.status(400).send("Error is ; " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    // const connectionAccepted = connectionRequests.map((k) =>
    //   k.fromUserId
    // );

    const connectionAccepted = connectionRequests.map((row) => {
      //senders. -> loggedInUser
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    // •	If loggedInUser is the sender (fromUserId), we take the receiver (toUserId).
    // •	Otherwise, if loggedInUser is the receiver (toUserId), we take the sender (fromUserId).

    res.json({
      message: "These are following your connections :) ",
      // data: connectionRequests,
      data: connectionAccepted,
    });
  } catch (err) {
    res.status(400).send("Error is ; " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    //find all connection request which are sent + received from/to loggedInUser respectively
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");
    // .populate("fromUserId", "firstName lastName")
    // .populate("toUserId", "firstName lastName");

    console.log(connectionRequests);

    const hideUserFromFeed = new Set();

    connectionRequests.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });

    console.log(hideUserFromFeed);

    // res.send(Array.from(hideUserFromFeed)); //since it is json file then we do have to convert into array otherwise it will give us an empty object
    // res.send(connectionRequests);

    const userExceptHidden = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(USER_SAFE_DATA);

    res.send(userExceptHidden);

    // console.log(userExceptHidden);
  } catch (err) {
    res.status(400).json({
      message: "Error: " + err.message,
    });
  }
});

module.exports = userRouter;
