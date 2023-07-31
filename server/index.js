require('dotenv').config()
const express = require("express");
const app=express();
const cors=require("cors");
const mongoose = require("mongoose");
const User=require('./models/user');
const Post=require('./models/post');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const multer = require('multer');
const uploadMiddleWare = multer({dest:'uploads/'});
const fs=require('fs');


const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;

const allowedDomains = ['https://animated-fenglisu-78b3ae.netlify.app', 'http://localhost:3000'];
app.use(cors({ credentials:true,
  origin: function (origin, callback) {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin) return callback(null, true);
 
    if (allowedDomains.indexOf(origin) === -1) {
      const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads' , express.static(__dirname + '/uploads'));


mongoose.connect(`mongodb+srv://blogger:${process.env.PASSWORD}@cluster0.69sa6wo.mongodb.net/?retryWrites=true&w=majority`)

app.post('/register' ,async (req,res) => {
    const {username,password}=req.body;
    try{
        const userDoc=await User.create({username,password:bcrypt.hashSync(password,salt)});
        res.json(userDoc);
    }catch(e){
        res.status(400).json(e);
    } 
});

app.post('/login', async (req,res)=>{
    const {username,password}=req.body;
    const userDoc=await User.findOne({username});
    if(userDoc==null){
        res.status(400).json('Not a Valid Username');
    }else{
        const validity=bcrypt.compareSync(password,userDoc.password);
        if(validity){
            //logged in
            jwt.sign({username,id:userDoc._id},secret,{},(err,token)=>{
                if(err) throw err;
                res.cookie('token',token,{sameSite:'none',secure:true}).json({
                    id:userDoc._id,
                    username,
                });
            });
        }
        else{
            // not logged in
            res.status(400).json('wrong credentials');
        }
    }
});

app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    if(token!=''){
        jwt.verify(token,secret,{},(err,info)=>{
            if(err) throw err;
            res.json(info);
        });
    }
    else
        res.json({});
});

app.post('/logout',(req,res)=>{
    res.cookie('token','',{sameSite:'none',secure:true}).json('ok');
});

app.post('/create' , uploadMiddleWare.single('file') , async (req,res)=>{
    if(req.file==undefined){
        res.status(400).json('Please enter all fields');
    }
    else{
        const {originalname,path}=req.file;        
        const parts=originalname.split('.');
        const ext=parts[parts.length - 1];
        const newPath=path + '.' + ext
        fs.renameSync(path , newPath);
        
        const {token}=req.cookies;
        jwt.verify(token,secret,{}, async(err,info)=>{
            if(err) throw err;
            const{title,summary,content}=req.body;
            const postDoc=await Post.create({
                title,
                summary,
                content,
                cover:newPath,
                author: info.id,
            });
            res.json(postDoc);
        });
    }
});

app.get('/create' ,async (req,res)=>{
    res.json (await Post.find()
    .populate('author' , ['username'])
    .sort({createdAt:-1})
    .limit(20)
    );
})

app.get('/post/:id' , async (req,res) =>{
    const {id}=req.params;
    const postDoc = await Post.findById(id).populate('author',['username']);
    res.json(postDoc);
})

app.put('/post' , uploadMiddleWare.single('file') , async (req,res) =>{
    let newPath = null;
    
    if(req.file){
        const {originalname,path}=req.file;        
        const parts=originalname.split('.');
        const ext=parts[parts.length - 1];
        newPath=path + '.' + ext
        fs.renameSync(path , newPath);
    }

    const {token}=req.cookies;
    jwt.verify(token,secret,{}, async(err,info)=>{
        if(err) throw err;
        const{id,title,summary,content}=req.body;

        const postDoc= await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        
        if(!isAuthor){
            return res.status(400).json('you are not the author');
        }

        await postDoc.updateOne({title , 
            summary , 
            content ,
            cover: newPath? newPath  : postDoc.cover ,
        });

        res.json(postDoc);
    });
})

app.listen(process.env.PORT,console.log('server started'));

