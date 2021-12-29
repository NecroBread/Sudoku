const legitMatrix = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [6, 5, 4, 7, 8, 9, 3, 2, 1],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 1, 5, 3, 4, 7, 6, 9, 8],
    [3, 4, 6, 2, 9, 8, 1, 7, 5],
    [8, 9, 7, 5, 6, 1, 2, 3, 4],
    [4, 3, 1, 8, 7, 5, 9, 6, 2],
    [5, 6, 2, 9, 3, 4, 8, 1, 7],
    [9, 7, 8, 6, 1, 2, 5, 4, 3]
]

function checkSquares(inputMatrix) {
    let squareMatrix = [];
    for (let i = 0; i < 9; i += 3) { // rows of the table
        let squareRow = [];
        for (let row1 = 0; row1 < 9; row1++) { // rows of the square
            if ((row1 % 3 === 0 && row1 != 0)) {
                squareMatrix.push([...squareRow]);
                squareRow.length = 0;
            }
            for (let col1 = i; col1 < i+3; col1++) { //cols of the square
                squareRow.push(inputMatrix[row1][col1]); 
            }
            if ((row1 === 8)) {
                squareMatrix.push([...squareRow]);
                squareRow.length = 0;
            }
        }
    }
}

checkSquares(legitMatrix)