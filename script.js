document.addEventListener("DOMContentLoaded", () => {
    const columns = 7;
    const rows = 6;
    let board = Array.from({ length: rows }, () => Array(columns).fill(null));
    let currentPlayer = 'red';
    let player1Name = '';
    let player2Name = '';
    let gameActive = false;

    const gameBoard = document.getElementById('game-board');
    const currentTurnDisplay = document.getElementById('current-turn');
    const startButton = document.getElementById('start-button');
    const resetButton = document.getElementById('reset-button');
    const player1Input = document.getElementById('player1-name');
    const player2Input = document.getElementById('player2-name');

    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);

    function startGame() {
        player1Name = player1Input.value || 'Player 1';
        player2Name = player2Input.value || 'Player 2';
        gameActive = true;
        updateCurrentTurnDisplay();
        createBoard();
    }

    function updateCurrentTurnDisplay() {
        currentTurnDisplay.textContent = `${currentPlayer === 'red' ? player1Name : player2Name}'s turn (${currentPlayer === 'red' ? 'Red' : 'Yellow'})`;
    }

    function createBoard() {
        gameBoard.innerHTML = '';
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', handleCellClick);
                gameBoard.appendChild(cell);
            }
        }
    }

    function handleCellClick(event) {
        if (!gameActive) return;

        const col = event.target.dataset.col;
        const emptyCell = findEmptyCellInColumn(col);
        if (emptyCell) {
            emptyCell.classList.add(currentPlayer);
            board[emptyCell.dataset.row][col] = currentPlayer;
            if (checkWin()) {
                displayWinner();
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                updateCurrentTurnDisplay();
            }
        }
    }

    function findEmptyCellInColumn(col) {
        for (let row = rows - 1; row >= 0; row--) {
            if (!board[row][col]) {
                return document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            }
        }
        return null;
    }

    function checkWin() {
        return checkHorizontal() || checkVertical() || checkDiagonal();
    }

    function checkHorizontal() {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns - 3; col++) {
                if (board[row][col] && board[row][col] === board[row][col + 1] &&
                    board[row][col] === board[row][col + 2] &&
                    board[row][col] === board[row][col + 3]) {
                    return true;
                }
            }
        }
        return false;
    }

    function checkVertical() {
        for (let col = 0; col < columns; col++) {
            for (let row = 0; row < rows - 3; row++) {
                if (board[row][col] && board[row][col] === board[row + 1][col] &&
                    board[row][col] === board[row + 2][col] &&
                    board[row][col] === board[row + 3][col]) {
                    return true;
                }
            }
        }
        return false;
    }

    function checkDiagonal() {
        for (let row = 0; row < rows - 3; row++) {
            for (let col = 0; col < columns - 3; col++) {
                if (board[row][col] && board[row][col] === board[row + 1][col + 1] &&
                    board[row][col] === board[row + 2][col + 2] &&
                    board[row][col] === board[row + 3][col + 3]) {
                    return true;
                }
            }
            for (let col = 3; col < columns; col++) {
                if (board[row][col] && board[row][col] === board[row + 1][col - 1] &&
                    board[row][col] === board[row + 2][col - 2] &&
                    board[row][col] === board[row + 3][col - 3]) {
                    return true;
                }
            }
        }
        return false;
    }

    function displayWinner() {
        const winnerName = currentPlayer === 'red' ? player1Name : player2Name;
        currentTurnDisplay.innerHTML = `<span class="congratulations">Congratulations ${winnerName}! You win!</span>`;
        triggerSparkleEffect();
    }

    function triggerSparkleEffect() {
        const winnerCells = document.querySelectorAll(`.cell.${currentPlayer}`);
        winnerCells.forEach(cell => {
            cell.style.animation = 'sparkle 1s infinite';
        });
    }

    function resetGame() {
        currentPlayer = 'red';
        board = Array.from({ length: rows }, () => Array(columns).fill(null));
        gameActive = true;
        player1Name = player1Input.value || 'Player 1';
        player2Name = player2Input.value || 'Player 2';
        updateCurrentTurnDisplay();
        createBoard();
    }
});
