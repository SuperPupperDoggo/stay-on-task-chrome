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
      breakenabled: true,
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
      document.getElementById('breakEnabled').checked = items.breakenabled;
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
    var breakEnabled = document.getElementById('breakEnabled').checked;
    var breakStart = document.getElementById('breakStart').value;
    var breakEnd = document.getElementById('breakEnd').value;
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
    console.log(setting_popupdelay)
    console.log("is greater than")
    console.log(setting_longpopupdelay)
    if (parseInt(setting_popupdelay) > parseInt(setting_longpopupdelay)) { //For some reason one of them is not an integer to start???
      window.alert("WARNING: The long popup delay is shorter than the standard popup delay\n".concat(setting_popupdelay).concat(">").concat(setting_longpopupdelay))
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
      breakend: breakEnd,
      breakenabled: breakEnabled
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
      if (document.getElementById('popUpDelay').value !== "" && document.getElementById('longPopUpDelay').value !== "") {
      save_options()
      }
    });
    var resetbtn = document.getElementById("reset");
    resetbtn.addEventListener('click',function() {
      if (window.confirm("Are you sure you want to reset all settings to their default values?")) {
      chrome.storage.sync.clear()
      location.reload()
      }
    });
    var advancedsection = document.getElementById('advancedSettings');
    var advancedbtn = document.getElementById('advancedBtn');
    advancedbtn.addEventListener('click',function() {
      if (advancedsection.style.display=='none') {
        advancedsection.style.display=''
      } else {
        advancedsection.style.display='none'
      }
    });
    var breakEnabledBox = document.getElementById('breakEnabled');
    var breakTimeSection = document.getElementById('breakTimes');
    breakEnabledBox.addEventListener('click',function() {
      if (breakEnabledBox.checked) {
        breakTimeSection.style.display=''
      } else {
        breakTimeSection.style.display='none'
      }
    });
    
    var cfgInputBtn = document.getElementById("configUpload")
    cfgInputBtn.addEventListener('click',function() {
    var inputData = window.prompt("Paste the config string below")
    var config = atob(inputData).split(";")
      document.getElementById('siteDisableList').value = config[0];
      document.getElementById('siteEnableList').value = config[1];
      document.getElementById('siteSometimesList').value = config[2];
      document.getElementById('popUpDelay').value = parseInt(config[3]);
      document.getElementById('longPopUpDelay').value = parseInt(config[4]);
      wDays = config[5].split("-")
      document.getElementById('disableWD1').checked = (wDays[0] == "y")
      document.getElementById('disableWD2').checked = (wDays[1] == "y")
      document.getElementById('disableWD3').checked = (wDays[2] == "y");
      document.getElementById('disableWD4').checked = (wDays[3] == "y")
      document.getElementById('disableWD5').checked = (wDays[4] == "y");
      document.getElementById('breakEnabled').checked = (config[6] == "true");
      document.getElementById('breakStart').value = config[7];
      document.getElementById('breakEnd').value =  config[8];
    });
  var cfgOutputBtn = document.getElementById("configDownload")
  cfgOutputBtn.addEventListener('click',function() {
    setting_sitedisablelist = document.getElementById('siteDisableList').value;
    setting_siteenablelist = document.getElementById('siteEnableList').value;
    setting_sitesometimeslist = document.getElementById('siteSometimesList').value;
    setting_popupdelay = document.getElementById('popUpDelay').value;
    setting_longpopupdelay = document.getElementById('longPopUpDelay').value;
    setting_disablewd1 = document.getElementById('disableWD1').checked;
    setting_disablewd2 = document.getElementById('disableWD2').checked;
    setting_disablewd3 = document.getElementById('disableWD3').checked;
    setting_disablewd4 = document.getElementById('disableWD4').checked;
    setting_disablewd5 = document.getElementById('disableWD5').checked;
    var daysBool = [setting_disablewd1,setting_disablewd2,setting_disablewd3,setting_disablewd4,setting_disablewd5];
    var i;
    for (i = 0; i < 4; i++) { 
      if (daysBool[i]) {
        daysBool[i] = "y"
      } else {
        daysBool[i] = "n"
      }
    }
    var days = daysBool.join("-")
    breakEnabled = document.getElementById('breakEnabled').checked;
    breakStart = document.getElementById('breakStart').value;
    breakEnd = document.getElementById('breakEnd').value;
    var datList = [setting_sitedisablelist,setting_siteenablelist,setting_sitesometimeslist,setting_popupdelay,setting_longpopupdelay,days,breakEnabled,breakStart,breakEnd];
    var datFinal = btoa(datList.join(";"));
    var datText = document.createTextNode(datFinal);
    advancedsection.append(datText);
  });
}
