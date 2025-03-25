const validator = require("validator");

const validateSignUpData = (req) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
      throw new Error("Please enter Firstname and Lastname both");
    } else if (!validator.isEmail(email)) {
      throw new Error("Enter valid e-mail id ");
    } else if (!validator.isStrongPassword(password)) {
      throw new Error("Enter strong password please");
    }
  } catch (err) {
    console.log("this did worked in validation js");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "gender",
    "about",
    "photoUrl",
    "age",
    "skills"
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
