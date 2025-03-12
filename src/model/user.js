const mongoose = require("mongoose");

//defing the user  Schema

// Notice above that if a property only requires a type, it can be specified using a shorthand notation (contrast the lastName, firstName property above with the date property).

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    }, // String is shorthand for {type: String}
    lastName: { type: String },
    mobileNumber: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!["Male", "Female", "Others"].includes(value)) {
          throw new Error("Gender must be Male, Female, or Others.");
        }
      },
    },
    // date: { type: Date, default: Date.now }, //ye sb cheeze timestamps poori krdega
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
      default: "This is default about section of User",
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
    },
  },
  {
    timestamps: true,
  }
);

//creating a model ... we use here capital letter to denote that this is model
const User = mongoose.model("User", userSchema);

module.exports = User;
