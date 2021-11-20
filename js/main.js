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

const $playerElements = document.querySelectorAll('h2')

//Load Splash screen and ask user questions
window.onload = function () {
    welcomeUsers()
}

function welcomeUsers() {
    console.log('hello!')
    initializePlayers()
    console.log(JSON.stringify(players, null, 4))
    //TODO create splash screen
    //TODO create options overlay
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
        players.push(player)
    }
    // Randomly choose who starts
    players[Math.floor(Math.random() * 2)].turn = true

    for (let i = 0; i < $playerElements.length; i++) {
        $playerElements[i].innerText = players[i].name
        if (players[i].turn) {
            $playerElements[i].style.color = 'green'
        }
    }
}
