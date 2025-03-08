const mongoose = require("mongoose");

//defing the user  Schema

// Notice above that if a property only requires a type, it can be specified using a shorthand notation (contrast the lastName, firstName property above with the date property).

const userSchema = new mongoose.Schema({
  firstName: String, // String is shorthand for {type: String}
  lastName: String,
  mobileNumber: Number,
  email: String,
  gender: String,
  date: { type: Date, default: Date.now },
});

//creating a model ... we use here capital letter to denote that this is model
const User = mongoose.model("User", userSchema);

module.exports = User;
