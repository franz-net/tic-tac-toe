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
        let currentPlayer = ''
        for (let key in game) {
            if (key.includes('player')) {
                if (game[key].isTurn) {
                    event.target.innerText = game[key].sign
                    game.currentgame[parseInt(event.target.dataset.index)] = game[key].sign
                    console.log(game.currentgame)
                    currentPlayer = key
                    setTurn()
                    break
                }
            }
        }
        checkState(currentPlayer)
    }
})

function checkState(player) {
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
                alert(`${game[player].name} has won!`)
                game[player].won += 1
                updateScoreBoards()
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
    restartMatch()
    $playerElements[0].innerText = game.player_1.name
    $playerElements[1].innerText = game.player_2.name
    setTurn()
}

/*
 * Resets the virtual board
 * Can be called by itself if users want to keep playing after a match has ended
 */
function restartMatch() {
    game.currentgame = ['', '', '', '', '', '', '', '']
    for (let cell of $boardCells) {
        cell.innerText = ''
    }
    updateScoreBoards()
}

/*
 * Updates the score in the boards
 */
function updateScoreBoards() {
    $scoreBoards[0].innerText = game.player_1.won
    $scoreBoards[1].innerText = game.player_2.won
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
