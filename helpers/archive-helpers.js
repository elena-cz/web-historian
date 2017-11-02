var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpHelpers = require('../web/http-helpers');

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
    if (urls.indexOf(url) > -1) {
      console.log('True: url is in file');
      trueCb(url);
    } else {
      console.log('False: url is not in file');
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
    exports.renderLoading(res);
  });
};

exports.isUrlArchived = function(url, callback) {
  console.log('isUrlArchived');
};

exports.downloadUrls = function(urls) {
};

exports.renderLoading = function(res) {
  httpHelpers.serveAssets(res, `${exports.paths.siteAssets}/loading.html`);
};
