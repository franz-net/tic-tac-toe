# Tic-tac-toe

> Accessing the site: [www.franz-e.net/tic-tac-toe](www.franz-e.net/tic-tac-toe)

### Game Progression Design:

Considering a 2 player game (Maybe computer too if there is time):

    -   Starting a game:
        -   Player selection:
            -   Select players (pvp (or pvc or cvc if there is time))
            -   Input player names
            -   Randomly choose who starts the game
            -   Initialize scores objects (vars | arrays | objects)
    -   Starting a match:
        -   Initialize board
        -   Display player names
        -   Show game score for each player
    -   During a match:
        -   Indicate which user's turn it is
        -   Track moves to determine winner
        -   Win a match (a line is formed by matching 3 cells)
        -   End a match (at any time)
    -   Winning a match:
        -   Show the match is over
        -   Show who is the match winner
        -   Keep track of matches won per player
    -   Ending a match:
        -   Ask to continue or end game
        -   If continue:
            -   Save match result
            -   Clear board
            -   Start match
        -   If ending game:
            -   Count matches won
            -   Show who is overall winner
            -   Add to "highest score" (if there is enough time)
            -   Reset score board
            -   Clear board
