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
import { UserModel, ContentModel, connectDB } from './db';
import { userMiddleware } from './middleware';

const JWT_PASSWORD = "Rohan" ;
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

app.post("/api/v1/signin",async (req,res) => {
    const {username , password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const existingUser = await UserModel.findOne({username});
    if (!existingUser){
        return res.status(400).json({message: "tera user he nahi bana hai bro "})
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (isMatch){
        const token  = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD);

        res.json({
            token
        })

    }else {
        res.status(403).json({
            message: " Incorrect Credentials "
        });        
    }

});

app.post("/api/v1/content",userMiddleware, (req,res) => {
    const title = req.body.title;
    const link = req.body.link ;
    const type = req.body.type ;
    ContentModel.create({
        title,
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })

    return res.json({
        message: "Content add kardiya maine tera!!!"
    })

});


app.get("/api/v1/content" ,userMiddleware, async (req,res) =>{

    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId","username");
    res.json({
        content
    });


});

app.delete("/api/v1/content",userMiddleware,async (req,res) =>{

    const contentId  = req.body.contentId;
    if (!contentId){
        return res.status(400).json({message:"content id nahi diya to content kaise delete karu bro"})
    }
    try {
        const result = await ContentModel.findOneAndDelete({
            _id: contentId,
            //@ts-ignore
            userId: req.userId 
        });
        if(!result){
            return res.status(404).json({message: "content not found bro content id check kar"});
        }
        res.json({
        message: "delete kar diya bro tera content"
    });
    }catch(error){
        res.status(400).json({message: "Invalid contentId format "})
    }
    
    
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
