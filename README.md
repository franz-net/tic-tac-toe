<h1 align="center"> <a href="https://www.franz-e.net/tic-tac-toe">Tic-tac-toe</a> </h1>

## Technologies Used

-   HTML
-   JavaScript
-   CSS

## Features:

-   Play against another player
-   Play against the computer
-   Easter Eggs
    -   The net "Praettorians" symbol on welcome screen - Shows high scores
    -   AI name "Joshua" from "war games"

## Screenshots:

TODO!

## Game Progression

Considering a 2 player game:

    -   Starting a game:
        -   Player selection:
            -   Select players (pvp or pvc)
            -   Input player names, by default the names are:
                -   Player 1 or Player 2 or Joshua for AI **
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
        -   End a match (after a Draw or a Win)
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
    -   Ending a game:
        -   Count matches won
        -   Show who is overall winner
        -   Add to "highest score"
        -   Reset score board
        -   Clear board

## Match Draft

Overall representation of the layout during a match without styling:
![Match Draft](img/match_draft.png)

## Currently working on:

-   Styling:
    -   Sound FX

## Attributions:

-   Sound by: [LittleRobotSoundFactory](https://freesound.org/people/LittleRobotSoundFactory/)
