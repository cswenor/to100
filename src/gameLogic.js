const readline = require('readline');
const { aiTurn, setAIDifficulty } = require('./ai');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let totalScore = 0;
let currentPlayer = 1;
let isSinglePlayer = false;

function getTotalScore() {
    return totalScore;
}

function setTotalScore(score) {
    totalScore = score;
}

function getCurrentPlayer() {
    return currentPlayer;
}

function setCurrentPlayer(player) {
    currentPlayer = player;
}

function setIsSinglePlayer(value) {
    isSinglePlayer = value;
}

function resetGameState() {
    totalScore = 0;
    currentPlayer = 1;
}

function askNumber() {
    if (currentPlayer === 1) {
        rl.question(`Your turn, choose a number (1-10): `, (number) => {
            processNumber(number);
        });
    } else {
        aiTurn(totalScore, (aiChoice) => {
            console.log(`AI chooses: ${aiChoice}`);
            processNumber(aiChoice);
        });
    }
}

function processNumber(number) {
    number = parseInt(number, 10);

    if (isNaN(number) || number < 1 || number > 10) {
        console.log('Invalid input. Please enter a number between 1 and 10.');
        return askNumber();
    }

    totalScore += number;
    console.log(`Current total score: ${totalScore}`);

    if (totalScore >= 100) {
        console.log(`Player ${currentPlayer} wins!`);
        return rl.close();
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    // askNumber();
}

function startGame() {
    rl.question('Select game mode (1 for single player, 2 for two players): ', (mode) => {
        if (mode === '1') {
            isSinglePlayer = true;
            rl.question('Select difficulty (Easy or Hard): ', (difficulty) => {
                isHardMode = difficulty.toLowerCase() === 'hard';
                // Randomize who starts first in a single-player game
                currentPlayer = Math.random() < 0.5 ? 1 : 2;
                console.log(currentPlayer === 1 ? 'You start first.' : 'AI starts first.');
                askNumber();
            });
        } else if (mode === '2') {
            askNumber();
        } else {
            console.log('Invalid input. Please enter 1 or 2.');
            startGame();
        }
    });
}

// Add at the end of src/gameLogic.js
module.exports = { startGame, processNumber, askNumber, _testExports: {  getTotalScore, setTotalScore, getCurrentPlayer, setCurrentPlayer, setIsSinglePlayer, resetGameState } };

