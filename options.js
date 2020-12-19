//Copyright (c) 2020 SuperPupperDoggo. See LICENSE for details

//  options.js - Script that handles the extension's options page

var sitedisablelist = document.getElementById("sitedisablelist");
var popupdelay = document.getElementById("popUpDelay");
var breaktimeS0 = 10;
var breaktimeS1 = 43;
var breaktimeS2 = 11;
var breaktimeS3 = 13;

//Create a list of weekday numbers that is much easier to parse at runtime
function createDisabledWeekdays(mon,tue,wed,thu,fri) {
disabledDays = "0,6";
if (mon == true) {
disabledDays = disabledDays.concat(",1");
}
if (tue == true) {
  disabledDays = disabledDays.concat(",2");
}
if (wed == true) {
  disabledDays = disabledDays.concat(",3");
}
if (thu == true) {
  disabledDays = disabledDays.concat(",4");
}
if (fri == true) {
  disabledDays = disabledDays.concat(",5");
}
return disabledDays;
}
//Restores options from chrome.storage
  function restore_options() {
    chrome.storage.sync.get({
      sitedisablelist: "example.com",
      siteenablelist: "scratch.mit.edu",
      sitesometimeslist: "jamboard.google.com,www.freeworldgroup.com",
      popupdelay: 60000,
      disableWD1: false,
      disableWD2: false,
      disableWD3: false,
      disableWD4: true,
      disableWD5: false,
      breaktime: [10,43,11,13],
      breakstart: "10:43",
      breakend: "11:13",
      longpopupdelay: 1800000
    }, function(items) {
      document.getElementById('siteDisableList').value = items.sitedisablelist;
      document.getElementById('siteEnableList').value = items.siteenablelist;
      document.getElementById('siteSometimesList').value = items.sitesometimeslist;
      document.getElementById('popUpDelay').value = items.popupdelay;
      document.getElementById('longPopUpDelay').value = items.longpopupdelay;
      document.getElementById('disableWD1').checked = items.disableWD1;
      document.getElementById('disableWD2').checked = items.disableWD2;
      document.getElementById('disableWD3').checked = items.disableWD3;
      document.getElementById('disableWD4').checked = items.disableWD4;
      document.getElementById('disableWD5').checked = items.disableWD5;
      //breaktimeS0 = toString(items.breakTime[0]);
      //breaktimeS1 = toString(items.breakTime[1]);
      //breaktimeS2 = toString(items.breakTime[2]);
      //breaktimeS3 = toString(items.breakTime[3]);
      document.getElementById('breakStart').value = items.breakstart;
      document.getElementById('breakEnd').value =  items.breakend;
    });
  }
// Saves options to chrome.storage
function save_options() {
    var setting_sitedisablelist = document.getElementById('siteDisableList').value;
    var setting_siteenablelist = document.getElementById('siteEnableList').value;
    var setting_sitesometimeslist = document.getElementById('siteSometimesList').value;
    var setting_popupdelay = document.getElementById('popUpDelay').value;
    var setting_longpopupdelay = document.getElementById('longPopUpDelay').value;
    var setting_disablewd1 = document.getElementById('disableWD1').checked;
    var setting_disablewd2 = document.getElementById('disableWD2').checked;
    var setting_disablewd3 = document.getElementById('disableWD3').checked;
    var setting_disablewd4 = document.getElementById('disableWD4').checked;
    var setting_disablewd5 = document.getElementById('disableWD5').checked;
    var setting_disabledWeekDays = createDisabledWeekdays(setting_disablewd1,setting_disablewd2,setting_disablewd3,setting_disablewd4,setting_disablewd5);
    var breakStart = document.getElementById('breakStart').value
    var breakEnd = document.getElementById('breakEnd').value
    var breakTimeS = document.getElementById('breakStart').value.split(":");
    breakTimeS.push(document.getElementById('breakEnd').value.split(":")[0]);
    breakTimeS.push(document.getElementById('breakEnd').value.split(":")[1]);
    breakTimeS[0] = parseInt(breakTimeS[0])
    breakTimeS[1] = parseInt(breakTimeS[1])
    breakTimeS[2] = parseInt(breakTimeS[2])
    breakTimeS[3] = parseInt(breakTimeS[3])
    cTime = new Date();
    bTimeS = new Date();
    bTimeS.setHours(breakTimeS[0],breakTimeS[1],0); // break start date object
    bTimeE = new Date();
    bTimeE.setHours(breakTimeS[2],breakTimeS[3],0); // break end date object
    console.log(breakTimeS)
    if (bTimeE < bTimeS) {
      window.alert("WARNING: The break start time is set to before the break end time. This may cause issues related to the break time feature.");
    }
    if (setting_popupdelay > setting_longpopupdelay) {
      window.alert("WARNING: The long popup delay is shorter than the standard popup delay")
    }
    if (setting_popupdelay < 15000) {
      window.alert("WARNING: The popup delay is less than 15 seconds. As this may be annoying and counterproductive, it is only recommended for debugging purposes.")
    }
    if (setting_longpopupdelay < 300000) {
      window.alert("WARNING: The long popup delay is less than 5 minutes. As this may be annoying and counterproductive, it is only recommended for debugging purposes.")
    }
    if (setting_disablewd1 && setting_disablewd2 && setting_disablewd3 && setting_disablewd4 && setting_disablewd5) {
      window.alert("WARNING: The extension is effectivley disabled. As such it will not be able to help you unless you re-enable 1 or more weekdays.")
    }
    chrome.storage.sync.set({
      sitedisablelist: setting_sitedisablelist,
      popupdelay: setting_popupdelay,
      longpopupdelay: setting_longpopupdelay,
      siteenablelist: setting_siteenablelist,
      sitesometimrdlist: setting_sitesometimeslist,
      disableWD1: setting_disablewd1,
      disableWD2: setting_disablewd2,
      disableWD3: setting_disablewd3,
      disableWD4: setting_disablewd4,
      disableWD5: setting_disablewd5,
      disabledWeekDays: setting_disabledWeekDays,
      breaktime: breakTimeS,
      breakstart: breakStart,
      breakend: breakEnd
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      console.info("Options Saved");
      setTimeout(function() {
        status.textContent = '';
      }, 750);

    });
  }
  
  window.addEventListener('load', function load(event){
    setUpPage();
    
  })

savebtn = document.getElementById('save')
function setUpPage() {
restore_options() //Load the options for editing
    var savebtn = document.getElementById("save")
    savebtn.addEventListener('click',function() {
      if (!document.getElementById('popUpDelay').value == "") {
      save_options()
      }
    })
}
