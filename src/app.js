//iin this the express module is loaded into the express variable and that express do contain various functions which
// are written in the abstracted manner just to make function get used of it

const express = require("express");
const app = express();

//importing auth from middlewares
// const {auth} = require("./middlewares/auth")

//##############################################################################################################

// app.use("/help", (req, res) => {
//   res.send("hey!! i am in helping page ");
// });

// if we use this --> then all the further pages will unable to send the request hence we avoid this
// app.use("/", (req, res) => {
//   res.send("hey!! i am in home page ");
// });

// app.use("/document/2", (req, res) => {
//     res.send("This is the 2nd document page");
// });

// app.use("/document", (req,res)=>{
//     res.send("This is the document page")
// })
//here the ORDER MATTER during giving them routes :)

//##############################################################################################################

//get is subjected to get the information of first page
//this will only handle GET call to /first
// app.get("/first",(req,res) => {
//     res.send("first get is executed")
// })

//post is subjected to store the information
//this will only hand POST call to /first
// app.post("/first" , async (req,res) => {
//     // console.log("the data is being saved . Please wait for a moment ...")
//     //logic to save the data on the hardware / server
//     res.send("first post is executed")
// })

//what if i use app.use("/first")??? like this
// app.use("/first", (req, res) => {
//     res.send("first first use is running now")
// })
//this will over-ride the post method of /first/first using app.use("/first/first") or app.use("/first") both ways
//blocks both post and get both also do matching :)

//here over-riding is not there i.e. /first/first will not be taken by /first by matching
//this will only handle POST  call to /first/first
// app.post("/first/first", async (req, res) => {
//   // console.log("the data is being saved . Please wait for a moment ...")
//   res.send("first/first post is executed");
// });

// app.get("/first/first", (req, res) => {
//   // console.log("the data is being saved . Please wait for a moment ...")
//   res.send("first/first get is executed");
// });

//###############################################################################################################################

//here we are doing different different types in which we can name the adrees like "ab+c", "ab*c", "a(bc)+d" , "/ab/" etc

// app.get("/ab+c", (req, res) => {
//   res.send("this is for ab+c where we can use abbbbbbbbbc");
// });

// app.get("/a(bc)+d", (req, res) => {
//   res.send("this is for a(bc)+d where we can use abcd");
// });

// app.get("/a*d", (req, res) => {
//   res.send("this is for a*d where we can use -> a(anything)d ");
// });

// app.get("/ab?d", (req, res) => {
//   res.send("this is for ab?d where we can use -> a(b is optional)d ");
// });

// app.get("/a/", (req,res) => {
//   res.send("this is for /a/ where we can use -> a should be present that's it ");
// });

//writing with regular expression Regex
// app.get(/a/, (req,res) => {
//   res.send("this is for /a/ where we can use -> a should be present that's it ");
// });

// app.get("/user/:name", (req,res) => {
//     console.log(req.params)
//     res.send("params are send at that end")
// })
// app.get("/user", (req, res) => {
//   console.log(req.query);
//   res.send("id query is send");
// });

//################################# -> Middlewares and Error Handlers <- #############################################################################

// app.use(
//   "/user",
//   (req, res,next) => {
//     //nothing written //api keep on sending req but there is no response
//     console.log("Handling the route...");
//     // res.send("Response!!");
//     next()
//   },
//   (req, res,next) => {
//     //nothing written //api keep on sending req but there is no response
//     console.log("Handling the 2ndroute...");
//     res.send("2nd Response!!");
//     next()
//   },
//   (req,res,next) => {
//     res.send("3rd response")
//   }
// );

//######################################## -> APPLYING MIDDLEWARE CONCEPT <- #######################################################################################

// app.get("/admin/photos", (req, res, next) => {
//     const token = "xyz";
//     const isAdminAuthorised = (token === "xyz");
//     if(isAdminAuthorised){
//         res.send("here are your photos dear")
//     }
//     else{
//         res.send("pehle authorisation krke ao firse dekhna photo")
//     }
// })

// app.get("/admin/profile", (req, res, next) => {
//   const token = "xyzdfsd";
//   const isAdminAuthorised = token === "xyz";
//   if (isAdminAuthorised) {
//     res.send("here are your profile dear");
//   } else {
//     res.send("pehle authorisation krke ao firse dekhna profile");
//   }
// });

// to avoid this redundancy in authorisation -> the concept of middleware came into existence

// app.use("/admin", auth)

// app.get("/admin/profile", (req, res, next) => {
//     res.send("here are your profile dear")
//   }
// );

// //is catch wale ko upr likhenge to bekaar ho jaega ...kyunki profile wale me bhi catch wala response send hoga
// app.use("/admin/*", (req, res) => {
//   res.status(404).send("yeh page exist nahi karta, kahin aur jao!");
// });
//########################################## -> Error Handling <- ####################################################################

// app.get("/getUserData", (req,res) =>{
//     // throw new Error("this is an error");
//     // res.send("User  Data   Sent");
//     try{
//     //   throw new Error("this is an error");
//       console.log("Error caught in try block ") //this didnot run because as soon as throw get caught in try block it goes on the catch block to tackle this
//     }
//     catch{
//         res.status(500).send("Unable to fetch the user data due to internal security error ")

//     }
// })

// app.use("/", (err,req, res, next) => {
//     if(err){
//         //log your error from here
//         res.status(500).send("Something went wrong");
//     }

// })

//#######################################  --> Database Started <-- #######################################################################

//refer database.js for notes reference

//##############################################################################################################

// see here in thi swe have 3 pages named as help,/ , and document and in this matching of the
//routes are done and if the given route is matched then it will open that particualr matched route
//instead of going to match route further .... hence the order or routing matters in this

// create structure which says port 7777 to listen and give a call back to show in the terminal panel

// Working with mongoose started from here :     ###################################################################

const { connectDB } = require("./config/database"); //instead connectDB , we destructured  to { connectDB }

const User = require("./model/user");
const { Model } = require("mongoose");
const { ReturnDocument } = require("mongodb");
const { validateSignUpData } = require("./utils/validation");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json()); //this will help me to convert json file into js object which i can use further
app.use(cookieParser()); //abhi tk hum cookie aa rhi thi woo hum read nhi kr paa rhe the in profile request jb ho rhi thi ...but ab humne install kr liya haiii and we can now read the cookie which is being coming when requested by the client

app.post("/signup", async (req, res) => {
  // console.log(req.body)
  // const user = new User({
  //   firstName: "Sanskriti",
  //   lastName: "Jaiswal",
  //   email: "sansu2125@gmail.com ",
  //   mobileNumber: 9842323717,
  // });

  try {
    // const bcrypt = require("bcrypt"); //module imported

    //validation of data from the signup given by the user
    validateSignUpData(req);

    // extraction the data from the dataset gained from the req body
    const { firstName, lastName, mobileNumber, email, age, gender, password } =
      req.body;

    //encrypting the password entered by the user
    // we use bcrypt algorithm to encrypt the password

    // bcrypt.hash(password, 10, function (err, hashedPassword) {
    //   if (err) {
    //     console.log("error generating the hash function ");
    //   }
    //   req.body.password = hashedPassword;
    //   console.log("hashed password is : ", hashedPassword); //here we just displayed the password ..we even had not manipulated anything hence
    // });

    const passwordHash = await bcrypt.hash(password, 10);

    //thing i have to remember is that when we are usign the bcrypt then it can return both a promise as well as callback.
    //since  await bcrypt.hash(password, 10, function (err, hash) {....} is callback, a promise then await use is no mean hence
    // either return a promise  or remove the "await" word ...
    // if your are using promise to be returned then we have to use the word await in this

    //bcrypt.hash() is asynchronous
    // •	It does NOT return a value directly.
    // •	Instead, it executes the callback later, once hashing is complete.

    const user = new User({
      firstName,
      lastName,
      mobileNumber,
      email,
      age,
      gender,
      password: passwordHash,
    });

    await user.save();
    res.send("Yes , data is successfuly stored at the databse ...");
  } catch (err) {
    res.status(400).send("Data Failed to store: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    //WE WILL do email sanitization
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      // throw new Error("The email is wrong please enter correct one") //do not display whether it is present or not =  data leaking ...just say invalid credential
      throw new Error("Enter valid e-mail ");
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credentials" );
    }
    // console.log(user)

    // there  is function to check which is bcrypt.compare() which gives true or false boolean vlaue

    // const isPasswordValid = await bcrypt.compare(password, user.password) ; //or we can do the same using the following code devised in the userSchema Model
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // console.log("yes password is valid")

      //when the password is valid then we create JWT token and the concept of cookie comes here
      //(JWT - TOKEN CREATION)::::::::::::::::::::::::::::::::::::::::::
      const token = await user.getJWT(); //first is the {data to be hidden} and Dev@Tinder2025 is secret key which server only know it

      //(ADDING TOKEN TO COOKIE and Sending response back to the user)::::::::::::::::::::::::::::::::::::
      res.cookie("token", token), { expires: new Date(Date.now() + 900000) }; //login just injects the cookie into cookies section
      // for cookie to expire we use {expires: new Date(Date.now() + 900000)} while in JWT token expiry we write {expiresIn : "0d"}

      res.send("yes password is Correct!! --> Login Successful ");
    } else {
      // console.log("password is not valid");
      // return res.status(400).json({ error: "NO -> password entered is not valid" })
      // throw new Error("Password entered is not valid")
      throw new Error("Invalid Credential");
    }
  } catch (err) {
    // console.log("Login api - catch block hit" + err.message)
    res.status(400).send("ERROR: " + err.message); // ab jaha se. errror aa rha hai wo error --> err me store ho ga aur usko as a message hum user ko bhej de rhe haiii
    // this is the logic behind ..ki waha pr throw krdoge aur yaha pr bhi throw to kya hi mtlb rhega...ye catch block haii ...agar error ho rha hai to yaha manage krna hai...yaha
    //pr bhi error nhi maar dena haiii....to as a response send kro .jonsa error hit kiya haii then use
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
 
    const user = req.user;

    res.send(":::::::::::; Here is your profile:::::::::::;" + user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established Succesfully ");
    //here we connected database first and then server started listening it after
    app.listen(7777, () => {
      console.log("server is running and listening the request...");
    });
  })
  .catch((err) => {
    console.log("Error while connecting to get the database ");
  });
