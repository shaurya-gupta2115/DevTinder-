const validator = require("validator")

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body

    if(!firstName || !lastName){
        throw new Error("Please enter Firstname and Lastname both")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Enter valid e-mail id ")
    }
    else id (!validator.isStrongPassword(password)){
        throw new Error("Enter strong password please")
    }
}

module.exports = {
    validateSignUpData
}