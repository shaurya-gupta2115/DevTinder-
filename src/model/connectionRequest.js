const mongoose = require("mongoose");
const User = require("./user");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      ref: "User",//reference to the user collection 
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "accepted", "interested", "rejected"], // kewal inme se hi hoge status jo bhi hoga
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);
const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

//every time saving the save event happens , then this function will matcht
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;

  // we can do anything whenever i want to go through an event

  //checking fromUserId === toUserId
  if (!connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error(
      "the connection to save  has isssue as same user is seding request to ownself"
    );
  }

  //since this is middleware ...you have to call next() function
  next();
});

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }); // agar dono mention kr rhe haiii ki fast ho ..to dono me hume 1 likhna pdega
// aisa nhi krte ki kuchh bhi kisii me bhi indexing krde...because it do take storage high to manage all those and 
// slower down the process of update , delete and more operations

module.exports = ConnectionRequestModel;
