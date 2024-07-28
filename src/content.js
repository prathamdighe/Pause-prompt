chrome.storage.sync.get(['extensionActive', 'repeatIntervals'], function(data) {
  if (data.extensionActive !== false) {  // Default to active if not set
    let videos = document.querySelectorAll('video');
    videos.forEach(video => {
      let initialPauseDone = false;
      let repeatIntervals = data.repeatIntervals;

      function pauseAt5() {
        let pauseTime = video.duration * 0.05;  // Set to 5% for testing

        video.addEventListener('timeupdate', function() {
          if (video.currentTime >= pauseTime && !initialPauseDone) {
            video.pause();
            initialPauseDone = true;
            showPausePrompt();
          }
        });
      }

      function showPausePrompt() {
        let prompt = document.createElement('div');
        prompt.style.position = 'fixed';
        prompt.style.top = '50%';
        prompt.style.left = '50%';
        prompt.style.transform = 'translate(-50%, -50%)';
        prompt.style.background = 'rgba(0, 0, 0, 0.8)';
        prompt.style.color = 'white';
        prompt.style.padding = '40px';
        prompt.style.borderRadius = '10px';
        prompt.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        prompt.style.zIndex = 1000;

        let message = document.createElement('p');
        message.innerText = 'Do you want to continue watching?';

        let button = document.createElement('button');
        button.innerText = 'Continue Watching';
        button.style.marginTop = '10px';
        button.style.padding = '10px 20px';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.background = '#00BFFF';
        button.style.color = 'white';
        button.style.cursor = 'pointer';
        button.onclick = function() {
          video.play();
          document.body.removeChild(prompt);
          if (repeatIntervals) {
            pauseAtNext5();
          }
        };

        prompt.appendChild(message);
        prompt.appendChild(button);
        document.body.appendChild(prompt);
      }

      function pauseAtNext5() {
        let nextPauseTime = video.currentTime + ((video.duration - video.currentTime) * 0.05);

        video.addEventListener('timeupdate', function() {
          if (video.currentTime >= nextPauseTime) {
            video.pause();
            showPausePrompt();
          }
        });
      }

      pauseAt5();
    });
  }
});
