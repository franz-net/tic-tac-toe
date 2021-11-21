//Initialize players object

const game = {
    player_1: {
        name: '',
        isIA: false,
        sign: 'X',
        isTurn: false,
        won: 0,
        lost: 0,
        playerElement: 0,
    },
    player_2: {
        name: '',
        isIA: false,
        sign: 'O',
        isTurn: false,
        won: 0,
        lost: 0,
        playerElement: 1,
    },
    currentgame: [],
}

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
        for (let key in game) {
            if (key.includes('player')) {
                if (game[key].isTurn) {
                    event.target.innerText = game[key].sign
                    game.currentgame[parseInt(event.target.dataset.index)] = game[key].sign
                    console.log(game.currentgame)
                    setTurn()
                    break
                }
            }
        }
        checkState()
    }
})

function checkState() {
    // check if the game is draw
    if (game.currentgame.indexOf('') === -1) {
        alert('The game is a draw!')
        return
    } else {
        for (let combo of winningCombos) {
            let firstCell = game.currentgame[combo[0]]
            let secondCell = game.currentgame[combo[1]]
            let thirdCell = game.currentgame[combo[2]]
            if (firstCell != '' && firstCell === secondCell && firstCell === thirdCell) {
                alert('You have won!!')
            }
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

function welcomeUsers() {
    console.log('hello!')
    initializePlayers()
    initializeGame()
    /* console.log(JSON.stringify(players, null, 4)) */
    //TODO create splash screen
    //TODO create options overlay
}

/*
 * Initializes player names
 */
function initializePlayers() {
    game.player_1.name = 'Player 1'
    game.player_1.isIA = false
    game.player_2.name = 'Player 2'
    game.player_2.isIA = false
}

/*
 * Initializes game by clearing the board, setting the player names and calling
 * setTurn() to determine whos turn it is
 */
function initializeGame() {
    game.currentgame = ['', '', '', '', '', '', '', '']
    for (let cell of $boardCells) {
        /* console.log(cell) */
        cell.innerText = ''
    }
    $playerElements[0].innerText = game.player_1.name
    $playerElements[1].innerText = game.player_2.name
    setTurn()
}

/*
 * Manages player's turn and styling to indicate who's turn it is.
 * When the game is initializing, the turn is chosen randomly
 */
function setTurn() {
    if (game.player_1.isTurn === game.player_2.isTurn) {
        let randomPlayer = 'player_' + String(Math.floor(Math.random() * 2) + 1)
        game[randomPlayer].isTurn = true
        $playerElements[game[randomPlayer].playerElement].style.color = 'green'
        $playerElements[game[randomPlayer].playerElement].style.fontSize = 'xx-large'
    } else {
        for (let key in game) {
            if (key.includes('player')) {
                if (game[key].isTurn) {
                    $playerElements[game[key].playerElement].style.removeProperty('color')
                    $playerElements[game[key].playerElement].style.removeProperty('font-size')
                    game[key].isTurn = false
                } else {
                    $playerElements[game[key].playerElement].style.color = 'green'
                    $playerElements[game[key].playerElement].style.fontSize = 'xx-large'
                    game[key].isTurn = true
                }
            }
        }
    }
}
