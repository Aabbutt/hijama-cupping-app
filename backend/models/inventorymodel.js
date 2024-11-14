const mongoose = require ('mongoose');


const inventoryschema = new mongoose.Schema ({
    kitname: {
        type: String, 
        required : true 
        
    },

    description : {
        type: String, 
    },

    quantity : {
        type: Number, 
        required : true,
        default : 1 
    },
     
     practitionerid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Practitioner',
        required : true 
     }
})

const inventory = mongoose.model('inventory', inventoryschema);
module.exports =inventory