// const auth = (req, res, next) => {
//   const token = "xyz";
//   const isAdminAuthorised = token === "xyz";
//   if (!isAdminAuthorised) {
//     res.status(401).send("pehle authorisation krke ao firse dekhna photo");
//   } else {
//     next();
//   }
// };

// module.exports = {auth}

const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req, res, next) => {
  try {
    //steps to do it :

    // reading the cookie from the req
    const { token } = req.cookies;

    //if token is not present
    if (!token) {
      return res.status(401).json("You are not loggedIn...");
    }

    //verify the cookie for the session
    const decodedObj = await jwt.verify(token, "Dev@Tinder2025"); //ye payload deta haii like jo tum info dete ho during login wo deta hai yaha pr

    //find the user
    const { _id } = decodedObj;
    const user = await User.findById(_id);

    // if (!user) {
    //   throw new Error("User not found");
    // }
    if (!user) return res.status(404).send("User not found");

    //user ki information ko request ke sath attach krdiya ..ki jb bhi info chahiye hogi to hum req se user ko extract krlegne

    req.user = user; //By assigning user to req.user, we make the authenticated user’s data available in any subsequent route handler that needs it.
    //This avoids unnecessary duplicate database queries in every request that requires user information
    next();
  } catch (err) {
    res.status(400).send("Error got:" + err.message);
  }
};

module.exports = { userAuth };
