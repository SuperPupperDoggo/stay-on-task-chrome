//Copyright (c) 2020-2021 SuperPupperDoggo. See LICENSE for details.

var lastreminder = 0;
var warningExpirationTime = 300000;

//Restores options from chrome.storage
function restore_options() {
  chrome.storage.local.get(
    {
      sitedisablelist: "example.com"
    },
    function (items) {
      document.getElementById("siteDisableList").value = items.sitedisablelist;
    }
  );
}

function restore_settings() {
  chrome.storage.sync.get(
    {
      warningExpireTimer: 300000
    },
    function (items) {
      warningExpirationTime = items.warningExpireTimer;
    }
  );
}

function errorCB() {
  chrome.notifications.create("", {
    title: "Oops! There was an error.",
    message: runtime.lastError,
    iconUrl: "/erroricon.png",
    type: "basic",
    priority: 2
  });
}

//Message Handler
runtime.onMessage.addListener(function (message, sender) {
  //If reminder message recieved
  if (message == "teacherReminderRecieved") {
    if (
      lastreminder - Date.now() < warningExpirationTime &&
      lastreminder - Date.now() < 60000
    ) {
      //Send message when the page is opened
      runtime.sendMessage("midkkmnnhpbdkcgkdnldgegdjiplcimd", "doLockdown");
    } else {
      if (lastreminder - Date.now() < 60000) {
        chrome.notifications.create("", {
          title: "Please do not abuse the warning system.",
          message: "This will not count as a warning.",
          iconUrl: "/warnicon.png",
          type: "basic",
          priority: 1
        });
      } else {
        if (lastreminder - Date.now() > warningExpirationTime) {
          lastreminder = Date.now();
        }
      }
    }
  }
  //if (message == "popupclosed") {
  //
  //}
});
