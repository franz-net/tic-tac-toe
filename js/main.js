//Initialize players object
const players = []
const matchResults = []
const winningCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]
const currentPlayer = []

const $playerElements = document.querySelectorAll('h2')
const $boardElement = document.getElementById('board')
const $scoreBoards = document.querySelectorAll('.score')
const $boardCells = document.querySelectorAll('.cell')

//Load Splash screen and ask user questions
window.onload = function () {
    welcomeUsers()
}

$boardElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('cell') && event.target.innerHTML === '') {
        console.log(event.target)
    }
})

function welcomeUsers() {
    console.log('hello!')
    initializePlayers()
    resetBoard()
    /* console.log(JSON.stringify(players, null, 4)) */
    //TODO create splash screen
    //TODO create options overlay
}

function resetBoard() {
    for (let cell of $boardCells) {
        console.log(cell)
        cell.innerText = ''
    }
}
/*
 * Initializes player names
 * Will ask for player names eventually
 */
function initializePlayers() {
    for (let i = 0; i < 2; i++) {
        let player = {}
        player['name'] = 'Player ' + String(i + 1)
        player['score'] = 0
        players.push(player)
    }
    // Randomly choose who starts
    currentPlayer[0] = players[Math.floor(Math.random() * 2)].name

    for (let i = 0; i < $playerElements.length; i++) {
        $playerElements[i].innerText = players[i].name
        $scoreBoards[i].textContent = players[i].score
        if (players[i].name === currentPlayer[0]) {
            $playerElements[i].style.color = 'green'
        }
    }
}
