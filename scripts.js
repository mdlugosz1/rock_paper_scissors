const playerPick = document.querySelectorAll('.player-choice');
const scoreBoard = document.querySelectorAll('.scores li span');
const roundHistory = document.querySelector('#round-history');
const computerBackground = document.querySelector('.computer-board');
const playerBackground = document.querySelector('.player-board');
const roundMeter = document.querySelector('span');

let playerPoints = 0;
let computerPoints = 0;
let draw = 0;
let rounds = 1;

begin();

function begin() {
    roundHistory.textContent = '';

    playerPick.forEach(element => {
        element.addEventListener('click', startGame);
    });
}

function startGame(event) {
    const playerChoice = event.currentTarget.value;
    const computerPick = computerPlay();
    const round = playRound(playerChoice, computerPick);

    changeBackground(playerChoice, playerBackground);
    changeBackground(computerPick, computerBackground);
    
    if ((playerPoints === 5) || (computerPoints === 5)) {
        endGame();
    } else {
        checkResults(round, playerChoice, computerPick);
    }
}

function computerPlay() {
    const computerOptions = ['rock', 'paper', 'scissors'];
    const computerChoice = computerOptions[Math.round(Math.random() * (computerOptions.length - 1))];
    return computerChoice;
}

function changeBackground(selection, background) {
    if (selection === 'scissors') {
        background.classList.remove('rock', 'paper');
        background.classList.add('scissors');
    } else if (selection === 'rock') {
        background.classList.remove('paper', 'scissors');
        background.classList.add('rock');
    } else {
        background.classList.remove('rock', 'scissors');
        background.classList.add('paper');
    }
}

function playRound(playerSelection, computerSelection) {
    rounds++;
    roundMeter.textContent = rounds;
    if (playerSelection === computerSelection) {
        draw++;
        scoreBoard[1].textContent = draw;
        return 0;
    } else if ((playerSelection === 'rock' && computerSelection === 'paper') || 
    (playerSelection === 'scissors' && computerSelection === 'rock') || 
    (playerSelection === 'paper' && computerSelection === 'scissors') || 
    ((playerSelection !== 'rock') && (playerSelection !== 'paper') && (playerSelection !== 'scissors'))) {
        computerPoints++;
        scoreBoard[2].textContent = computerPoints;
        return -1;
    } else {
        playerPoints++;
        scoreBoard[0].textContent = playerPoints;
        return 1;
    }
}

function checkResults(winner, playerInput, computerInput) {
    const showResults = document.createElement('p');
    const writeResults = roundHistory.prepend(showResults);
    
    if (winner === -1) {
        showResults.textContent = `Lost! ${playerInput} loses with ${computerInput}!`;
        return writeResults;
    } else if (winner === 1) {
        showResults.textContent = `Win! ${playerInput} beats ${computerInput}!`;
        return writeResults;
    } else {
        showResults.textContent = `Draw! ${playerInput} ties with ${computerInput}!`;      
        return writeResults;
    }
}

function finalScore(playerPoints, computerPoints) {
    if (playerPoints > computerPoints) {
        roundHistory.textContent = `Player wins ${playerPoints} to ${computerPoints}!`;
    } else if (computerPoints > playerPoints) {
        roundHistory.textContent = `Computer wins ${computerPoints} to ${playerPoints}!`;
    }
}

function endGame() {
    finalScore(playerPoints, computerPoints);
    playerPoints = 0;
    computerPoints = 0;
    draw = 0;
    rounds = 1;

    playerPick.forEach(element => {
        element.removeEventListener('click', startGame);
    });

    const restart = document.createElement('button');
    restart.textContent = 'Restart game';
    restart.addEventListener('click', event => {
        for (let i = 0; i < 3; i++) {
            scoreBoard[i].textContent = 0;
        }
        begin();
        roundMeter.textContent = rounds;
    });
    roundHistory.appendChild(restart);
}



