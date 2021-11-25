<h1 align="center"> <a href="https://www.franz-e.net/tic-tac-toe">Tic-tac-toe</a> </h1>

## Table of contents

- [Table of contents](#table-of-contents)
- [About the Project](#about-the-project)
  - [Features:](#features)
  - [Technologies Used](#technologies-used)
- [Gameplay](#gameplay)
  - [Screenshots:](#screenshots)
  - [Demo Video](#demo-video)
- [Challenges and Lessons Learned](#challenges-and-lessons-learned)
- [Roadmap](#roadmap)
- [Contact](#contact)
- [Attributions:](#attributions)

---

## About the Project

First project from General Assembly Software Engineering Immersive Class, which goal is to showcase what I have learned so far in terms of JavaScript, HTML and CSS

### Features:

The game has the following features:

-   8-bit theme
-   Player name customization
-   PvP (Player vs Player)
-   PvC (Player vs Computer)
-   High Scores
-   Easter Eggs
    -   [The Net](https://www.youtube.com/watch?v=TFpKuq_tuIU&t=32s) "Praettorians" symbol on welcome screen - Shows high scores
    -   AI name "Joshua" from [Wwargames](https://www.youtube.com/watch?v=F7qOV8xonfY)

### Technologies Used

The game was developed entirely using:

-   HTML
-   JavaScript:
-   CSS

Some of the key features used:

-   Modals (HTML/JS)
-   DOM Manipulation (JS)
-   Local Storage (JS)
-   Transform (CSS)
-   Animations (CSS)

---

## Gameplay

-   The game begins with a splash screen that allows each player to enter its desired name or the default `Player 1` or `Player 2`

-   If playing in PvC mode, the 2nd player becomes `Joshua`.
    Once customizations are complete, the match begins.

-   The game follows the rules of the classic Tic Tac Toe where 2 players place a symbol representing each player in a 3 by 3 board.

-   Once a player reaches a 3 in a row, column or diagonal the match ends and a point is added to the user.

-   Once a match has concluded the users are presented with the opportunity to continue playing or end the game, which saves the score to the High Scores

### Screenshots:

TODO!

### Demo Video

TODO

---

## Challenges and Lessons Learned

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

Overall representation of the layout during a match without styling:
![Match Draft](img/match_draft.png)

## Roadmap

Currently the game only features a very dumb "computer" player whose objective is just to play a turn on the first available cell. The next iteration has to be more competitive.

## Contact

-   [GitHub](https://github.com/franz-net/)
-   [LinkedIn](https://www.linkedin.com/in/franzramirez/)

## Attributions:

-   Sound by: [LittleRobotSoundFactory](https://freesound.org/people/LittleRobotSoundFactory/)
