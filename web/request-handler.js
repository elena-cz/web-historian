var path = require('path');
// var url = require('url');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  
  console.log(`Handling ${req.method} for ${req.url}`);


  if ( req.method === 'GET' ) {
    
    console.log('SERVING STATIC FILES');
    
    var assetPath = httpHelpers.getAssetPath(req.url);
    // if (assetPath === './web/public/favicon.ico') {
    //   return;
    // }
    httpHelpers.serveAssets(res, assetPath);
    
  } else if ( req.method === 'POST') {
    // Read list of URLs to see it url is already recorded
    // If it is there,  serve up static files for requested url
    // If it is not on the list, add to the list and send Loading page
    
    var body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', function() {
      console.log('body', body);
      var newURL = body.slice(4) + '\n';
      archive.addUrlToList(newURL, function() {
        console.log();
      });
      
    });
    

    
    
  }
  
  
  
  
  
  //res.end(archive.paths.list);
};
