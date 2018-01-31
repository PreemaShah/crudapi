var express = require('express');
var session = require('express-session');
var bodyparser = require('body-parser') ;
var {user} = require('../Model/UserModel');
var {employee} = require('../Model/EmployeeModel');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var app=express();
app.use(passport.initialize());
app.use(bodyparser.json());



//Passport Authentication
passport.serializeUser((user, done) => {
    done(null, user);
});

// deserialize user object
passport.deserializeUser((user, done) => {
    done(null, user);
});




app.get("/",(req,res)=>{
    //res.render("Reg");
    console.log("failed");
    res.json("Login Failed");
});


app.get("/success",(req,res)=>{
    //res.render("Reg");
    console.log('success');


    res.json("Login Successful");
});

app.post("/users",(req,res)=>{

    var user1 = new user({
        email:req.body.email,
        password:req.body.password
    });
    user1.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.send(err);
    })

});

passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
    },
    function (username,password,done) {

        console.log(username);
        console.log(password);

        user.findOne({email:username,password:password}).then((user1)=>{
            console.log(user1);
            if(!user1){
                return done(null,false);
            }
            return(done(null,user1));

        }).catch((err)=>{
            console.log(err);
        })
    }
));

app.post('/user',passport.authenticate('local',{

    successRedirect:'/success',
    failureRedirect:'/'


}));

//Employee Table
app.post("/employee",(req,res)=>{

    var emp= new employee({
        Name:req.body.Name,
        Number:req.body.Number,
        gender:req.body.gender,
        city:req.body.city,
        email:req.body.email,
        password:req.body.password
    });
    emp.save().then((doc)=>{
        res.json("Successfully Registered");
    },(err)=>{
        res.json("Unsuccessful");
    })

});






app.listen(3000,()=>{
console.log("Port started");
});
