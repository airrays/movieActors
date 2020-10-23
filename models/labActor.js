const mongoose = require('mongoose');
const actorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String
    },
    bYear:{
        validate:{
            validator: function (newYear) {
                if(Number.isInteger(newYear))
                    return true;
                else return false
            },
            message: 'Birth year should be integer'
        },
        type: Number,
        required: true
    },
});
module.exports = mongoose.model('LabActor',actorSchema);