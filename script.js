// Digital Clock
let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

setInterval(() => {
    let currentTime = new Date();
    hrs.innerHTML = (currentTime.getHours()<10?"0":"") + currentTime.getHours();
    min.innerHTML = (currentTime.getMinutes()<10?"0":"") + currentTime.getMinutes();
    sec.innerHTML = (currentTime.getSeconds()<10?"0":"") + currentTime.getSeconds();
}, 1000);

        // Countdown Timer
        let interval;
let pausedTime = null; // Store remaining time when paused
const timerModal = document.getElementById("timerModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const stopBtn = document.getElementById("stop");
const continueBtn = document.getElementById("continue");

window.onload = () => {
    document.querySelector('#calculate').onclick = calculate;
    document.querySelector('#reset').onclick = reset;
    stopBtn.onclick = pauseTimer;
    continueBtn.onclick = continueTimer;
    closeModal.onclick = () => {
        timerModal.style.display = 'none';
    };
}

function calculate() {
    stopTimer();
    
    const date = document.querySelector('#date').value;
    const time = document.querySelector('#time').value;
    
    if (!date || !time) {
        showModal("⚠️ Input Required", "Please enter both date and time to start the timer!");
        return;
    }

    const endtime = new Date(date + ' ' + time);
    
    if (endtime <= new Date()) {
        showModal("⏱️ Invalid Time", "Please select a future date and time for the timer!");
        return;
    }

    // Store the original end time
    pausedTime = endtime;
    startTimer(endtime);
}

function startTimer(endtime) {
    interval = setInterval(() => calculateTime(endtime), 1000);
    stopBtn.style.display = 'inline-block';
    continueBtn.style.display = 'none';
}

function calculateTime(endtime) {
    const currentTime = new Date();
    const days = document.querySelector('#counting-days');
    const hours = document.querySelector('#counting-hrs');
    const minutes = document.querySelector('#counting-min');
    const seconds = document.querySelector('#counting-sec');

    if (endtime > currentTime) {
        const timeleft = (endtime - currentTime) / 1000;
        
        days.innerText = Math.floor(timeleft / (3600 * 24));
        hours.innerText = Math.floor((timeleft / (60 * 60)) % 24);
        minutes.innerText = Math.floor((timeleft / 60) % 60);
        seconds.innerText = Math.floor(timeleft % 60);
        
        // Update pausedTime with the current remaining time
        pausedTime = new Date(currentTime.getTime() + (timeleft * 1000));
    } else {
        timerComplete();
    }
}

function pauseTimer() {
    if (interval) {
        clearInterval(interval);
        interval = null;
        stopBtn.style.display = 'none';
        continueBtn.style.display = 'inline-block';
    }
}

function continueTimer() {
    if (pausedTime) {
        startTimer(pausedTime);
    }
}

function timerComplete() {
    stopTimer();
    document.querySelector('#counting-days').innerText = 0;
    document.querySelector('#counting-hrs').innerText = 0;
    document.querySelector('#counting-min').innerText = 0;
    document.querySelector('#counting-sec').innerText = 0;
    
    showModal("🎉 Timer Completed!", "Your countdown has reached zero!");
}

function stopTimer() {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
    stopBtn.style.display = 'inline-block';
    continueBtn.style.display = 'none';
}

function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    timerModal.style.display = "flex";
}

function reset() {
    stopTimer();
    pausedTime = null;
    document.querySelector('#counting-days').innerText = 0;
    document.querySelector('#counting-hrs').innerText = 0;
    document.querySelector('#counting-min').innerText = 0;
    document.querySelector('#counting-sec').innerText = 0;
    document.querySelector('#date').value = '';
    document.querySelector('#time').value = '';
    stopBtn.style.display = 'inline-block';
    continueBtn.style.display = 'none';
}