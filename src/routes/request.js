const express = require("express");
const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../model/connectionRequest");
const User = require("../model/user");

requestsRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    //status includes -> Interested,
    try {
      const user = req.user;
      //sending a connection request
      console.log("Sending a connection request");

      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //i have to do validations for it like if i say accepted , or rejected...it should throw an error for it
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        throw new Error("The request is not allowed to proceed ");
      }

      //to avoid duplicacy and same request from the another user i have to ma ke the checksto avoid thi s
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId }, //this avoids to send duplicate request to the same user

          { fromUserId: toUserId, toUserId: fromUserId }, // this denies second user to send request back the the person who has sent the request iniitially to him
        ],
      });
      if (existingConnectionRequest) {
        throw new Error("Request already exist :) ");
      }

      //checking whether the connection request to be send is present in the DB. or not
      // if it is present in the DB then only you can send it request otherwise no request should be send
      const isUserPresentInDB = await User.findOne({ _id: toUserId });
      //what i made incorrection is : using ConnectionRequest model to findOne instead User model where all data is present
      // second mistake is to pass toUserId directly instead of giving as object ...
      if (!isUserPresentInDB) {
        res.status(400).json({
          message: "No user present with this UserId. Please check it again ",
        });
      }

      //another check is to avoid to send connection request to ownself
      // const selfConnectionRequest = await ConnectionRequest.findOne({
      //   fromUserId: fromUserId,
      //   toUserId: fromUserId,
      // });

      // if (!selfConnectionRequest) {
      //   throw new Error("You cannot send connection request to yourself");
      // }

      // Check to avoid sending a connection request to oneself
      // if (fromUserId.toString() === toUserId.toString()) {
      //   throw new Error("You cannot send a connection request to yourself");
      // }
      //this is the way in which i can make to check the userid whether they are same or not but
      //in reality we have to use the function using the .pre which will check everytime the save event will be called

      //building new connection through connection.model
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: `${user.firstName} sent the status ${status} request`,
        data,
      });
    } catch (err) {
      res.status(400).json({ message: ` ${err}` });
    }
  }
);

module.exports = requestsRouter;
