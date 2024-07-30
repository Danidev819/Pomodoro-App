const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const resetBtn = document.querySelector(".btn-reset");
const pauseBtn = document.querySelector(".btn-pause");
const session = document.querySelector(".minutes");
let myInterval;
let state = "off";
let sessionAmount = Number.parseInt(session.textContent); // Almacenar el valor inicial de sessionAmount

const appTimer = () => {
	if (state === "off" || state === "paused") {
		// Actualizar sessionAmount solo si el estado es "off" o "paused"
		sessionAmount = Number.parseInt(session.textContent);
	}

	if (state === "off") {
		state = "on";
		let totalSeconds = sessionAmount * 60;

		const updateSeconds = () => {
			const minuteDiv = document.querySelector(".minutes");
			const secondDiv = document.querySelector(".seconds");

			totalSeconds--;

			let minutesLeft = Math.floor(totalSeconds / 60);
			let secondsLeft = totalSeconds % 60;

			if (secondsLeft < 10) {
				secondDiv.textContent = "0" + secondsLeft;
			} else {
				secondDiv.textContent = secondsLeft;
			}
			minuteDiv.textContent = `${minutesLeft}`;

			if (minutesLeft === 0 && secondsLeft === 0) {
				bells.play();
				clearInterval(myInterval);
			}
		};
		myInterval = setInterval(updateSeconds, 1000);
	} else {
		alert("Timer is already running");
	}
};

const resetTimer = () => {
	clearInterval(myInterval);
	document.querySelector(".minutes").textContent = "25";
	document.querySelector(".seconds").textContent = "00";
	state = "off";
	pauseBtn.textContent = "Pause"; // Reset the text content of pauseBtn to "Pause"
};

const resumeTimer = () => {
	if (state === "paused") {
		// Tiene que seguir contando desde donde se quedo con lo cual no se usa appTimer()
		state = "on";
		let totalSeconds =
			Number.parseInt(document.querySelector(".minutes").textContent) * 60 +
			Number.parseInt(document.querySelector(".seconds").textContent);
		const updateSeconds = () => {
			const minuteDiv = document.querySelector(".minutes");
			const secondDiv = document.querySelector(".seconds");

			totalSeconds--;

			let minutesLeft = Math.floor(totalSeconds / 60);
			let secondsLeft = totalSeconds % 60;

			if (secondsLeft < 10) {
				secondDiv.textContent = "0" + secondsLeft;
			} else {
				secondDiv.textContent = secondsLeft;
			}
			minuteDiv.textContent = `${minutesLeft}`;

			if (minutesLeft === 0 && secondsLeft === 0) {
				bells.play();
				clearInterval(myInterval);
			}
		};
		myInterval = setInterval(updateSeconds, 1000);
		pauseBtn.textContent = "Pause";
	}
};

const pauseTimer = () => {
	if (state === "on") {
		clearInterval(myInterval);
		state = "paused";
		pauseBtn.textContent = "Resume";
	} else if (state === "paused") {
		resumeTimer();
		pauseBtn.textContent = "Pause";
	}
};

startBtn.addEventListener("click", appTimer);
resetBtn.addEventListener("click", resetTimer);
pauseBtn.addEventListener("click", pauseTimer);
