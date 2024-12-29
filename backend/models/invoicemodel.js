const mongoose = require ('mongoose');
const user = require('./usermodel');


const invoiceschema = new mongoose.Schema ({

    Practitionerid: { type : mongoose.Schema.Types.ObjectId , ref : 'Practitioner'},
    patientid : { type : mongoose.Schema.Types.ObjectId , ref : 'patient'},

    appointmentid: {
        type: mongoose.Schema.Types.ObjectId, 
        ref : 'appointment' ,
        required : true 
        
    },

    amount : {
        type: Number, 
        required : true 

    },
    
    status : {
        type: String, 
        enum : ['paid','unpaid','pending'] ,
        default : 'paid' 
    },

    paymentmethod : {
        type: String, 
        enum : ['cash','creditcard','bank transfer'] ,
        default : 'cash' 
    },

    invoicedate : {
        type: Date, 
        required : true 
    },
})

module.exports = mongoose.model ('invoice', invoiceschema);