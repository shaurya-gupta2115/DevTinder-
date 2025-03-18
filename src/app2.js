// const express = require("express");
// const app2 = express();

// const { connectDB } = require("./src/config/database");

// app2.use("/user", (req, res) => {
//   console.log("/user path is running ");
// });

// app2.get("/user/username", (req, res) => {
//   console.log("/username path is running ");
// });

// connectDB()
//   .then(() => {
//     console.log("Database connection established Succesfully ");
//     //here we connected database first and then server started listening it after
//     app2.listen(8888, () => {
//       console.log("server is running and listening the request...");
//     });
//   })
//   .catch((err) => {
//     console.error("Error while connecting to the database:", err);
//   });;

const express = require("express");
const app2 = express();

const { connectDB } = require("./config/database"); //instead connectDB , we destructured  to { connectDB }

// const User = require("./model/user");
// const { Model } = require("mongoose");
// const { ReturnDocument } = require("mongodb");

// const { connectDB } = require("./src/config/database"); // Use relative path

app2.get("/user/username", (req, res) => {
  try {
    console.log("/username path is running ");
    res.send("Username route accessed!");
  } catch (err) {
    console.log("failed");
  }
});

app2.get("/user", (req, res) => {
  try {
    console.log("/user path is running ");
    res.send("User route accessed!");
  } catch (err) {
    console.log("failed");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established successfully.");
    app2.listen(8888, () => {
      console.log("Server is running and listening for requests...");
    });
  })
  .catch((err) => {
    console.error("Error while connecting to the database:", err);
  });
