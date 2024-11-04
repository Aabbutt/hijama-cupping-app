const mongoose = require ('mongoose');
const user = require('./usermodel');


const reviewschema = new mongoose.Schema ({
    
    patientid : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Patient' ,
        required : true 
     }, 

     practitionerid : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'practitioner' ,
        required : true 
     }, 

    rating : {
        type: Number, 
        required : true,
        min : 1,
        max :5
    
    },

        reviews : {
        type: String, 
        required : true,
        
    },
     
     date : {
        type : Date,
        required : true ,
        default : Date.now 
     }
})

module.exports = mongoose.model ('review', reviewschema);