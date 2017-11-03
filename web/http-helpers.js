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



exports.serveAssets = function(res, asset, statusCode, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  
  fs.readFile(asset, (err, data) => {

    if (err) {
      throw err;
    }
    
    var headers = exports.headers;
    headers['Content-Type'] = mimeTypes[path.extname(asset)];
    res.writeHead(statusCode, headers); 
    res.end(data)
    ;
  });
  
};



exports.getSiteAssetPath = function(reqUrl) {

  var urlParts = url.parse(reqUrl);
  var pathname = urlParts.pathname;
  
  if (urlParts.pathname === '/') {
    return `${archive.paths.siteAssets}/index.html`;
  } else {
    return `${archive.paths.siteAssets}${pathname}`; 
  }
  
};
