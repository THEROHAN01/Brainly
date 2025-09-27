//////////////////////////////////creating a mongo connection ////////////////////////////////////////////////////
// const dotenv = require('dotenv');
// const envConfig = dotenv.config().parsed;
// if (envConfig) {
//   Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);
// }

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.MONGO_URI; 
// // "mongodb+srv://rohansalunkhe700:<db_password>@cluster0.rztll3p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
  // try {
    // Connect the client to the server	(optional starting in v4.7)
  // client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


//////////////////////////////////////////////schema design for the db /////////////////////////////////////////////////////

import mongoose, { Schema } from "mongoose";
import 'dotenv/config'

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model("User", UserSchema);


// Database connention //

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI){
    throw new Error(".env me uri nahi dala kya ?");
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Mongodb connect ho gaya bhai");

  }catch(error){
    console.error("Mongodb ka connection fail hogaya:", error);
    process.exit(1);

  }
};
