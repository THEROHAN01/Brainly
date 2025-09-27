// import express from 'express';
// const app = express();
// import bcrypt from "bcrypt";
// import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';
// import { UserModel , connectDB} from './db';
// app.use(express.json());

// //connect the database 
// connectDB();

// const PORT =  process.env.PORT || 3000 ;

// app.post("/api/v1/signup", async (req,res) => {


//     const username = req.body.username ;
//     const password = req.body.password ;

//     if (!username || !password){
//         return res.status(400).json({
//             message: "Username and password lagta hai bro"
//         })
//     }

//     const existingUser = await UserModel.findOne({username});
//     if (existingUser){return res.status(400).json({message : "user pehele se hai bhai tera "})};

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password,salt);
//     try {
//         const user = new UserModel({
//             username: username,
//             password: hashedPassword
//         });
//         await user.save();
//         res.status(201).json({
//             message: "user created successfully you have signed up "
//         });
//     }catch(error){
//         res.status(500).json({message: "Error creating user:" , error});
//         }
    

   
// });


import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { UserModel, connectDB } from './db';

const app = express();
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 3000;

app.post("/api/v1/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password lagta hai bro" });
  }

  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "user pehele se hai bhai tera" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = new UserModel({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "user created successfully you have signed up" });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
});

app.post("/api/v1/signin", (req,res) => {
    res.status(501).json({ message: "Not Implemented" });
});

app.post("/api/v1/content", (req,res) => {
res.status(501).json({ message: "Not Implemented" });
});


app.get("/api/v1/content" , (req,res) =>{
res.status(501).json({ message: "Not Implemented" });
});

app.delete("/api/v1/content", (req,res) =>{
res.status(501).json({ message: "Not Implemented" });
});

app.post("/api/v1/brain/share", (req,res) => {
res.status(501).json({ message: "Not Implemented" });
});

app.get("/api/v1/brain/:shareLink", (req,res) =>{
    res.status(501).json({ message: "Not Implemented" });
});



app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
});
