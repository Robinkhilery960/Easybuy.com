const mongoose = require("mongoose")

const eventSchema= new mongoose.Schema({
    name:{
        type:String, 
        require:[true, "Please enter your event name"]
    },
    description:{
        type:String, 
        require:[true, "Please enter your event description"]
    },
    category:{
        type:String, 
        require:[true, "Please enter your event category"]
    },
    tags:{
        type:String, 
         
    },
    originalPrice:{
        type:Number, 
        
    },
    discountPrice:{
        type:Number, 
        require:[true, "Please enter your event discount price "]
    },
    stock:{
        type:Number, 
        require:[true, "Please enter your event stock   "]
    },
    images:[
        {
            type:String
        }
    ],
    shopId:{
        type:String,
        require:true 
    },
    shop:{
        type:Object,
        require:true 
    },
    sold_out:{
        type:Number,
        default:0 
    },
    createdAt:{
        type:Date,
        default:Date.now() 
    },
    startDate :{
        type:Date,
        reqired:[true, "Please enter event start date "]
    },
    endDate :{
        type:Date,
        reqired:[true, "Please enter event end date "]
    },
    status:{
        type:String,
        default:"Running"
    }
 
})

module.exports=mongoose.model("Event", eventSchema)