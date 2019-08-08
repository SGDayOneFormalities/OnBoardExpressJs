const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OnboardSchema = new Schema({
    "_id": {type : Object, require: true},
    "empDataByHR": {
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
    "hrComments": String,
    "status": String,
    "hrReviewStatus": String,
    "totalExperience": String,
    "updatedTime": Date,
    "employeeDetails": {
        "confirmationDetail":{
            "canditateName": String,
            "referralCode": Number,
            "referralName": String,
            "submitDate": Date,
            "submitLocation": String,
            "canditateEmpCode": Number
        },
        "contactDetail": {
            "permanentPhone": String,
            "permanentResidingSince": Date,
            "permanentAddressFlatNo": String,
            "permanentAddressStreet": String,
            "permanentAddressArea": String,
            "permanentAddressDistrict": String,
            "permanentAddressState": String,
            "permanentAddressPin": String, 
            "permanentAltPhone": String,
            "emailId": String,
            "emergencyContactno": String,
            "emergencyPersonName": String,
            "emergencyMobile": String,
            "officialCorrespondence": String,
            "sameAddress": Boolean,
            "presentAddressFlatNo": String,
            "presentAddressStreet": String,
            "presentAddressArea": String,
            "presentAddressDistrict": String,
            "presentAddressState": String,
            "presentAddressPin": String, 
            "presentPhone": String,
            "residingSince": Date,
            "dependantName1": String,
            "dependantRelationship1": String,
            "dependantGender1": String,
            "dependant1DobDate": Date,
            "dependantName2": String,
            "dependantRelationship2": String,
            "dependantGender2": String,
            "dependant2DobDate": Date,
            "dependantName3": String,
            "dependantRelationship3": String,
            "dependantGender3": String,
            "dependant3DobDate": Date,
            "dependantName4": String,
            "dependantRelationship4": String,
            "dependantGender4": String,
            "dependant4DobDate": Date,
            "dependantName5": String,
            "dependantRelationship5": String,
            "dependantGender5": String,
            "dependant5DobDate": Date
        }, 
        "educationDetail": [{
            "address": String,
            "degree": String,
            "fromYear": Date,
            "gradYear": Date,
            "isEdit": Boolean,
            "result": Number,
            "subject": String
        }],
        "empPersonalData": {
            "stdNameFormat" : String, 
            "nameChanged" : String, 
            "nameChangeDate" : Date, 
            "DOB" : Date, 
            "sex" : String, 
            "maritalStatus": String, 
            "fFName" : String,
            "fMName" : String,
            "fLName" : String,
            "PAN" : String
        },
        "experienceDetail": [{
            "companyName": String,
            "desig": String,
            "domain": String,
            "isEdit": Boolean,
            "joining": Date,
            "leaving": Date,
            "leavingReason": String,
            "mContact": String,
            "mDesignation": String,
            "mEmail": String,
            "mName": String,
            "worklocation": String,
            "yearofExp": String
        }]
    }
});

/*const employeeData = new Schema({ 
    empData: Object 
});*/

const Onboard = mongoose.model('onboard',OnboardSchema);

module.exports = Onboard;