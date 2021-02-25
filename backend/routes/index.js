var express = require('express');
var router = express.Router();
var fs = require('fs');
var uniqid = require('uniqid');
var cloudinary = require('cloudinary').v2;
const request = require('sync-request');
const subscriptionKey = 'cc56bc070e62499d8c5d215083ae5ddf';
const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';



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

  console.log('hello', resultCloudinary)

  const params = {
    returnFaceId: 'true',
    returnFaceLandmarks: 'false',
    returnFaceAttributes: 'age,gender,smile,facialHair,glasses,emotion,hair',
   };

   const options = {
    qs: params,
    body: `{"url": "${resultCloudinary.url}"}`,
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
   };

  var resultVisionRaw = await request('POST', uriBase, options);
  var resultVision = await resultVisionRaw.body;
  resultVision = await JSON.parse(resultVision);

  // console.log('result', resultVision);

  if(!error) {
    res.json({result: true, vision: resultVision, url: resultCloudinary.url} );      
  } else {
    res.json({result: false, message: error} );
  }
  
})

module.exports = router;
