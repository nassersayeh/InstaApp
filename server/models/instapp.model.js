const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = mongoose.Schema({
    fullname : {        //new
        type:String,
        required:true,
        min: 6,
        max:15,
        trim:true 
    },
    username : {
        type:String,
        required:true,
        min: 6,
        max:15,
        trim:true, //new
        unique : true //new
    },
    email : { //new
        type:String,
        required:true,
        trim:true, //new
        unique : true //new

    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    },
    role:{
        type:String,
        enum:['user','admin'],
        required:true
    },
    //new
    gender: {type: String, default: 'male'},
    mobile: {type: String, default: ''},
    address: {type: String, default: ''},
    story: {
        type: String, 
        default: '',
        maxlength: 200
    },
    website: {type: String, default: ''},
    followers: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    following: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    saved: [{type: mongoose.Types.ObjectId, ref: 'user'}],
//new
    comment : [{type: mongoose.Schema.Types.ObjectId,ref:'Comment'}]

});
UserSchema.pre('save',function(next){
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password,10,(err,passwordHashed)=>{
        if(err)
            return next(err);
        this.password = passwordHashed;
        next();
    });
});

UserSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err)
            return cb(err)
        else{
            if(!isMatch)
                return cb(null,isMatch);
            return cb(null,this)//this is the user

        }

    })

}

module.exports = mongoose.model('User',UserSchema)