window.addEventListener('message', (event) => {
    if (event.data.action === 'startProgressbar') {
        startProgressBar(event.data.duration, event.data.desc);
    }
});

function startProgressBar(duration, desc) {
    $(".progressbar-container").animate({ bottom: '1.5vw', width: '20vw' }, 300);
    
    let progressBar = document.querySelector(".fill");
    let timeLeftText = document.querySelector(".time");
    let progress = 100;
    let interval = 10;
    let timeLeft = duration + 1000;

    $('.desc').text(desc)

    let progressBarTimer = setInterval(function() {
      if (progress <= 0) {
        clearInterval(progressBarTimer);
          $(".progressbar-container").animate({ bottom: '-10vw', width: '18vw' }, 300);
          $.post(`https://${GetParentResourceName()}/finish`);
      } else {
        progress -= (interval / duration) * 100;
        progressBar.style.width = Math.max(progress, 0) + "%";

        timeLeft -= interval;
        let totalSecondsLeft = Math.max(Math.floor(timeLeft / 1000), 0);
        let minutes = Math.floor(totalSecondsLeft / 60);
        let seconds = totalSecondsLeft % 60;
        timeLeftText.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      }
    }, interval);
  }
