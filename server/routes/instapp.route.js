const express = require('express')
const userRouter = express.Router()
const passport = require('passport')
const passportConfig = require('../../passport')
const JWT = require('jsonwebtoken')
const User = require('../models/instapp.model')
const Comment = require('../models/comment.model')

const signToken = userId =>{
    return JWT.sign({
        iss : "NasserSayeh",
        sub:userId
    },"NasserSayeh",{expiresIn:"1h"})//send the data in token
}

userRouter.post('/register',(req,res)=>{
    const {username,password,role} = req.body
    User.findOne({username},(err,user)=>{
        if(err)
            res.status(500).json({message:{msgBody:"Error has occured",msgError:true}})
        if(user)
        res.status(400).json({message:{msgBody:"Username is already taken",msgError:true}})
        else{
            const newUser = new User({username,password,role})
            newUser.save(err=>{
                if(err)
                    res.status(500).json({message:{msgBody:"Error has occured",msgError:true}})
                else
                    res.status(201).json({message:{msgBody:"Account successfully created",msgError:false}})
            })
        }
    })
})
userRouter.post('/login',passport.authenticate('local',{session:false}),(req,res)=>{
    if(req.isAuthenticated()){
        const {_id,username,role}=req.user
        const token = signToken(_id)
        res.cookie('access_token',token,{httpOnly:true , sameSite:true})
        res.status(200).json({isAuthenticated:true , user: {username,role}})
    }
})

userRouter.get('/logout',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.clearCookie('access_token')
    res.json({user:{username:"" , role:""},success:true})
})

userRouter.post('/comment',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const comment = new Comment(req.body)
        comment.save(err=>{
            if(err)
                res.status(400).json({message:{msgBody:"Error has occured",msgError:true}})
            else{
                req.user.comment.push(comment)
                req.user.save(err=>{
            if(err)
                res.status(400).json({message:{msgBody:"Error has occured",msgError:true}})
            res.status(200).json({message: {msgBody : "Successfully created Comment", msgError : false}})
            

        })
        
    }
})

})
userRouter.get('/comments',passport.authenticate('jwt',{session:false}),(req,res)=>{
    User.findById({_id:req.user._id}).populate('comment').exec((err,doc)=>{
        if(err){
            res.status(400).json({message:{msgBody:"Error has occured",msgError:true}})
        
        }else{
            res.status(200).json({comments:doc.comment,authenticate : true})

        }
    })
})

userRouter.get('/admin',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.user.role ==="admin"){
        res.status(200).json({message:{megBody:"You are an admin", megError:false}})
    }
    else{
        res.status(403).json({message:{msgBody:"You are not Admin, go away" , msgError:true}})
    }
})

userRouter.get('/authenticated',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {username,role}= req.user
    res.status(200).json({isAuthenticated:true , user: {username,role}})
})
module.exports = userRouter