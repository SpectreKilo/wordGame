const button = document.querySelector("#start-game");
const timeRemainingElement = document.querySelector("#time-remaining");
const wordElement = document.querySelector("#word");
const winsElement = document.querySelector("#wins");
const lossElement = document.querySelector("#losses");

const wordlist = [
	"eat",
	"sleep",
	"code",
	"repeat",
	"javascript",
	"html",
	"hyper",
	"text",
	"markup",
	"language",
	"cascade",
];

let currentWord;
let timeRemaining;
let isGameRunning = false;
let timerTimeoutId;
let typedCharacters = [];
let wins = 0;
let losses = 0;
let gameStatsString = localStorage.getItem("game-stats");

if (gameStatsString !== null) {
	let data = JSON.parse(gameStatsString);
	wins = data.wins;
	losses = data.losses;
	displayStats();
}

button.addEventListener("click", startGame);

function getRandomWord() {
	return wordlist[Math.floor(Math.random() * wordlist.length)];
}

function displayTimeRemaining() {
	timeRemainingElement.textContent = timeRemaining.toString();
}

function displayWord() {
	let visibleWord = "";
	let hasWon = true;
	for (let i = 0; i < currentWord.length; i++) {
		let letter = currentWord[i];
		if (typedCharacters.includes(letter.toLowerCase())) {
			visibleWord += letter;
		} else {
			hasWon = false;
			visibleWord += "_";
		}
	}
	if (hasWon) endGame(true);
	wordElement.textContent = visibleWord;
}

function displayStats() {
	winsElement.textContent = wins.toString();
	lossElement.textContent = losses.toString();
}
function gameTimer() {
	timeRemaining--;
	displayTimeRemaining();
	if (timeRemaining === 0) endGame(false);
}

function startGame() {
	if (isGameRunning) return;
	timeRemaining = 10;
	currentWord = getRandomWord();
	typedCharacters = [];
	isGameRunning = true;
	displayTimeRemaining();
	displayWord();

	timerTimeoutId = setInterval(gameTimer, 1000);
}

function storeGameStats() {
	localStorage.setItem("game-stats", JSON.stringify({ wins, losses }));
}

function endGame(isWin) {
	isGameRunning = false;
	clearInterval(timerTimeoutId);
	if (isWin) {
		wins++;
	} else {
		losses++;
	}
	storeGameStats();
	displayStats();
}

document.addEventListener("keydown", (e) => {
	if (!isGameRunning) return;
	let key = e.key.toLowerCase();
	if (!typedCharacters.includes(key)) {
		typedCharacters.push(key);
		displayWord();
	}
});
