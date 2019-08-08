const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PocSchema = new Schema({
    "_id": {type : Object, require: true},
    "Location" : String,
    "poc" : String,
    "Designation" : String,
    "poc_Ph_no" : String
});

const Poc = mongoose.model('poc',PocSchema);

module.exports = Poc;