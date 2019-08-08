const express = require("express");
const router = express.Router();
const Onboard = require('../models/onboards');
const Poc = require('../models/pocs');
const User = require('../models/users');
const Candidate = require('../models/candidate');

const cors = require('cors');
var http = require('http');  
var MongoClient = require('mongodb').MongoClient;  
var url = "mongodb://localhost/onboarddata";  

const multer  =   require('multer'); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploaded')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  } 
});

const upload = multer({storage: storage}).any;

var corsOptions = {
    origin: 'http://10.2.108.65:8100',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// add details of onboarding associates
router.post('/onboards', function(req,res,next){
        Onboard.create(req.body).then(function(onboard){
        console.log('Inside Post', req.body);
        console.log('onboard', onboard);
        res.send(onboard); 
    }).catch(next => console.log('next', next));    
});

// get all details of onboarding associates
router.get('/allonboard', function(req, res, next){
     Onboard.find({}).sort({updatedTime : -1}).then(function(onboards){
        console.log('Inside all onboard');
        res.send(onboards);
    }).catch(next);
});

// get details of onboarding associates based on id parameter
router.get('/onboarded', function(req,res,next){
    console.log('Inside Get param');
    Onboard.find({_id: req.query.id}
    ).then(function(onboards){
        res.send(onboards);
        console.log(onboards);
    });   
});

// get details of onboarding associates based on id parameter
router.get('/states', function(req,res,next){
    console.log('Inside Get states');
        res.json({ Object : [
            {
            "key": "AN",
            "name": "Andaman and Nicobar Islands"
            },
            {
            "key": "AP",
            "name": "Andhra Pradesh"
            },
            {
            "key": "AR",
            "name": "Arunachal Pradesh"
            },
            {
            "key": "AS",
            "name": "Assam"
            },
            {
            "key": "BR",
            "name": "Bihar"
            },
            {
            "key": "CG",
            "name": "Chandigarh"
            },
            {
            "key": "CH",
            "name": "Chhattisgarh"
            },
            {
            "key": "DH",
            "name": "Dadra and Nagar Haveli"
            },
            {
            "key": "DD",
            "name": "Daman and Diu"
            },
            {
            "key": "DL",
            "name": "Delhi"
            },
            {
            "key": "GA",
            "name": "Goa"
            },
            {
            "key": "GJ",
            "name": "Gujarat"
            },
            {
            "key": "HR",
            "name": "Haryana"
            },
            {
            "key": "HP",
            "name": "Himachal Pradesh"
            },
            {
            "key": "JK",
            "name": "Jammu and Kashmir"
            },
            {
            "key": "JH",
            "name": "Jharkhand"
            },
            {
            "key": "KA",
            "name": "Karnataka"
            },
            {
            "key": "KL",
            "name": "Kerala"
            },
            {
            "key": "LD",
            "name": "Lakshadweep"
            },
            {
            "key": "MP",
            "name": "Madhya Pradesh"
            },
            {
            "key": "MH",
            "name": "Maharashtra"
            },
            {
            "key": "MN",
            "name": "Manipur"
            },
            {
            "key": "ML",
            "name": "Meghalaya"
            },
            {
            "key": "MZ",
            "name": "Mizoram"
            },
            {
            "key": "NL",
            "name": "Nagaland"
            },
            {
            "key": "OR",
            "name": "Odisha"
            },
            {
            "key": "PY",
            "name": "Puducherry"
            },
            {
            "key": "PB",
            "name": "Punjab"
            },
            {
            "key": "RJ",
            "name": "Rajasthan"
            },
            {
            "key": "SK",
            "name": "Sikkim"
            },
            {
            "key": "TN",
            "name": "Tamil Nadu"
            },
            {
            "key": "TS",
            "name": "Telangana"
            },
            {
            "key": "TR",
            "name": "Tripura"
            },
            {
            "key": "UK",
            "name": "Uttar Pradesh"
            },
            {
            "key": "UP",
            "name": "Uttarakhand"
            },
            {
            "key": "WB",
            "name": "West Bengal"
            }] 
        });
        console.log(onboards);
});

// get details of credentials based on User
router.post('/creds', function(req,res,next){
    console.log('user' + req.body.user);
    User.find({User: req.body.user}
    ).then(function(users){
        res.send(users);
        console.log(users);
    });   
});

// get Login Validation
router.post('/validateLoginOldIgnore', function(req,res,next){
    try{
        var validity = new Boolean();
        User.find({User: req.body.user}
        ).then(function(user){
            if( user.length!=0 || user.length!=null )
                console.log('Inside if..');
                console.log('Pass' + user[0].toObject().Pass);
                var Pass1 = req.body.pass
                var Pass2 = user[0].toObject().Pass;
                console.log('Pass1' + req.body.pass);
                if(Pass1 == Pass2){
                    validity = true;
                } else {
                    validity = false;
                }
                res.send(validity);
        });
    }catch(error){
        res.send(error);
    }
});

// get Login Validation
router.post('/validateLogin', function(req,res,next){
    var validity = new Boolean();
    User.find({User: req.body.user}
    ).then(function(user){
        if( user.length!=0 && user.length!=null ){
            console.log('Inside if..');
            console.log('Pass' + user[0].toObject().Pass);
            var Pass1 = req.body.pass
            var Pass2 = user[0].toObject().Pass;
            console.log('Pass1' + req.body.pass);
            if(Pass1 == Pass2){
                validity = true;
            } else {
                validity = false;
            }
            res.send(validity);
        } else {
            console.log('false');
            res.send(false);
        }
    })
    .catch(function (err) {
        console.log('ERROR : ' + err);
        return false;
    });
});

//update User password
router.put('/updatePassword', function(req,res,next){
    User.findOneAndUpdate({_id: req.query.id}, req.body).then(function(){
        User.findOne({_id: req.query.id}).then(function(user){
        console.log('Inside Password Put');
        res.send(user);
        }); 
    }).catch(next);    
});

//update details of onboarding associates based on id
router.put('/onboards', function(req,res,next){
    console.log('req params' + req.query.id)
    Onboard.findOneAndUpdate({_id : req.query.id}, req.body).then(function(){
        console.log('Updated Data :' + req.body);
        Onboard.findOne({_id: req.query.id}).then(function(onboard){
        console.log('Inside onboards Put');
        console.log('Updated Data :' + req.body);
        res.send(onboard);
        }); 
    }).catch(next);    
});

//update details of onboarding associates based on id
// router.put('/onboards', function(req,res,next){
//     console.log('req params' + req.query.id)
//     Onboard.findOneAndUpdate({_id : req.query.id}, req.body).then(function(){
//         Onboard.findOne({_id: req.query.id}).then(function(onboard){
//         console.log('Inside onboards Put');
//         res.send(onboard);
//         }); 
//     }).catch(next);    
// });

// get details of onboarding associates based on DOJ parameter
router.get('/getByCandidateDoJ', function(req,res,next){
    console.log("DOJ :" + req.query.doj);
    Onboard.find({ $or: [ { "empDataByHR.DOJ" : req.query.doj }, { "_id" : req.query.id } ]
    // 'empDataByHR.DOJ' : req.query.doj
    //{"$gte": Date(req.query.doj) , "$lte": Date(req.query.doj) }
    }).then(function(onboards){
        res.send(onboards);
        console.log(onboards);
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            error: err
        });
    });      
});

// get details of onboarding associates based on advanced search
router.get('/advancedSearch', function(req,res,next){
    console.log('Inside Advanced Search..!');

    if(req.query.loc != null & req.query.doj != null){
        console.log("Location :" + req.query.loc + "DOJ :" + req.query.doj);
        Onboard.find({
            $and: [
                { "empDataByHR.workLocation" : req.query.loc },
                { "empDataByHR.DOJ": req.query.doj }
            ]
            //'empDataByHR.workLocation' : {$regex: /^req.query.loc$/i} 
        }).sort({updatedTime : -1}).then(function(onboards){
            res.send(onboards);
        });   
    } else if(req.query.loc != null & req.query.dFrom == null & req.query.dTo == null){
        console.log("Location Search :" + req.query.loc);
        Onboard.find({ "empDataByHR.workLocation" : req.query.loc 
            //'empDataByHR.workLocation' : {$regex: /^req.query.loc$/i} 
        }).sort({updatedTime : -1}).then(function(onboards){
            res.send(onboards);
        });  
    } else if(req.query.doj != null){
        console.log("DOJ Search :" + req.query.doj);
        Onboard.find({ "empDataByHR.DOJ": req.query.doj 
        }).sort({updatedTime : -1}).then(function(onboards){
            res.send(onboards);
        });  
    } else if(req.query.dFrom != null & req.query.dTo != null & req.query.loc != null){
        console.log("Date From :" + req.query.dFrom + "Date To :" + req.query.dTo + "Location Search :" + req.query.loc);
        Onboard.find({"empDataByHR.workLocation" : req.query.loc, 
        'empDataByHR.DOJ' : {"$gte": req.query.dFrom , "$lte": req.query.dTo }
        }).sort({updatedTime : -1}).then(function(onboards){
            res.send(onboards);
        })
    } else if(req.query.dFrom != null & req.query.dTo != null){
        console.log("Date From :" + req.query.dFrom + "Date To :" + req.query.dTo);
        Onboard.find({'empDataByHR.DOJ' : {"$gte": req.query.dFrom , "$lte": req.query.dTo }
        }).sort({updatedTime : -1}).then(function(onboards){
            res.send(onboards);
        })
    } else if(req.query.aloc == 'all'){
        console.log("All Location Search :" + req.query.aloc);
        Onboard.find({ 
        }).sort({updatedTime : -1}).then(function(onboards){
            res.send(onboards);
        });  
    } else{
        console.log('Please enter mandatory data to search');
        res.send('No data is provided to perform search');
    }
});

// get details of logging in associate based on email parameter
router.get('/getDataByLogin', function(req,res,next){
    console.log('Email :' + req.query.email);
    Onboard.find({ 'empDataByHR.empEmail' : req.query.email  
    }).then(function(onboard){
        res.send(onboard);
        console.log(onboard);
    });   
});

// get details of logging in associate based on status parameter
router.get('/getDataByStatus', function(req,res,next){
    console.log('Status :' + req.query.status);
    Onboard.find({ 'status' : req.query.status  
    }).then(function(onboard){
        res.send(onboard);
        console.log(onboard);
    });   
});

// get details of logging in associate based on email parameter
router.get('/getMapDataByLoc', function(req,res,next){
    console.log('Locatn :' + req.query.loc);
    Poc.find({ 'Location' : req.query.loc  
    }).then(function(poc){
        res.send(poc);
        console.log(poc);
    });
});

// Delete details of Onboarding Records based on id
router.delete('/deleteOnboards', function(req, res, next){
    Onboard.remove({_id: req.query.id}).then(function(onboards){
        //res.send(onboards);
        console.log("Deleted : "+ req.query.id);
        res.send(onboards);
    }).catch(next);
});

// get all details of candidate associates
/*router.get('/allcandidate', function(req, res, next){
    Candidate.find({}).then(function(candidate){
       res.send(candidate);
   }).catch(next);
});*/

// update details of Candidate Records
/*router.put('/candidate', function(req,res,next){
    Candidate.findByIdAndUpdate({_id : req.query.id}, req.body).then(function(){
        Candidate.findOne({_id: req.query.id}).then(function(candidate){
            res.send(candidate);
        });
    }).catch(next);
});*/

// add Candidate details 
/*router.post('/candidate', function(req,res,next){
    Candidate.create(req.body).then(function(candidate){
        console.log('Inside Post');
        //res.send(candidate); 
    }).catch(next);   
    
    Onboard.create(req.body).then(function(onboard){
        console.log('Inside Onboard Post');
        res.send(onboard); 
    }).catch(next);    
});*/


router.post('/fileUploader', function (req, res) {
    upload(req, res, function (err) {
      if (err) {
        return res.end(err.toString());
      }
      console.log('Inside file upload');
      res.end('File is uploaded');
    });
});

function getSpecific(){
    console.log('In');
};

router.post('/uploadfile',function(req,res){  
  upload(req,res,function(err) {  
      if(err) {  
          return res.end("Error uploading file.");  
      }  
      res.end("File is uploaded successfully!");  
  });  
});

module.exports = router;