const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
//const http = require('http');

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

const upload = multer({storage: storage});

var busboy = require('connect-busboy');
//var fs = require('fs');

//var DIR = './uploaded/';
//var upload = multer({dest: DIR});
const app = express();

mongoose.connect('mongodb://localhost/onboarddata', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

//app.use(cors({origin: 'http://localhost:8100'}));

app.all('/*', function(req, res, next) {
    // console.log('Header' + req.headers['Origin']);
    // console.log('Header_Json' + req.headers.toString);

    res.header("Access-Control-Allow-Origin", 'http://10.2.108.65:8100');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept"); //'Content-Type,X-Requested-With');
    res.header("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
    res.setHeader("Content-Type", "multipart/form-data"); //application/json, multipart/form-data
    next();
});

// app.use('*',(req,res,next) =>{
//   if (req.method == "OPTIONS") {
//     confirm.log('Inside use all options');
//     res.status(200);
//     res.send();
//   } else {
//     next();
//   }
// });

var whitelist = ['http://10.2.108.66:8100', 'http://localhost:8100', 'http://10.2.108.65:8100', 'http://localhost:8100']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, true)
      //callback(new Error('Not allowed by CORS'))
    }
  }
}

// Then pass them to cors:
app.use(cors(corsOptions));

/*var whitelist = ['http://localhost:4000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
cors(corsOptionsDelegate),*/

app.use(multer({dest:__dirname+'/uploaded/'}).any());

/*app.post('/upload',function(req,res){
    console.log(req.files);
    res.redirect('/');
});*/

app.post('/fileUploader', function (req, res) {
    console.log('Inside file upload');
    upload(req, res, function (err) {
      if (err) {
        return res.end(err.toString());
      }
      console.log('Inside file upload');
      res.end('File is uploaded');
    });
});

/*app.use(multer({
    dest: DIR,
    rename: function (fieldname, filename) {
      console.log('Inside app use multer');
      return filename + Date.now();
    },
    onFileUploadStart: function (file) {
      console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function (file) {
      console.log(file.fieldname + ' uploaded to  ' + file.path);
    }
}).any());*/

/*app.post('/fileUploader', function (req, res) {
    upload(req, res, function (err) {
      if (err) {
        return res.end(err.toString());
      }
      console.log('Inside file upload');
      res.end('File is uploaded');
    });
});*/

//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname));

app.use(busboy());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api',require('./routes/api'));

app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error: err.message});
});

/*app.route('/upload12').post(function (req, res, next) {

        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/img/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename);              
                res.redirect('back');
            });
        });
});*/

/*app.get('/home',function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/uploadfiles',function(req,res){
  upload(req,res,function(err) {
      if(err) {
          return res.end("Error uploading file.");
      }
      res.end("File is uploaded successfully!");
  });
});*/

app.get('/hello',function(req,res){
  res.send("HelloWorld..1..2..3..4..!");
});

/*http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Node\n');
}).listen(4000, "10.2.108.65");*/

app.listen(process.env.port||4000, "10.2.108.65",function(){
  console.log('Listening now in 4000');
});