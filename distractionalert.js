//Copyright (c) 2020 SuperPupperDoggo. See LICENSE for details.

//  distractionalert.js - Main script of the Stay On Task Chrome extension

//Setup Variables
var run = true; //Whether or not the popup should appear
var dismissCounter = -1; //How many times the user has dismissed the popup. It is shown and quickly hidden during page loading to start the setTimeout() loop, thus it is set to -1
var date = new Date(); //The Current Date. Used for the disabled weekdays option.
var hostname_full = window.location.hostname; //Used for matching against non-hardcoded rules
var hostname = window.location.hostname.split("."); //splits up the hostname into each of it's pieces. Really only used to get top level domain.
var tlDomain = hostname[hostname.length-1]; //Top Level Domain. Used in special rule cases.
var siteDisableList = []; //In case setting(s) don't load properly, it will use the default value(s)
var siteEnableList = ["scratch.mit.edu"];
var siteSometimesList = ["jamboard.google.com","www.freeworldgroup.com"];
var breakTime = [10,43,11,13]
var popupDelay = 60000; //time between the appearance of the popup in ms
var useLongDelay = false;
var disabledDays = [0,4,6]; //weekdays on which the popup should be disabled
var navOpen = false; //Is the popup open? Used to prevent accedental incrementation of the dismiss counter


let overlayelement = document.createElement("div", [id='distractionOverlay']); //The main overlay element
overlayelement.setAttribute("id","distractionOverlay");
let overlayText1 = document.createElement("a"); //Stylized interactive "Are you still on task" button/text
var linkText = document.createTextNode("Are you still on task?");
overlayText1.appendChild(linkText); //Append to the main overlay element
overlayText1.title = "Are you still on task?";
overlayText1.href = "javascript:void(0)";
overlayText1.className = "overlay-content"; //Stylize
var dismissText = document.createTextNode("You have dismissed this popup "); //Dismiss counter static text 1
var dismissTextC = document.createElement("div"); //Container element for static text 1
dismissTextC.appendChild(dismissText); //Add static text 1 to container
dismissTextC.className = "overlay-text"; //Stylize
var dismissCountText = document.createTextNode(0); //Create dismiss count element
var dismissCountTextC = document.createElement("div"); //Container element for dismiss count
dismissCountTextC.appendChild(dismissCountText); //Add dismiss count element to container
dismissCountTextC.className = "overlay-text"; //Stylize
var dismissText2 = document.createTextNode(" times on this tab"); //Dismiss counter static text 2
var dismissText2C = document.createElement("div"); //Container element for static text 2
dismissText2C.appendChild(dismissText2); //Add static text 2 to container
dismissText2C.className = "overlay-text"; //Stylize
overlayelement.className = "overlay";
overlayelement.appendChild(overlayText1);
overlayelement.appendChild(dismissTextC);
overlayelement.appendChild(dismissCountTextC);
overlayelement.appendChild(dismissText2C);
document.body.append(overlayelement); //Add the assembled overlay to the page body


  chrome.storage.sync.get({
    sitedisablelist: "",
    siteenablelist: "scratch.mit.edu",
    sitesometimeslist: "jamboard.google.com,www.freeworldgroup.com",
    popupdelay: 60000, //in miliseconds
    longpopupdelay: 1800000,
    disabledWeekDays: "0,6,4"
  }, function(items) {
    //For some reason despite the variables having been defined outside this function, the values are still lost when the function ends. So I just put everything inside it
    siteDisableList = items.sitedisablelist.split(",");
    siteEnableList = items.siteenablelist.split(",");
    siteSometimesList = items.sitesometimeslist.split(",");
    popupDelay = items.popupdelay;
    longPopupDelay = items.longpopupdelay;
    disabledWeekDays = items.disabledWeekDays.split(",");
    cTime = parseInt(date.getHours().toString().concat(date.getMinutes().toString));
    bTimeS = parseInt(breakTime[0].toString().concat(breakTime[1].toString));
    bTimeE = parseInt(breakTime[2].toString().concat(breakTime[3].toString));
    if (disabledDays.indexOf(date.getDay) !== -1) {
      run = false;
  }
  //Special case with .edu domains
  if (tlDomain == "edu" && siteEnableList.indexOf(hostname_full) == -1) {
      run = false
  }
  //Check the current site against the non-hardcoded filter list
  if (siteDisableList.indexOf(hostname_full) !== -1 && siteEnableList.indexOf(hostname_full) == -1) {
    run = false
  }
  if (cTime >= bTimeS && cTime <= bTimeE) {
    run = false
  }
  if (siteSometimesList.indexOf(hostname_full) !== -1 && siteEnableList.indexOf(hostname_full) == -1) {
    popUpDelay = longPopupDelay
    useLongDelay = true
    linkText.nodeValue = "Do you need to use this site?"
    dismissText.nodeValue = "You have awnsered yes "
  }
//Open the popup
  function openNav() {
    overlayelement.style.height = "100%"
    navOpen = true
    if (useLongDelay) {
      setTimeout(openNav, longPopupDelay);
    } else {
      setTimeout(openNav, popupDelay);
    }
    
  }
//Close the popup
  function closeNav() {
    overlayelement.style.height = "0%";
    dismissCounter = dismissCounter + 1
    navOpen = false
    dismissCountText.nodeValue = dismissCounter
  }
  //Now that closeNav() has been defined...
  overlayText1.addEventListener('click',function() {
    if (navOpen) {
    closeNav()
    navOpen = false
    }
  })
  //If the site should have the stay on task popup, then start the setTimeout() loop
  if (run == true) { 
     openNav();
     closeNav();
  }
  if (useLongDelay) {
    openNav();
  }
  });
