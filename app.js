const Game = () => {
    
    const playerFactory = (name, mark, turn) => {
        return {name, mark, turn}
    }
    const player1 = playerFactory(document.querySelector('#player-x').value, "X", true);
    const player2 = playerFactory(document.querySelector('#player-o').value, "0", false);

    const winCombos = [
        [0,1,2],
        [0,3,6],
        [3,4,5],
        [6,7,8],
        [1,4,7],
        [2,4,6],
        [2,5,8],
        [0,4,8]
    ];

    let board = [];
    let winner = null;
    let turns = 0;
    
    const updatePlayer = () => {
        const playerXDisplay = document.querySelector('#x');
        const playerODisplay = document.querySelector('#o');
        playerXDisplay.textContent = player1.name  + ' X';
        playerODisplay.textContent = player2.name + ' O';
    }

    const startGame = () => {
        const startGameBtn = document.querySelector('.startgamebtn');
        const firstScreen =document.querySelector('.startgame');
        const gameBoard = document.querySelector('.game');
        startGameBtn.addEventListener('click', () => {
            firstScreen.style.display = 'none';
            gameBoard.style.display = 'block';
            updatePlayer();
        })
    };
    
    const playGame = () => {
        board = [];
        const gameSquares = document.querySelectorAll(".gridbox");
        gameSquares.forEach(square => {
            square.classList.remove('checked');
            square.textContent = '';
            square.addEventListener("click", e => {
                if(player1.turn == true && Game.winner == null && e.target.textContent === '') {
                    board[e.target.id] = player1.mark;
                    square.textContent = player1.mark;
                    square.classList.add('checked');
                    player1.turn = false;
                    player2.turn = true;
                }
                else if (player2.turn == true && Game.winner == null && e.target.textContent=== '') {
                    board[e.target.id] = player2.mark;
                    square.textContent = player2.mark;
                    square.classList.add('checked');
                    player1.turn = true;
                    player2.turn = false;
                } else {
                    return
                };
                checkWinner();
            })
        })
    }

    const checkWinner = () => {
        turns++
        let xPlay = board.reduce((a, e, i) => (e=== player1.mark) ? a.concat(i) :a, []);
        let oPlay = board.reduce((a, e, i) => (e === player2.mark) ? a.concat(i): a, []);
        for(let [index, combo] of winCombos.entries()) {
            if (combo.every(elem => xPlay.indexOf(elem) > -1)) {
                Game.winner = player1.name + " wins!"
                winDisplay()
            } else if (combo.every(elem => oPlay.indexOf(elem) > -1)) {
                Game.winner = player2.name + " wins!"
                winDisplay()
            } else if (Game.winner == null && Game.winner == undefined && turns == 9) {
                Game.winner = "Tie"
                winDisplay()
            }
        }
    }
    const winDisplay = () => {
        const display = document.querySelector("#winner-name");
        const showWinner = document.querySelector(".winner");
        display.textContent = Game.winner
        showWinner.style.display = 'flex';
        console.log(turns);
    }
    
    const reset = () => {
        const showWinner = document.querySelector(".winner");
        showWinner.style.display = 'none'
        player1.turn = true;
        player2.turn = false;
        turns = 0;
        Game.winner = null;
        playGame()
    }

    const resetGame = () => {
        const resetButton = document.querySelectorAll('.reset');
        resetButton.forEach(button => {
            button.addEventListener('click', reset);
        })
    }
    

    
    const initiate = () => {
                startGame(); 
                resetGame();
                playGame();
               
            }
    
    initiate();
};
Game();