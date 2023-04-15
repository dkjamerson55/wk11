// data pulled from html 

    const squares = Array.from(document.querySelectorAll('.square'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

// board construction showing empty array, the current player and whether the game is active

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameOn = true;

    // used to declare winner
    const playerXWin = 'PlayerX-Wins!';
    const playerOWin = ' PlayerO-Wins!';
    const Tie = 'Tie!';
    

    // array of arrays showing winning combinations of board grid
    const winningSquares = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [6,4,2]
    ];

    function gameResults() {
        let wonRound = false;

        //for loop to read through array of winning squares combinations arrays 
        for(let i = 0; i <= 7; i++) {
            const winCondition = winningSquares [i]; //array showing squares in which winning player symbols are held

            // each winning combination has 3 numbers that must be sequenced together in order to create winning result
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];

            // if loop that ensures there are no empty squares for that winning sequence 
            if (a === '' || b === '' || c === '') {
                continue;
            }
            //if the sequences have matching values then the round is won/ended.
            else if (a === b && b === c) {
                wonRound = true; // calls wonRound function to delcare winner.
                break; // used to exit loop
            }
        }

        // function to declare which player has winning square combination and ends game.
        if(wonRound){
            announce(currentPlayer === 'X' ? playerXWin : playerOWin);
            gameOn = false;
            return;
        }

        // if all of the board has been filled and there are no more empty strings then a a tie is announced.
        if(!board.includes(''))
        announce(Tie);
    }

    // eventListener for when square is clicked the index is saved in board array
    squares.forEach((square, index) =>{
        square.addEventListener('click', () => userTurn(square, index));
    });

    // user turn referencing other functions to see if game is going, what square is occupied by player and add location to array. Check end game results, and switch turns
    const userTurn = (square, index) => {
        if(playerMove(square) && gameOn) {
            square.innerHTML = currentPlayer;
            square.classList.add(`player$(currentPlayer)`);
            updateBoard(index);
            gameResults();
            changePlayer();
        }
    }

    //method used to change between player turns
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`); // removes classList of currentPlayer
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // switches player based off which one was previously shown
        playerDisplay.innerText = currentPlayer; // updated text showing current player
        playerDisplay.classList.add(`player${currentPlayer}`); //adds updated current player to classList
    }

    //method used to call previously defined playerXWin & playerOWin string values and announcer class from html to delcare winner or tie. 
    const announce = (type) => {
        switch(type){
            case playerXWin:
                announcer.innerHTML = 'Player <span class="display-player playerX">X</span> Wins'
                break;
            case playerOWin:
                announcer.innerHTML = 'Player <span class=""display-player playerX"">0</span> Wins'
                break;
            case Tie:
                announcer.innerText = 'Tie!';
        }
        announcer.classList.remove('hide'); // removes previously declared hide from html to display results.
    }

    // player moves method for determining wheter the square already has a value within the string.
    const playerMove = (square) => {
        if (square.innerText === 'X' || square.innerText === 'O'){
            return false;
        }

        return true;
    }

    // method used to make the index of the square value equal to currentplayer
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    // sets board to empty strings array and restarts game 
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        gameOn = true;
        announcer.classList.add('hide');

        //resets current player to X
        if (currentPlayer === 'O') {
            changePlayer();
        }

        //removes any previous player values from board strings
        squares.forEach(square => {
            square.innerText = '';
            square.classList.remove('playerX');
            square.classList.remove('playerO');
        });
    }

    resetButton.addEventListener('click', resetBoard); // eventListener for when reset button is clicked
