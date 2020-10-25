var run
var dismissCounter = -1
var disabledDays
var date = new Date();
var hostname
var tlDomain
var siteDisableList
var siteEnableList
var popupDelay = 60000
var disabledDays = [0,4,6]
var navOpen = false
run = true
//dismissCounter = -1
//disabledDays = [0,4,6]

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
    siteDisableList = items.sitedisablelist.split(",")
    siteEnableList = items.siteenablelist.split(",")
    popupDelay = items.popupdelay;
    disabledWeekDays = items.disabledWeekDays.split(",")
    if (disabledDays.indexOf(date.getDay) !== -1) {
      run = false
  }
  
  hostname_full = window.location.hostname
  hostname = window.location.hostname.split(".")
  tlDomain = hostname[hostname.length-1]
  console.trace(tlDomain)
  console.trace(popupDelay)
console.trace(siteDisableList)
console.trace(siteEnableList)
  if (tlDomain == "edu") {
  if (siteEnableList.indexOf(hostname_full) == -1) {
      run = false
  }
  }
  
  if (siteDisableList.indexOf(hostname_full) !== -1) {
    run = false
  }
  
  function openNav() {
    overlayelement.style.height = "100%"
    navOpen = true
    setTimeout(openNav, popupDelay);
  }
  
  function closeNav() {
    overlayelement.style.height = "0%";
    dismissCounter = dismissCounter + 1
    navOpen = false

    dismissCountText.nodeValue = dismissCounter
    
  }
  overlayText1.addEventListener('click',function() {
    if (navOpen) {
    closeNav()
    navOpen = false
    }
  })

  function disableThisSession() {
  //	run = false
  }

  if (run == true) {
      
     openNav();
     closeNav()
  }
  });