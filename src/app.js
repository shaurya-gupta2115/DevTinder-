//iin this the express module is loaded into the express variable and that express do contain various functions which
// are written in the abstracted manner just to make function get used of it

const express = require("express");
const app = express();

//importing auth from middlewares
const {auth} = require("./middlewares/auth")

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

app.use("/admin", auth)

app.get("/admin/profile", (req, res, next) => {
    res.send("here are your profile dear")
  }
);

//is catch wale ko upr likhenge to bekaar ho jaega ...kyunki profile wale me bhi catch wala response send hoga
app.use("/admin/*", (req, res) => {
  res.status(404).send("yeh page exist nahi karta, kahin aur jao!");
});


//##############################################################################################################

// see here in thi swe have 3 pages named as help,/ , and document and in this matching of the
//routes are done and if the given route is matched then it will open that particualr matched route
//instead of going to match route further .... hence the order or routing matters in this

// create structure which says port 7777 to listen and give a call back to show in the terminal panel
app.listen(7777, () => {
  console.log("server is running and listening the request...");
});
