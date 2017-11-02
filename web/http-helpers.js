var path = require('path');
var url = require('url');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

var mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/json',
  '.ico': 'image/x-icon'

};



exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  
  fs.readFile(asset, (err, data) => {
    console.log(asset);
    if (err) {
      throw err;
    }
    
    var statusCode = 200;
    var headers = exports.headers;
    headers['Content-Type'] = mimeTypes[path.extname(asset)];
    res.writeHead(statusCode, headers); 
    res.end(data)
    ;
  });
  
};



exports.getAssetPath = function(reqUrl) {

  var urlParts = url.parse(reqUrl);
  var pathname = urlParts.pathname;
  console.log(urlParts);
  
  if (urlParts.pathname === '/') {
    return `${archive.paths.siteAssets}/index.html`;
  } else {
    return `${archive.paths.siteAssets}${pathname}`; 
  }
  
};


// As you progress, keep thinking about what helper functions you can put here!




  // if (urlParts.root === '/' && urlParts.base === '' && req.method === 'GET') {
    
  //   console.log('HANDLING INDEX.HTML REQUEST');
    
  //   fs.readFile('./web/public/index.html', (err, data) => {
  //     if (err) {
  //       throw err;
  //     }
      
  //     var statusCode = 200;
  //     var headers = httpHelpers.headers;
  //     headers['Content-Type'] = 'text/html';
  //     // console.log('HEADERS', headers);
  //     // console.log(data.toString());
      
  //     res.writeHead(statusCode, headers);
      
  //     res.end(data);
      

      
  //   });
    
  // }
  
  
