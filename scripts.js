const playerPick = document.querySelectorAll('.player-choice');
let playerPoints, computerPoints, draw = 0;

playerPick.forEach(element => {
    element.addEventListener('click', startGame);
});

function startGame(event) {
    const playerChoice = event.currentTarget.value;
    const computerPick = computerPlay();
    const round = playRound(playerChoice, computerPick);
    
}


function computerPlay() {
    const computerOptions = ['rock', 'paper', 'scissors'];
    const computerChoice = computerOptions[Math.round(Math.random() * (computerOptions.length - 1))];
    return computerChoice;
}


function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return 0;
    } else if ((playerSelection === 'rock' && computerSelection === 'paper') || 
    (playerSelection === 'scissors' && computerSelection === 'rock') || 
    (playerSelection === 'paper' && computerSelection === 'scissors') || 
    ((playerSelection !== 'rock') && (playerSelection !== 'paper') && (playerSelection !== 'scissors'))) {
        return -1;
    } else {
        return 1;
    }
}

function checkResults(winner, playerInput, computerInput) {
    if (winner === -1) {
        console.log(`Lost! ${computerInput} beats ${playerInput}!`);
    } else if (winner === 1) {
        console.log(`Win! ${playerInput} beats ${computerInput}!`);
    } else {
        console.log(`Tie! ${computerInput} ties with ${playerInput}!`)
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

/*
function game() {
    let playerPoints = 0;
    let computerPoints = 0;
    let draw = 0;

    for (i = 0; i < 5; i++) {
        const playerInput = playerPlay();
        const computerInput = computerPlay();
        const winner = playRound(playerInput, computerInput);

        checkResults(winner, playerInput, computerInput);
        if (winner === 1) {
            playerPoints++;
        } else if (winner === -1) {
            computerPoints++;
        } else {
            draw++;
        }
    }
    finalScore(playerPoints, computerPoints);
}
*/