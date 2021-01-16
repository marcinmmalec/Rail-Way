const mongoose = require('mongoose');

const Schema= mongoose.Schema;

const routeSchema=new Schema({
    
    name:{
        type:String,
        required:true
    },
      departureHour:{
        type:Number,
        required:true,
        default:Date.now
    },
    departureMinute:{
        type:Number,
        required:true,default:Date.now
    },
    arrivalHour:{
        type:Number,
        required:true,default:Date.now
    },
    arrivalMinute:{
        type:Number,
        required:true,default:Date.now
    },
    fare:{
        type:Number,
        required:true
    }
},{timestamps:true});

const Route= mongoose.model('Route', routeSchema)

module.exports=Route;