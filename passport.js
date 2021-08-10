const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy
const User = require('./server/models/instapp.model');

const cookieExtractor = req =>{
    let token = null;
    if(req &&req.cookies){
        token = req.cookies['access_token']
    }
    return token;
}

// authorization , to protect the end point
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey : 'NasserSayeh'
},(payload,done)=>{
    User.findById({_id: payload.sub},(err,user)=>{
        if(err)
            return done(err,false)
        if(user)
            return done(null,user)
        else done(null,false)
    })
}));

// auth local strategy using username and password
passport.use(new localStrategy((username,password,done)=>{
    User.findOne({username},(err,user)=>{
        if(err)
            return done(err);//if err in db
        if(!user)
            return done(null,false);//if no user exist
        user.comparePassword(password,done);//if password correct
        
    })
}))