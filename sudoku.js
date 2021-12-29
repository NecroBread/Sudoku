// library with sudoku game setups based on difficulty
const difficultyLibrary = {
    'easy-dif': {
        1: 7,
        3: 2,
        5: 6,
        6: 3,
        7: 4,
        11: 9,
        12: 5,
        14: 1,
        15: 7,
        18: 2,
        19: 5,
        21: 7,
        22: 4,
        24: 8,
        25: 9,
        28: 6,
        30: 1,
        36: 5,
        41: 4,
        42: 1,
        43: 6,
        44: 2,
        45: 1,
        46: 3,
        48: 8,
        51: 4,
        54: 4,
        55: 2,
        58: 5,
        59: 8,
        61: 1,
        62: 3,
        64: 1,
        65: 5,
        66: 4,
        72: 6,
        73: 8,
        79: 5,

    },
    'medium-dif': {
        1: 1,
        3: 4,
        5: 7,
        11: 7,
        13: 1,
        17: 2,
        20: 4,
        24: 9,
        27: 4,
        28: 7,
        31: 3,
        32: 2,
        33: 8,
        36: 1,
        38: 2,
        39: 5,
        40: 9,
        41: 8,
        42: 3,
        45: 5,
        46: 3,
        49: 6,
        53: 9,
        54: 3,
        61: 9,
        69: 5,
        71: 1,
        72: 8,
        75: 2,
        77: 6,

    },
    'hard-dif': {
        11: 2,
        13: 7,
        16: 9,
        20: 4,
        23: 6,
        26: 1,
        27: 5,
        28: 3,
        36: 4,
        39: 3,
        43: 1,
        47: 7,
        49: 4,
        52: 8,
        55: 2,
        56: 5,
        57: 7,
        62: 6,
        67: 3,
        71: 5,
        74: 1,
        76: 9,
        80: 2

    },
}
// New Game Button events
const newGameBtnEl = document.getElementById('new-game-btn');
newGameBtnEl.addEventListener('click', () => {
    const inputCells = document.querySelectorAll('.sudoku-number');
    // reset all cell inputs
    inputCells.forEach(x => {
        x.value = ''
        x.disabled = false;
    });

    const selectedDifficulty = document.querySelector('.form-check input[type="radio"]:checked').id;

    // execute function for new game
    for (let key of Object.keys(difficultyLibrary[selectedDifficulty])) {
        inputCells[key].value = difficultyLibrary[selectedDifficulty][key];
        inputCells[key].disabled = true;
    }
})

// keep hint numbers disabled in the input field after refresh
window.onload = () => {
    const inputCells = document.querySelectorAll('.sudoku-number');
    const selectedDifficulty = document.querySelector('.form-check input[type="radio"]:checked').id;
    for (let key of Object.keys(difficultyLibrary[selectedDifficulty])) {
        inputCells[key].disabled = true;
    }
}

// the whole table
const sudokuTable = document.querySelector('#sudoku-table');
// modal element congratulating the player that won the game
let myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {});

// regex for checking the player inputs - only numbers 1 to 9 
const numPattern = /^[1-9]{1}$/
// check input and clear if not a number from 1 to 9
sudokuTable.addEventListener('change', (e) => {
    // use delegation for event and check if input cell is the target
    const current = e.target;
    if (current.className === 'sudoku-number') {
        if (numPattern.test(current.value) === false) {
            current.value = '';
        }
    }
})

// click event on input cells - selects the full input in the cell on click
sudokuTable.addEventListener('click', (e) => {
    // use delegation for event and check if input cell is the target
    const current = e.target;
    if (current.className === 'sudoku-number') {
        getFocus(current)
        function getFocus(targ) {
            targ.select();
        }
    }
})

// add event that checks the sudoku 
sudokuTable.addEventListener('change', (e) => {
    // make matrix of sudoku numbers
    const sudokuRowsEl = document.querySelectorAll('.sudokuSqrs tr');
    const sudokuMatrixInput = [];
    for (let sudokuRowEl of sudokuRowsEl) {
        let currentRow = Array.from(sudokuRowEl.querySelectorAll('.sudoku-number')).map(x => Number(x.value));
        sudokuMatrixInput.push(currentRow);
    }
    const current = e.target;
    if (current.className === 'sudoku-number') {
        // call function to check if player has won
        if (checkCells(sudokuMatrixInput) === true) {
            console.log('win');
            Array.from(document.querySelectorAll('.sudoku-number')).forEach(x => x.disabled = true)
            myModal.show();
        }
    }
})

function checkCells(matrix) {
    const winCond = '123456789';
    // reorganize columns in arrays and put them in matrix
    function checkColumns(inputMatrix) {
        let columns = [];
        for (let rw = 0; rw < 9; rw++) {
            const newRow = [];
            for (let col = 0; col < 9; col++) {
                newRow.push(inputMatrix[col][rw])
            }
            columns.push(newRow);
        }
        for (let inputCol of columns) {
            if (inputCol.sort((a, b) => a - b).join('') !== winCond) {
                return false;
            }
        }
        return true;
    }

    // row checker
    function checkRows(inputMatrix) {
        for (let inputRow of inputMatrix) {
            if (inputRow.sort((a, b) => a - b).join('') !== winCond) {
                return false;
            }
        }
        return true;
    }

    // square checker
    function checkSquares(inputMatrix) {
        let squareMatrix = [];
        for (let i = 0; i < 9; i += 3) { // rows of the table
            let squareRow = [];
            for (let row1 = 0; row1 < 9; row1++) { // rows of the square
                if ((row1 % 3 === 0 && row1 != 0)) {
                    squareMatrix.push([...squareRow]);
                    squareRow.length = 0;
                }
                for (let col1 = i; col1 < i + 3; col1++) { //cols of the square
                    squareRow.push(inputMatrix[row1][col1]);
                }
                if ((row1 === 8)) {
                    squareMatrix.push([...squareRow]);
                    squareRow.length = 0;
                }
            }
        }
        for (let inputRow of squareMatrix) {
            if (inputRow.sort((a, b) => a - b).join('') !== winCond) {
                return false;
            }
        }
        return true;
    }
    return checkSquares(matrix) && checkColumns(matrix) && checkRows(matrix); // first call with rows, then with columns, and finally with squares
}

// legit input
// const legitMatrix = [
//     [1, 2, 3, 4, 5, 6, 7, 8, 9],
//     [6, 5, 4, 7, 8, 9, 3, 2, 1],
//     [7, 8, 9, 1, 2, 3, 4, 5, 6],
//     [2, 1, 5, 3, 4, 7, 6, 9, 8],
//     [3, 4, 6, 2, 9, 8, 1, 7, 5],
//     [8, 9, 7, 5, 6, 1, 2, 3, 4],
//     [4, 3, 1, 8, 7, 5, 9, 6, 2],
//     [5, 6, 2, 9, 3, 4, 8, 1, 7],
//     [9, 7, 8, 6, 1, 2, 5, 4, 3]
// ]