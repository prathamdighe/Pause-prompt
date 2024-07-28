// Check if extension is active
chrome.storage.sync.get(
  ["extensionActive", "repeatIntervals"],
  function (data) {
    if (data.extensionActive !== false) {
      // Default to active if not set
      let videos = document.querySelectorAll("video");
      videos.forEach((video) => {
        let initialPauseDone = false;
        let repeatIntervals = data.repeatIntervals;
        let pauseTime = video.duration * 0.37; // Set to 37% for final implementation
        let nextPauseTime = null;

        // Create pause prompt
        let prompt = document.createElement("div");
        prompt.style.position = "fixed";
        prompt.style.top = "50%";
        prompt.style.left = "50%";
        prompt.style.transform = "translate(-50%, -50%)";
        prompt.style.background = "rgba(0, 0, 0, 0.8)";
        prompt.style.color = "white";
        prompt.style.padding = "40px";
        prompt.style.borderRadius = "10px";
        prompt.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
        prompt.style.zIndex = 1000;
        prompt.style.display = "none";
        prompt.style.fontFamily = "Arial, sans-serif";
        prompt.style.textAlign = "center";

        let message = document.createElement("p");
        message.innerText = "Do you want to continue watching?";

        let button = document.createElement("button");
        button.innerText = "Continue Watching";
        button.style.marginTop = "10px";
        button.style.padding = "10px 20px";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.background = "#00BFFF";
        button.style.color = "white";
        button.style.cursor = "pointer";

        button.onmouseover = function () {
          button.style.background = "#0099FF";
        };

        button.onmouseout = function () {
          button.style.background = "#00BFFF";
        };

        button.onclick = function () {
          video.play();
          prompt.style.display = "none";
          if (repeatIntervals) {
            nextPauseTime =
              video.currentTime + (video.duration - video.currentTime) * 0.37;
          }
        };

        prompt.appendChild(message);
        prompt.appendChild(button);
        document.body.appendChild(prompt);

        // Add event listeners to video
        video.addEventListener("timeupdate", function () {
          if (video.currentTime >= pauseTime && !initialPauseDone) {
            video.pause();
            initialPauseDone = true;
            prompt.style.display = "block";
          } else if (
            nextPauseTime !== null &&
            video.currentTime >= nextPauseTime
          ) {
            video.pause();
            prompt.style.display = "block";
          }
        });

        video.addEventListener("seeked", function () {
          if (video.currentTime < pauseTime) {
            initialPauseDone = false;
          }
        });
      });
    }
  }
);
