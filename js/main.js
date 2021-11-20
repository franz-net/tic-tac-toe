//Initialize players object

// THIS OBJECT FOR WHEN WE HAVE THE MENU OVERLAY!
const game = {
    player1: {
        name: '',
        sign: 'X',
    },
    player2: {
        name: '',
        sign: 'O',
    },
    currentgame: ['', '', '', '', '', '', '', ''],
}

const players = []
const matchResults = []
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
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
        /* console.log(event.target.dataset.index) */
        for (let player of players) {
            if (player.turn) {
                event.target.innerText = player.sign
                player.game.push(parseInt(event.target.dataset.index))
            }
        }
        checkState()
        switchTurns()
    }
})

function checkState() {
    /* console.log(JSON.stringify(players, null, 4)) */

    for (let combo of winningCombos) {
        /*  console.log(combo) */
        let firstCell = $boardCells[combo[0]].innerText
        let secondCell = $boardCells[combo[1]].innerText
        let thirdCell = $boardCells[combo[2]].innerText
        if (firstCell === '' || secondCell === '' || thirdCell === '') {
            console.log('no winner yet')
            continue
        } else if (firstCell === secondCell && firstCell === thirdCell) {
            console.log('YAY! you won!!')
            announceWinner(firstCell)
            return
        } else {
            console.log('Draw!')
        }
    }
}

function announceWinner(winningSign) {
    for (let player of players) {
        if (player.sign === winningSign) {
            console.log(`The Winner is: ${player.name}!!`)
            return
        }
    }
}

function switchTurns(currentPlayer) {
    for (let i = 0; i < $playerElements.length; i++) {
        if (players[i].turn) {
            $playerElements[i].style.removeProperty('color')
            $playerElements[i].style.removeProperty('font-size')
            players[i].turn = false
        } else {
            $playerElements[i].style.color = 'green'
            $playerElements[i].style.fontSize = 'xx-large'
            players[i].turn = true
        }
    }
}

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
        /* console.log(cell) */
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
        player['turn'] = false
        player['game'] = []
        players.push(player)
    }
    // Randomly choose who starts
    players[Math.floor(Math.random() * 2)].turn = true

    for (let i = 0; i < $playerElements.length; i++) {
        $playerElements[i].innerText = players[i].name
        $scoreBoards[i].textContent = players[i].score
        if (players[i].turn) {
            $playerElements[i].style.color = 'green'
        }
    }
    players[0].sign = 'X'
    players[1].sign = 'O'
}
