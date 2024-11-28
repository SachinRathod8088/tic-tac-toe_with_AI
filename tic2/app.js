const cells = document.querySelectorAll('[data-cell]');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGameButton');
const X_CLASS = 'x';
const O_CLASS = 'o';
let oTurn;

// Winning combinations for the game
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Start the game
startGame();

newGameButton.addEventListener('click', startGame);

function startGame() {
    oTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    hideResultScreen();
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        setTimeout(() => showResultScreen(`${currentClass.toUpperCase()} wins!`), 100);
    } else if (isDraw()) {
        setTimeout(() => showResultScreen("It's a draw!"), 100);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function showResultScreen(message) {
    resultMessage.textContent = message;
    resultScreen.classList.add('show');
}

function hideResultScreen() {
    resultScreen.classList.remove('show');
}