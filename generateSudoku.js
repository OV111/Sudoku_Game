export function initializeGrid() {
   let grid = [];
   for(let i = 0;i < 9; ++i) {
        let row = Array(9).fill(0);
        grid.push(row);
    }
    fillGrid(grid);
    
}
function fillGrid(grid) {
    let squares = document.querySelectorAll(".square p");
    for(let r = 0; r < 9; ++r) {
        for(let c = 0; c < 9; ++c) {
            // let index = r * 9 + c;
            squares[r * 9 + c].textContent = grid[r][c];
        }
    }
    // console.log(grid)
    generatePuzzle(grid)
}

initializeGrid()

function generatePuzzle(grid) {   // main function (generating valid puzzle)
    backtrack(grid)

}


function backtrack(grid) {   
        for(let r = 0; r < 9; ++r) {
            for(let c = 0; c < 9; ++c) {
                if(grid[r][c] == 0) {
                    
                    for(let num = 1; num <= 9; ++num) {
                        if(isValid(grid,r,c,num)) {
                            grid[r][c] = num;
                            if(backtrack(grid)) {
                                return true;
                            } else {
                                grid[r][c] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
}

function isValid(grid,row,col,num) {      // Validation of numbers
    for(let index = 0; index < 9; ++index) {
        if(grid[row][index] === num) {
            return false;
        }
    }
    for(let index = 0; index < 9; ++index) {
        if(grid[index][col] === num) {
            return false;
        }
    }

    let boxRow = row - row % 3;
    let boxCol = col - col % 3;
    
    for(let i = 0; i < 3; ++i) {
        for(let j = 0; j < 3; ++j) {
            if(grid[boxRow + i][boxCol + j] === num) {
                return false;
            }
        }
    }
    return true;


    // Box3x3
    
}




 







// Function to generate a valid Sudoku puzzle
// function generatePuzzle(grid) {
//     // Step 1: Fill the grid using backtracking
//     backtrack(grid);
    
//     // Step 2: Randomly remove numbers to create a puzzle
//     let cellsToRemove = 40;  // You can adjust this for puzzle difficulty
//     while (cellsToRemove > 0) {
//         let row = Math.floor(Math.random() * 9);
//         let col = Math.floor(Math.random() * 9);
        
//         // Remove the number if it's not already 0
//         if (grid[row][col] !== 0) {
//             grid[row][col] = 0;
//             cellsToRemove--;
//         }
//     }
// }

// // Backtracking function to fill the grid
// function backtrack(grid) {
//     for (let r = 0; r < 9; r++) {
//         for (let c = 0; c < 9; c++) {
//             if (grid[r][c] === 0) {  // Find an empty cell
//                 // Try numbers 1-9
//                 for (let num = 1; num <= 9; num++) {
//                     if (isValid(grid, r, c, num)) {
//                         grid[r][c] = num;  // Place the number
//                         if (backtrack(grid)) {  // Recursively try to fill the next cells
//                             return true;  // If successful, return true
//                         }
//                         grid[r][c] = 0;  // Backtrack if no valid number found
//                     }
//                 }
//                 return false;  // No valid number can be placed, backtrack
//             }
//         }
//     }
//     return true;  // All cells are filled correctly
// }

// // Function to check if placing a number is valid
// function isValid(grid, row, col, num) {
//     // Check the row for duplicates
//     for (let i = 0; i < 9; i++) {
//         if (grid[row][i] === num) {
//             return false;
//         }
//     }
    
//     // Check the column for duplicates
//     for (let i = 0; i < 9; i++) {
//         if (grid[i][col] === num) {
//             return false;
//         }
//     }
    
//     // Check the 3x3 subgrid for duplicates
//     let boxRowStart = Math.floor(row / 3) * 3;
//     let boxColStart = Math.floor(col / 3) * 3;
    
//     for (let r = boxRowStart; r < boxRowStart + 3; r++) {
//         for (let c = boxColStart; c < boxColStart + 3; c++) {
//             if (grid[r][c] === num) {
//                 return false;
//             }
//         }
//     }
    
//     return true;  // The number is valid
// }
