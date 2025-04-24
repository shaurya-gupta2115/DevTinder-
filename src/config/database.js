 // //bringing mongoClient from the mongodb so that we can utilise that function to build the connection
// const { MongoClient } = require("mongodb");

// //connect URL
// const url = "mongodb+srv://devtinder:devtinder@cluster0.ggrv0.mongodb.net/";
// const client = new MongoClient(url);

// //data base name
// const dbName = "HelloWorld";

// async function main() {
//   //using connect method to connect to that server
//   await client.connect(); // it will wait untill database get connected
//   console.log("Database got connected properly");

//   const db = client.db(dbName);
//   const collection = db.collection("User");

// const data = {
//     location: "atarra",
//     city: "banda",
//     firstname : "Nidhi",
//     lastname : "Gupta"
// }

//The insertMany command returns an object with information about the insert operations.

// const result = await collection.insertOne(data); //insertMany takes array of the {objects}
// console.log("Inserted Document: :" , result)

//This query returns all the documents in the documents collection.
//  If you add this below the insertMany example, you'll see the documents you've inserted.

//   const findResult = await collection.find({}).toArray();
//   console.log("Each Document data is : ", findResult);

//   const filteredResult = await collection
//     .find({ firstname: "Nidhi" })
//     .toArray();
//   console.log("Filtered Document is : ", filteredResult);

// result updation => The method updates the first document where the field "firstname " is equal to "Nidhi " by adding a new field "firstname " to the document set to "Sanskriti".
// updateResult contains information about whether there was a matching document to update or not.

//   const updateResult = await collection.updateOne(
//     { firstname: "Nidhi" },
//     { $set: { firstname: "Sanskriti" } }
//   );
//   console.log("Updated Result is : ", updateResult);

// deletion or removal

//   const removeData = await collection.deleteOne({ firstname: "Sanskriti" });
//     console.log("After removal Result is : ", removeData);

//   return "done";
// }

//here it is like tcp handshaking i.e. hand is shaked and withdrawed after response is done
// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

// ################################### - > Mongoose Implementation and Learnings < - ##################################

const mongoose = require("mongoose");

// mongoose.connect(
//   "mongodb+srv://devtinder:devtinder@cluster0.ggrv0.mongodb.net/"
// );

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://devtinder:devtinder@cluster0.ggrv0.mongodb.net/devTinder" //devTinder is that database and users is a collection which contains various documents 
  );
};

module.exports = { connectDB }; // ab jb bhi waha pr import krenge to waha pr destructuring krenge hum


