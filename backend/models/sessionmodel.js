const mongoose = require ('mongoose');
const user = require('./usermodel');


const sessionschema = new mongoose.Schema ({
    patientid: {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'patient' ,
        required : true 

    },

    treatmentid : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'treatment' ,
        required : true 

    },
    
    appointmentid: {
        type: mongoose.Schema.Types.ObjectId, 
        ref : 'appointment' ,
        
    },

    sessiondate : {
        type: Date, 
        required : true 
    },

    postsession : {
        practitionernotes : String 
    }
})

module.exports = mongoose.model ('session', sessionschema);