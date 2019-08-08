const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
    "_id": String,
    "empDataByHR": {
        "empid": Number,
        "empFName": String,
        "empMName": String,
        "empLName": String, 
        "empEmail": String,
        "DOJ": Date, 
        "designation": String, 
        "department": String,
        "buddyName": String, 
        "workLocation": String
    },
    "status": String
});

const Candidate = mongoose.model('candidate',CandidateSchema);

module.exports = Candidate;