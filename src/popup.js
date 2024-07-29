document.addEventListener("DOMContentLoaded", function () {
  let toggleExtensionButton = document.getElementById("toggleExtension");
  let toggleIntervalsButton = document.getElementById("toggleIntervals");

  chrome.storage.sync.get(
    ["extensionActive", "repeatIntervals"],
    function (data) {
      toggleExtensionButton.innerText =
        data.extensionActive !== false
          ? "Deactivate Extension"
          : "Activate Extension";
      toggleIntervalsButton.innerText = data.repeatIntervals
        ? "Disable repeated intervals"
        : "Enable repeated intervals";
    }
  );

  toggleExtensionButton.addEventListener("click", function () {
    chrome.storage.sync.get("extensionActive", function (data) {
      let newState = !data.extensionActive;
      chrome.storage.sync.set({ extensionActive: newState }, function () {
        toggleExtensionButton.innerText = newState
          ? "Deactivate Extension"
          : "Activate Extension";
      });
    });
  });

  toggleIntervalsButton.addEventListener("click", function () {
    chrome.storage.sync.get("repeatIntervals", function (data) {
      let newState = !data.repeatIntervals;
      chrome.storage.sync.set({ repeatIntervals: newState }, function () {
        toggleIntervalsButton.innerText = newState
          ? "Disable repeated intervals"
          : "Enable repeated intervals";
      });
    });
  });
});
