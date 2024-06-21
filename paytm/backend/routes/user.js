const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User, Account } = require('../db');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const jWT_Secret = require('../config');
const { authMiddleware } = require('../middleware');
const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})
const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})
const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastname: zod.string().optional(),
})

router.post("/signup",async (req,res)=>{
   const{success}= signupSchema.safeParse(req.body);
   if(!success){
    return res.json({
        message: "Incorrect inputs"
    })
    } 
    const user = await User.findOne({
        username: req.body.username
    })
    if(user){
       return res.json({
        message: "Email already taken"
       }) 
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
   
    const dbuser = await User.create({
        username: req.body.username,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    await dbuser.save();
    const userId = dbuser._id;
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
     const token = jwt.sign({
        userId: dbuser._id
      },jWT_Secret)
    
    res.json({
          success: true,
          token:  token,
          userId
    })

})
router.post("/signin",async(req,res)=>{
    
    const {success}= signinSchema.safeParse(req.body);

    if(!success){
        return res.status(403).json({
            message: "wrong inputs heh"
        })

    }
    const { username, password } = req.body;

  try {
    
    const user = await User.findOne({ username });
    

    if (!user) {
      return res.json({ success: false, message: 'Invalid username or password (user not found)' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ success: false, message: 'Invalid username or password (incorrect password)' });
    }
    const token = jwt.sign({ userId: user._id }, jWT_Secret);

    const userid = user._id 
    res.json({ success: true, token ,userid});
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
return;
  
})
router.put("/",authMiddleware,async (req,res)=>{
    const body = req.body;
    const {success} = updateSchema.safeParse(body);
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }
     await User.updateOne({_id: req.userId},req.body)
     res.json({
        message:"updated successfully"
     })
})
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

})
router.get('/userid', async (req, res) => {
    const { userid } = req.query;

    try {
     const user = await User.findById(userid);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
module.exports = router;