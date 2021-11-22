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
const $scoreModal = document.querySelector('#modal-score')
const $scoreModalMessage = document.querySelector('#modal-score-content > p')
const $modalScoreButtons = document.querySelectorAll('.modal-score-button')

//Load Splash screen and ask user questions
window.onload = function () {
    welcomeUsers()
}

/*
 * Captures a click inside the game board and changes the player turn
 */
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

$scoreModal.addEventListener('click', (event) => {
    if (event.target.classList.contains('button')) {
        if (event.target.innerText === 'yes') {
            $scoreModal.style.display = 'none'
            restartMatch()
        } else if (event.target.innerText === 'no') {
            $scoreModal.style.display = 'none'
            welcomeUsers()
        }
    }
})

/*
 * Checks the current game for possible Winning conditions met
 * or Draw situation
 */
function checkState(player) {
    for (let combo of winningCombos) {
        let firstCell = game.currentgame[combo[0]]
        let secondCell = game.currentgame[combo[1]]
        let thirdCell = game.currentgame[combo[2]]
        if (firstCell != '' && firstCell === secondCell && firstCell === thirdCell) {
            announceResult(game[player].name)
            game[player].won += 1
            updateScoreBoards()
            return
        }
    }
    if (game.currentgame.indexOf('') === -1) {
        announceResult('draw')
        return
    }
}

/*
 * Displays a modal announcing the winner or if its a draw and the possibility of playing again
 */
function announceResult(matchResult) {
    if (matchResult === 'draw') {
        $scoreModalMessage.innerHTML = 'Game is a Draw! <br /> Would you like to play again?'
        $scoreModal.style.display = 'flex'
    } else {
        $scoreModalMessage.innerHTML = `${matchResult} wins! <br /> Would you like to play again?`
        $scoreModal.style.display = 'flex'
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
    $playerElements[0].innerText = game.player_1.name
    game.player_1.won = 0
    $playerElements[1].innerText = game.player_2.name
    game.player_2.won = 0
    restartMatch()
    setTurn()
}

/*
 * Resets the virtual board
 * Can be called by itself if users want to keep playing after a match has ended
 */
function restartMatch() {
    game.currentgame = ['', '', '', '', '', '', '', '', '']
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
