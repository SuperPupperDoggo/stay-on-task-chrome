

function csToList(inputdata) {
    return inputdata.split(",")
}

var siteblacklist = document.getElementById("siteBlacklist");
var popupdelay = document.getElementById("popUpDelay");

//console.trace(siteblacklist)

// Saves options to chrome.storage
function save_options() {
    var setting_siteblacklist = document.getElementById('siteBlacklist').value;
    var setting_sitewhitelist = document.getElementById('siteWhitelist').value;
    var setting_popupdelay = document.getElementById('popUpDelay').value;
    chrome.storage.sync.set({
      siteblacklist: setting_siteblacklist,
      popupdelay: setting_popupdelay,
      sitewhitelist: setting_sitewhitelist
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
      siteblacklist: "example.com",
      sitewhitelist: "scratch.mit.edu",
      popupdelay: 60000
    }, function(items) {
      document.getElementById('siteBlacklist').value = items.siteblacklist;
      document.getElementById('siteWhitelist').value = items.sitewhitelist;
      document.getElementById('popUpDelay').value = items.popupdelay;
    });
  }
  //document.addEventListener('DOMContentLoaded', restore_options);
  savebtn = document.getElementById('save')
//  savebtn.addEventListener('click', save_options);
  restore_options()