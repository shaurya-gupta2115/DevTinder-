//iin this the express module is loaded into the express variable and that express do contain various functions which
// are written in the abstracted manner just to make function get used of it 

const express = require("express");
const app = express();

app.use("/help", (req, res) => {
  res.send("hey!! i am in helping page ");
});

// app.use("/", (req, res) => {
//   res.send("hey!! i am in home page ");
// });

app.use("/document/2", (req, res) => {
    res.send("This is the 2nd document page");
});

app.use("/document", (req,res)=>{
    res.send("This is the document page")
})
//here the ORDER MATTER during giving them routes :)

// see here in thi swe have 3 pages named as help,/ , and document and in this matching of the
//routes are done and if the given route is matched then it will open that particualr matched route
//instead of going to match route further .... hence the order or routing matters in this 


// create structure which says port 7777 to listen and give a call back to show in the terminal panel 
app.listen(7777, () => {
  console.log("server is running and listening the request...");
});
