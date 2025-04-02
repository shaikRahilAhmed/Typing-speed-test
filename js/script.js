const text = "The quick brown fox jumps over the lazy dog.";
const inputBox = document.getElementById("user-input");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");

let time = 0, timer, isRunning = false;

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        time = 0;
        timerDisplay.innerText = "Time: 0s";
        resultDisplay.classList.add("hidden");

        timer = setInterval(() => {
            time++;
            timerDisplay.innerText = `Time: ${time}s`;
            updateSpeed();
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    let wordsTyped = inputBox.value.trim().split(/\s+/).length;
    let wpm = time > 0 ? Math.round((wordsTyped / time) * 60) : 0;
    resultDisplay.innerText = `Completed! Your speed: ${wpm} WPM`;
    resultDisplay.classList.remove("hidden");
}

function updateSpeed() {
    if (time > 0 && isRunning) {
        let wordsTyped = inputBox.value.trim().split(/\s+/).length;
        let wpm = Math.round((wordsTyped / time) * 60);
        resultDisplay.innerText = `Speed: ${wpm} WPM`;
    }
}


inputBox.addEventListener("input", () => {
    if (!isRunning) startTimer();

    
    if (inputBox.value.trim() === text.trim()) {
        stopTimer();
        inputBox.disabled = true; 
    }
});


inputBox.addEventListener("focus", () => {
    inputBox.value = "";
    inputBox.disabled = false;
    timerDisplay.innerText = "Time: 0s";
    resultDisplay.classList.add("hidden");
    isRunning = false; 
    clearInterval(timer);
});
