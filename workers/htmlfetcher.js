var cron = require('node-cron');
var httpHelpers = require('../web/http-helpers.js');


// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.


// Every 1? minute
// Read sites list
// Get list of files in archive
// Get list of urls not in archive
// Call downloadUrls urls

// Use
// httpHelpers.downloadUrls = function(url)
// httpHelpers.isUrlArchived = function(res, url, trueCb, falseCb) {
// httpHelpers.readListOfUrls = function(callback) 


cron.schedule('* * * * *', function() {
  console.log('running a task every minute');
  
  
  
  
  
});
