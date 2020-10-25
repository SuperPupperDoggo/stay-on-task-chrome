//Copyright (c) 2020 SuperPupperDoggo. All Rights Reserved.

//  distractionalert.js - Main script of the Stay On Task Chrome extension

//Setup Variables
var run = true //Whether or not the popup should appear
var dismissCounter = -1 //How many times the user has dismissed the popup. It is shown and quickly hidden during page loading to start the setTimeout() loop, thus it is set to -1
var date = new Date(); //The Current Date. Used for the disabled weekdays option.
var hostname_full = window.location.hostname //Used for matching against non-hardcoded rules
var hostname = window.location.hostname.split(".") //splits up the hostname into each of it's pieces. Really only used to get top level domain.
var tlDomain = hostname[hostname.length-1] //Top Level Domain. Used in special rule cases.
var siteDisableList = [] //In case setting(s) don't load properly, it will use the default value(s)
var siteEnableList = ["scratch.mit.edu"]
var popupDelay = 60000 
var disabledDays = [0,4,6]
var navOpen = false //Is the popup open? Used to prevent accedental incrementation of the dismiss counter


let overlayelement = document.createElement("div", [id='distractionOverlay']);
overlayelement.setAttribute("id","distractionOverlay")
let overlayText1 = document.createElement("a")
var linkText = document.createTextNode("Are you still on task?");
      overlayText1.appendChild(linkText);
      overlayText1.title = "Are you still on task?";
      overlayText1.href = "javascript:void(0)";
      overlayText1.className = "overlay-content"
var dismissText = document.createTextNode("You have dismissed this popup ")
var dismissTextC = document.createElement("div")
dismissTextC.appendChild(dismissText)
dismissTextC.className = "overlay-text"
var dismissCountText = document.createTextNode(0)
var dismissCountTextC = document.createElement("div")
dismissCountTextC.appendChild(dismissCountText)
dismissCountTextC.className = "overlay-text"
var dismissText2 = document.createTextNode(" times on this tab")
var dismissText2C = document.createElement("div")
dismissText2C.appendChild(dismissText2)
dismissText2C.className = "overlay-text"
overlayelement.className = "overlay"
overlayelement.appendChild(overlayText1)
overlayelement.appendChild(dismissTextC)
overlayelement.appendChild(dismissCountTextC)
overlayelement.appendChild(dismissText2C)
document.body.append(overlayelement)


  chrome.storage.sync.get({
    sitedisablelist: "",
    siteenablelist: "scratch.mit.edu",
    popupdelay: 60000,
    disabledWeekDays: "0,6,4"
  }, function(items) {
    //For some reason despite the variables having been defined outside this function, the values are still lost when the function ends. So I just put everything inside it
    siteDisableList = items.sitedisablelist.split(",")
    siteEnableList = items.siteenablelist.split(",")
    popupDelay = items.popupdelay;
    disabledWeekDays = items.disabledWeekDays.split(",")
    if (disabledDays.indexOf(date.getDay) !== -1) {
      run = false
  }
  //Special case with .edu domains
  if (tlDomain == "edu" && siteEnableList.indexOf(hostname_full) == -1) {
      run = false
  }
  //Check the current site against the non-hardcoded filter list
  if (siteDisableList.indexOf(hostname_full) !== -1 && siteEnableList.indexOf(hostname_full) == -1) {
    run = false
  }
//Open the popup
  function openNav() {
    overlayelement.style.height = "100%"
    navOpen = true
    setTimeout(openNav, popupDelay);
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
     closeNav()
  }
  });