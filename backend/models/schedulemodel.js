const mongoose = require ('mongoose');
const user = require('./usermodel');


const scheduleschema = new mongoose.Schema ({

     practitionerid : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Practitioner' ,
        required : true 
     }, 

    dayofweek : {
        type: String, 
        enum : ['Monday','Tuesday' , 'Wednesday ' , 'Thursday' , ' Friday', 'Saturday' , 'Sunday'],
        required : true 
    
    },

    review  : {
        type: String, 
        required : true,
        
    },
     
     date : {
        type : Date,
        required : true ,
        default : Date.now 
     }
})

module.exports = mongoose.model ('schedule', scheduleschema);