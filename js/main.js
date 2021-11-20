//Initialize players object
const players = {}
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

//Load Splash screen and ask user questions
window.onload = function () {
    welcomeUsers()
}

const 

function welcomeUsers() {
    console.log('hello!')
    //TODO create splash screen
    //TODO create options overlay
}

/*
 * Initializes player names
 * Will ask for player names eventually
 */
function initializePlayer() {
    for (let i = 0; i > 2; i++) {
        players['player' + String(i + 1)] = {}
        players['player' + String(i + 1)].score = 0
        players['player' + String(i + 1)].turn = false
    }
}
