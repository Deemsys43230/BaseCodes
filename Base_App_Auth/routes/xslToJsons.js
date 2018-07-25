var express = require('express');
var app = express();
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var xslToJsonRoutes = express.Router();

// Require Item model in our routes module
var XslToJson = require('../models/xslToJson');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname)
    }
});
var upload = multer({ //multer settings
    storage: storage,
    fileFilter : function(req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');
/** API path that will upload the files */
xslToJsonRoutes.route('/').post(function (req, res) {
    var exceltojson;
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             console.log(err);
             return;
        }
        /** Multer gives us file info in req.file object */
        if(!req.file){
            res.json({error_code:1,err_desc:"No file passed"});
            return;
        }
        /** Check the extension of the incoming file and
         *  use the appropriate module
         */
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders:true
            }, function(err,result){
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                } else {
                var response; // set varible access outside function
                result.forEach(function(result) { // access all value from array
                    response = result;
                    console.log(response.bookid);
                    var xslToJson = XslToJson({ // passing the data to database
                        bookid: response.bookid,
                        booktitle: response.booktitle,
                        bookauthor: response.bookauthor 
                    });
                    
                    xslToJson.save() 
                    // .then(item => {
                    //     return res.send({
                    //         'message': 'Data Stored successfully',
                    //         data: result
                    //     });
                    // })
                    // .catch(err => {
                    //     return res.send({
                    //         message:"unable to save to database",
                    //         Error: err.errors
                    //     });
                    // });
                });
                return res.send({
                    'message': 'Data Stored successfully'
                });
            }
            });
            
        } catch (e){
            res.json({error_code:1,err_desc:"Corupted excel file"});
        }
    })
});

xslToJsonRoutes.route('/book').get(function(req,res) {
    XslToJson.find(({}), function(err, book){
        if (err)
            console.log(err);

        if (book) {
            console.log("Users count : " + book.length);
            
            book.forEach(function(book) {
                response = book;
                response_id = book._id;
            });
            res.send({"message":"Suucefully Got all book details"});
        }
    });
});

// xslToJsonRoutes.route('/:page').get(function(req,res) {
//     MyModel.find(query, fields, { skip: 10, limit: 5 }, function(err, results) { });
//     let limit = 25;   // number of records per page
//     let offset = 0;
//     XslToJson.find(function(err, book){
//         if(err){
//             console.log(error);
//             res.status(500).send('Internal Server Error');
//         }
//         else {
//             let page = req.params.page;      // page number
//             let pages = Math.ceil(book.count / limit);
//                 offset = limit * (page - 1);
//             XslToJson.find({
//                 attributes: ['bookid', 'booktitle', 'bookauthor'],
//                 limit: limit,
//                 offset: offset
//             },function(err, users) {
//                 if(users) {
//                     res.status(200).json({'result': users, 'count': users.count, 'pages': pages});
//                 }
//                 else{
//                     res.send(err);
//                 }
//             });
//         }
//     });
// });


module.exports = xslToJsonRoutes;