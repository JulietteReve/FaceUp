var express = require('express');
var router = express.Router();
var fs = require('fs');
var uniqid = require('uniqid');
var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'didvrkav5',
  api_key: '169176668931138',
  api_secret: 'zPDSPcY0eVg_C0XZ2rJKAafdLk0' 
 });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', async function(req, res, next) {
  console.log(req.files.avatar);
  var image = './tmp/'+uniqid()+'.jpg';
  var error = await req.files.avatar.mv(image);
  var resultCloudinary = await cloudinary.uploader.upload(image);
  fs.unlinkSync(image);

  if(!error) {
    res.json({result: true, resultCloudinary} );      
  } else {
    res.json({result: false, message: error} );
  }
  
})

module.exports = router;
