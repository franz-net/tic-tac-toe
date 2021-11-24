//Initialize players object

const game = {
    player_1: {
        name: '',
        isAI: false,
        sign: 'X',
        isTurn: false,
        won: 0,
        lost: 0,
        playerElement: 0,
    },
    player_2: {
        name: '',
        isAI: false,
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

let drawSound = new Audio('./sounds/drawSound.wav')
let winSound = new Audio('./sounds/winnerSound.wav')
let resetGameSound = new Audio('./sounds/quit.wav')
let turnSound = new Audio('./sounds/turn.mp3')

const $welcomeModal = document.querySelector('#modal-welcome')
const $p1NameInput = document.querySelector('#p1-name-input')
const $p2NameInput = document.querySelector('#p2-name-input')
const $p2aiCheck = document.querySelector('#p2ai')
const $containerElement = document.querySelector('#container')
const $playerElements = document.querySelectorAll('.side > h2')
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
 * Captures clicks inside the welcome modal
 */
$welcomeModal.addEventListener('click', (event) => {
    if (event.target.classList.contains('button')) {
        if (event.target.innerText === 'continue') {
            initializePlayers()
            initializeGame()
            $containerElement.style.removeProperty('display')
            $welcomeModal.style.display = 'none'
        }
    }
})

/*
 * Capture the "AI" selection
 */
$p2aiCheck.addEventListener('click', (event) => {
    if (event.target.checked) {
        $p2NameInput.value = 'JOSHUA'
        $p2NameInput.style.background = 'black'
        $p2NameInput.readOnly = true
    } else if (!event.target.checked) {
        $p2NameInput.value = ''
        $p2NameInput.style.removeProperty('background')
        $p2NameInput.readOnly = false
    }
})

/*
 * Captures a click inside the game board and changes the player turn
 */
$boardElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('cell') && event.target.innerHTML === '') {
        let currentPlayer = ''
        for (let key in game) {
            if (key.includes('player')) {
                turnSound.play()
                if (game[key].isTurn) {
                    event.target.innerText = game[key].sign
                    game.currentgame[parseInt(event.target.dataset.index)] = game[key].sign
                    currentPlayer = key
                    if (!checkState(currentPlayer)) {
                        setTurn()
                        break
                    } else {
                        return
                    }
                }
            }
        }
        //checkState(currentPlayer)
    }
})

/*
 * Captures the response from the modal after a match has ended in draw or win
 */
$scoreModal.addEventListener('click', (event) => {
    if (event.target.classList.contains('button')) {
        if (event.target.innerText === 'yes') {
            $scoreModal.style.display = 'none'
            restartMatch()
        } else if (event.target.innerText === 'no') {
            $scoreModal.style.display = 'none'
            resetGameSound.play()
            welcomeUsers()
        }
    }
})

/*
 * Displays Splash screen for users to sign up
 */
function welcomeUsers() {
    $containerElement.style.display = 'none'
    $welcomeModal.style.display = 'flex'
}

/*
 * Initializes player names
 * and setting up the AI
 */
function initializePlayers() {
    if ($p1NameInput.value !== '') {
        game.player_1.name = $p1NameInput.value
    } else {
        game.player_1.name = 'Player 1'
    }
    if ($p2NameInput.value !== '') {
        game.player_2.name = $p2NameInput.value
    } else {
        game.player_2.name = 'Player 2'
    }

    if ($p2aiCheck.checked) {
        game.player_2.isAI = true
    }

    $p1NameInput.value = ''
    $p2NameInput.value = ''
    $p2aiCheck.checked = false
    $p2NameInput.style.removeProperty('background')
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
    let playerInTurn = ''
    if (game.player_1.isTurn === game.player_2.isTurn) {
        let randomPlayer = 'player_' + String(Math.floor(Math.random() * 2) + 1)
        game[randomPlayer].isTurn = true
        $playerElements[game[randomPlayer].playerElement].style.color = '#6e83eb'
        $playerElements[game[randomPlayer].playerElement].style.textShadow = '2px 2px #475494'
    } else {
        for (let key in game) {
            if (key.includes('player')) {
                if (game[key].isTurn) {
                    $playerElements[game[key].playerElement].style.removeProperty('color')
                    $playerElements[game[key].playerElement].style.removeProperty('text-shadow')
                    game[key].isTurn = false
                } else {
                    $playerElements[game[key].playerElement].style.color = '#6e83eb'
                    $playerElements[game[key].playerElement].style.textShadow = '1px 1px #475494'
                    game[key].isTurn = true
                    playerInTurn = key
                    if (game[key].isAI) {
                        aiPlayTurn(key)
                    }
                }
            }
        }
    }
}
/*
 * Basic "computer player"
 */
function aiPlayTurn(player) {
    let boardIndex = game.currentgame.indexOf('')
    $boardCells[boardIndex].innerText = game[player].sign
    game.currentgame[boardIndex] = game[player].sign
    if (!checkState(player)) {
        setTurn()
    } else {
        return
    }
}

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
            setTimeout(announceResult(game[player].name), 30000)
            game[player].won += 1
            updateScoreBoards()
            return true
        }
    }
    if (game.currentgame.indexOf('') === -1) {
        announceResult('draw')
        return true
    }
    return false
}

/*
 * Displays a modal announcing the winner or if its a draw and the possibility of playing again
 */
function announceResult(matchResult) {
    if (matchResult === 'draw') {
        drawSound.play()
        $scoreModalMessage.innerHTML = 'Game is a Draw! <br /> Would you like to play again?'
        $scoreModal.style.display = 'flex'
    } else {
        winSound.play()
        $scoreModalMessage.innerHTML = `${matchResult} wins! <br /> Would you like to play again?`
        $scoreModal.style.display = 'flex'
    }
}
