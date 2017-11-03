var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var httpHelpers = require('../web/http-helpers');
var htmlfetcher = require('../workers/htmlfetcher');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  // read sites.txt
  // go through sites.txt
  // split by '\n'
  // place each one into an array
  // returns the array
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data.split('\n'));
    return callback(data.split('\n'));
  });
};

exports.isUrlInList = function(url, trueCb, falseCb) {
  // go through site list
    // check if there is a url that matches the one passed in
      // if there is: return true
      // else: false
  // callback on the result
  exports.readListOfUrls(function(urls) {
    console.log('INDEX', urls.indexOf(url));
    if (urls.indexOf(url.trim()) > -1) {
      trueCb(url);
    } else {
      falseCb(url);
    }
  });
  
  
};

exports.addUrlToList = function(res, url, callback) {
  fs.appendFile(exports.paths.list, url, (err, url) => {
    if (err) {
      throw err;
    }
    console.log('Added URL to file');
    callback(res);
  });
};

exports.fileNameCreator = function(url) {
  return url.replace(/\//g, '_').replace(/:/g, '_');
};

exports.isUrlArchived = function(res, url, trueCb, falseCb) {
  // Get file name and path for URL in archive
  // Call serve assets 
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    files = files.map( (file) => file.slice(0, -1));
    var result = _.some(files, (file) => file === url.trim());    
    if (result) {
      trueCb(res, url);
    } else {
      falseCb(res, url);
    }
  });


};


// Change to take in an array of urls
exports.downloadUrls = function(url) {
  // Check if there are any sites in list that are not in archive
  // If there are, for each site
    // Get full URL
    // Get request to site
    // Save to archive  

  var filepath = `${exports.paths.archivedSites}/${exports.fileNameCreator(url)}`;

  if (url.startsWith('https://')) {
    url = 'http://' + url.slice(8);
  } else if (!url.startsWith('http://')) {
    url = 'http://' + url;
  }

  http.get(url, (res) => {
    res.setEncoding('utf8');
    var body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });
    res.on('end', () => {
      console.log('body: ', body);
      fs.writeFile(filepath, body, (err) => {
        if (err) {
          throw err;
        }
        console.log('File has been saved.');
      });
    });
  });


};



exports.renderLoading = function(res) {
  httpHelpers.serveAssets(res, `${exports.paths.siteAssets}/loading.html`, 200);
};

exports.renderArchive = function(res, url) {
  var filepath = `${exports.paths.archivedSites}/${exports.fileNameCreator(url)}`;
  httpHelpers.serveAssets(res, filepath, 301);
};
