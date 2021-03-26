//Error Callback
function errorCB() {
  //Display an error
  var errormsg = document.createElement("p");
  errormsg.style = "font-size:25; color:red";
  errormsg.nodeValue =
    "Oops, something went wrong trying to let the extension know that this page was opened. Let the student record the error details, then try closing and reopening this page, as it did not count as a warning. Details of the error are as follows: ";
  var errordetails = document.createTextNode(runtime.lastError);
  document.body.append(errormsg);
  document.body.append(errordetails);
}

//Send message when the page is opened
runtime.sendMessage(
  "midkkmnnhpbdkcgkdnldgegdjiplcimd",
  "teacherReminderRecieved"
);

//Listen for message indicating locked mode status.
runtime.onMessage.addListener(function (message, sender) {
  //If locked mode is on...
  if (message == "lockedDownEnabled") {
    var warntext = document.getElementById("warningtext");
    warntext.nodeValue =
      "Please pause what you're doing and work on this. You may disable the popup for 30 seconds to pause what you are doing, and then you will be locked out of distracting sites for xx minutes.";
  }
});
