const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = mongoose.Schema({
    username : {
        type:String,
        required:true,
        min: 6,
        max:15
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        required:true
    },
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