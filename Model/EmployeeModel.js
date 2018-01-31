var mongoose = require('mongoose');
mongoose.Promise= global.Promise;
mongoose.connect("mongodb://localhost:27017/Users");
let employee = mongoose.model('Employees',{
    Name:{
        type:String,
        required:true
    },
    Number:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    email:{
      type:String,
      required:true
    },
    password:{
        type:String,
        required:true
    }

});
module.exports={
    employee
};
