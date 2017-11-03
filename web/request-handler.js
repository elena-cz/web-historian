var path = require('path');
// var url = require('url');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  
  console.log(`Handling ${req.method} for ${req.url}`);
   

  if ( req.method === 'GET' && (req.url === '/' || req.url === '/styles.css') ) {
     
    var assetPath = httpHelpers.getSiteAssetPath(req.url);
    httpHelpers.serveAssets(assetPath, res, 200);


  } else if ( req.method === 'POST' ) {
    // Read list of URLs to see it url is already recorded
    // If it is there,  serve up static files for requested url
    // If it is not on the list, add to the list and send Loading page
    
    var body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', function() {
      var newURL = (body.startsWith('url=')) ? body.slice(4) + '\n' : body + '\n';
      archive.isUrlInList(newURL, archive.isUrlArchived.bind(null, newURL, res, archive.renderArchive, archive.renderLoading), archive.addUrlToList.bind(null, newURL, res, archive.renderLoading));
    });
  
  } else {
    
    var headers = httpHelpers.headers;
    res.writeHead(404, headers); 
    res.end();
    
    
  }
  
   
  
  
  //res.end(archive.paths.list);
};
