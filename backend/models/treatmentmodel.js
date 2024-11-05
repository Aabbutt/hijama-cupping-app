const mongoose = require ('mongoose');


const treatmentschema = new mongoose.Schema ({
    id: {
        type: String, 
        required : true 

    },

    price : {
        type : Number ,
        required : true , 

    },
    
    treatement : {
        type : String , 
        enum : [ 'wet cupping' , 'dry cupping' ]
    },
})

module.exports = mongoose.model ('treatment', treatmentschema);