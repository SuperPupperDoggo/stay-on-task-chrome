var run
var dismissCounter
var disabledDays
var date
var hostname
var tlDomain
var whitelistedDomains

run = true
//dismissCounter = -1
disabledDays = [0,4,6]
date = new Date();

let overlayelement = document.createElement("div", [id='distractionOverlay']);
overlayelement.setAttribute("id","distractionOverlay")
let overlayText1 = document.createElement("a")
var linkText = document.createTextNode("Are you still on task?");
      overlayText1.appendChild(linkText);
      overlayText1.title = "Are you still on task?";
      overlayText1.href = "javascript:void(0)";
      //overlayText1.onclick = closeNav()
      //overlayText1.setAttribute("onClick","document.getElementById('distractionOverlay').style.height = '0%'")
      overlayText1.setAttribute("onClick","document.getElementById('distractionOverlay').style.height = '0%'")
      overlayText1.className = "overlay-content"
var dismissText = document.createTextNode("You have dismissed this popup ")
var extrascript = document.createElement("script")
extrascript.innerText = "var dismissCounter\ndismisscounter = 0\nfunction closeNav() {\ndocument.getElementById('distractionOverlay').style.height = '0%';\ndismissCounter = dismissCounter + 1\n}"
var dismissCountText = document.createTextNode(0)
//dismissCountText.innerHTML = dismissCounter

var dismissText2 = document.createTextNode(" times on this tab")
overlayelement.className = "overlay"
overlayelement.appendChild(overlayText1)
overlayelement.appendChild(dismissText)
overlayelement.appendChild(dismissCountText)
overlayelement.appendChild(dismissText2)
document.body.append(overlayelement)

if (date.getDay in disabledDays) {
    run = false
}

hostname = window.location.hostname.split(".")
tlDomain = hostname[hostname.length-1]
console.trace(tlDomain)

if (tlDomain == "edu") {
// window.location.hostname in whitelistedDomains
if (!window.location.hostname in whitelistedDomains) {
    run = false
}
}

function openNav() {
    //console.trace(dismissCounter)
    //dismissCounter = dismissCounter + 1
    //dismissCountText.innerHTML = dismissCounter
    //dismissCountText.replaceWith(document.createTextNode(dismissCounter))

  //document.getElementById("distractionOverlay").style.height = "100%";
  overlayelement.style.height = "100%"
  setTimeout(openNav, 10000);
}

function closeNav() {
  //document.getElementById("distractionOverlay").style.height = "0%";
  overlayelement.style.height = "0%";
  //dismissCounter = dismissCounter + 1
  //console.trace(dismissCounter)
  //dismissCountText.innerHTML = dismissCounter
  
}
//openNav()
function disableThisSession() {
//	run = false
}
//openNav()
// do some stuff

if (run == true) {
    
   openNav();
   closeNav()
}
    //000
