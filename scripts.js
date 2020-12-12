const playerPick = document.querySelectorAll('.player-choice');
const scoreBoard = document.querySelectorAll('.scores li p');
const roundHistory = document.querySelector('#round-history');

let playerPoints = 0;
let computerPoints = 0;
let draw = 0;

playerPick.forEach(element => {
    element.addEventListener('click', startGame);
});

function startGame(event) {
    const playerChoice = event.currentTarget.value;
    const computerPick = computerPlay();
    const round = playRound(playerChoice, computerPick);
    
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

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        draw++;
        scoreBoard[1].innerText = draw;
        return 0;
    } else if ((playerSelection === 'rock' && computerSelection === 'paper') || 
    (playerSelection === 'scissors' && computerSelection === 'rock') || 
    (playerSelection === 'paper' && computerSelection === 'scissors') || 
    ((playerSelection !== 'rock') && (playerSelection !== 'paper') && (playerSelection !== 'scissors'))) {
        computerPoints++;
        scoreBoard[2].innerText = computerPoints;
        return -1;
    } else {
        playerPoints++;
        scoreBoard[0].innerText = playerPoints;
        return 1;
    }
}

function checkResults(winner, playerInput, computerInput) {
    const showResults = document.createElement('p');
    let writeResults = roundHistory.prepend(showResults);
    
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
        console.log(`Player wins ${playerPoints} to ${computerPoints}`);
    } else if (computerPoints > playerPoints) {
        console.log(`Computer wins ${computerPoints} to ${playerPoints}`);
    } else {
        console.log(`Tie! ${computerPoints} to ${playerPoints}`);
    }
}

function endGame() {
    playerPick.forEach(element => {
        element.removeEventListener('click', startGame);
    })
    alert('Game over');
}
