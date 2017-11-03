var cron = require('node-cron');
var archive = require('../helpers/archive-helpers.js');


// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.


// Every 1? minute
// Read sites list
// Get list of files in archive
// Get list of urls not in archive
// Call downloadUrls urls

// Use
// archive.downloadUrls = function(url)
// archive.isUrlArchived = function(res, url, trueCb, falseCb) {
// archive.readListOfUrls = function(callback) 


cron.schedule('* * * * *', function() {
  console.log('running a task every minute');
  
  archive.readListOfUrls( (sites) => {
    sites.forEach( site => {
      if (site !== '') {
        archive.isUrlArchived(site.trim(), null, () => { return; }, archive.downloadUrl);
      }
    });
    
  });
  
  
  
});
