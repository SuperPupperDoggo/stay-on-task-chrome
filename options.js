//Copyright (c) 2020 SuperPupperDoggo. All Rights Reserved.

//  options.js - Script that handles the extension's options page

var sitedisablelist = document.getElementById("sitedisablelist");
var popupdelay = document.getElementById("popUpDelay");

//Create a list of weekday numbers that is much easier to parse at runtime
function createDisabledWeekdays(mon,tue,wed,thu,fri) {
disabledDays = "0,6"
if (mon == true) {
disabledDays = disabledDays.concat(",1")
}
if (tue == true) {
  disabledDays = disabledDays.concat(",2")
}
if (wed == true) {
  disabledDays = cdisabledDays.concat(",3")
}
if (thu == true) {
  disabledDays = disabledDays.concat(",4")
}
if (fri == true) {
  disabledDays = disabledDays.concat(",5")
}
return disabledDays
}
//Restores options from chrome.storage
  function restore_options() {
    chrome.storage.sync.get({
      sitedisablelist: "example.com",
      siteenablelist: "scratch.mit.edu",
      popupdelay: 60000,
      disableWD1: false,
      disableWD2: false,
      disableWD3: false,
      disableWD4: true,
      disableWD5: false
    }, function(items) {
      document.getElementById('siteDisableList').value = items.sitedisablelist;
      document.getElementById('siteEnableList').value = items.siteenablelist;
      document.getElementById('popUpDelay').value = items.popupdelay;
      document.getElementById('disableWD1').checked = items.disableWD1;
      document.getElementById('disableWD2').checked = items.disableWD2;
      document.getElementById('disableWD3').checked = items.disableWD3;
      document.getElementById('disableWD4').checked = items.disableWD4;
      document.getElementById('disableWD5').checked = items.disableWD5;
    });
  }
// Saves options to chrome.storage
function save_options() {
    var setting_sitedisablelist = document.getElementById('siteDisableList').value;
    var setting_siteenablelist = document.getElementById('siteEnableList').value;
    var setting_popupdelay = document.getElementById('popUpDelay').value;
    var setting_disablewd1 = document.getElementById('disableWD1').checked
    var setting_disablewd2 = document.getElementById('disableWD2').checked
    var setting_disablewd3 = document.getElementById('disableWD3').checked
    var setting_disablewd4 = document.getElementById('disableWD4').checked
    var setting_disablewd5 = document.getElementById('disableWD5').checked
    var setting_disabledWeekDays = createDisabledWeekdays(setting_disablewd1,setting_disablewd2,setting_disablewd3,setting_disablewd4,setting_disablewd5)
    chrome.storage.sync.set({
      sitedisablelist: setting_sitedisablelist,
      popupdelay: setting_popupdelay,
      siteenablelist: setting_siteenablelist,
      disableWD1: setting_disablewd1,
      disableWD2: setting_disablewd2,
      disableWD3: setting_disablewd3,
      disableWD4: setting_disablewd4,
      disableWD5: setting_disablewd5,
      disabledWeekDays: setting_disabledWeekDays
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      console.info("Options Saved")
      setTimeout(function() {
        status.textContent = '';
      }, 750);

    });
  }
  
  window.addEventListener('load', function load(event){
    setUpPage()
    
  })

savebtn = document.getElementById('save')
function setUpPage() {
restore_options()
    var savebtn = document.getElementById("save")
    savebtn.addEventListener('click',function() {
      if (!document.getElementById('popUpDelay').value == "") {
      save_options()
      }
    })
}