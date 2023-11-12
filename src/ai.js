let isHardMode = false;

function aiTurn(currentScore, callback) {
    let aiChoice;

    if (isHardMode) {
        aiChoice = 11 - (currentScore % 11); 
        if (aiChoice > 10) aiChoice = 10; 
    } else {
        // Random choice in Easy mode
        aiChoice = Math.floor(Math.random() * 10) + 1;
    }

    callback(aiChoice);
}

function setAIDifficulty(hardMode) {
    isHardMode = hardMode;
}

function getAIDifficulty() {
    return isHardMode;
}

module.exports = { aiTurn, setAIDifficulty, getAIDifficulty };
