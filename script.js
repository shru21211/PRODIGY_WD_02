let startTime;
let running = false;
let lapTimes = [];
let interval;

function startStop() {
  if (running) {
    clearInterval(interval);
    document.getElementById("startStopButton").innerText = "Start";
    running = false;
  } else {
    startTime = Date.now() - (lapTimes.length > 0 ? lapTimes.reduce((a, b) => a + b, 0) : 0);
    interval = setInterval(updateDisplay, 10);
    document.getElementById("startStopButton").innerText = "Stop";
    running = true;
  }
}

function updateDisplay() {
  const currentTime = Date.now() - startTime;
  const minutes = Math.floor(currentTime / 60000);
  const seconds = Math.floor((currentTime % 60000) / 1000);
  const milliseconds = Math.floor((currentTime % 1000) / 10);
  document.getElementById("display").innerText = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function reset() {
  clearInterval(interval);
  document.getElementById("display").innerText = "00:00:00";
  document.getElementById("startStopButton").innerText = "Start";
  lapTimes = [];
  document.getElementById("lapTimes").innerHTML = "";
  running = false;
}

function lap() {
  const currentTime = Date.now() - startTime;
  const lapTime = currentTime - (lapTimes.length > 0 ? lapTimes.reduce((a, b) => a + b, 0) : 0);
  lapTimes.push(lapTime);
  const lapTimeString = `${formatTime(Math.floor(lapTime / 60000))}:${formatTime(Math.floor((lapTime % 60000) / 1000))}:${formatTime(Math.floor((lapTime % 1000) / 10))}`;
  const lapListItem = document.createElement("li");
  lapListItem.innerText = lapTimeString;
  document.getElementById("lapTimes").appendChild(lapListItem);
}
