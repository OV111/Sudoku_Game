export function initializeGrid() {
    let grid = [];
    for(let i = 0;i < 9; ++i) {
        let row = Array(9).fill(0);  // null
        grid.push(row);
    }
    generatePuzzle(grid);    // Generating puzzle first 
    fillGrid(grid);         // Then filling it! 
}
function fillGrid(grid) {
    let squares = document.querySelectorAll(".square p");
    for(let r = 0; r < 9; ++r) {
        for(let c = 0; c < 9; ++c) {
            let index =  r * 9 + c;
            squares[r * 9 + c].textContent = grid[r][c];
        }
    }
}


function generatePuzzle(grid) {   // main function (generating valid puzzle)
    backtrack(grid);

}

function removeNumbers(grid) {

}

function backtrack(grid) {   
    for(let r = 0; r < 9; ++r) {      //Looping through row & columns
        for(let c = 0; c < 9; ++c) {
            if(grid[r][c] === 0) {                    // checking if cell is free(=== 0)
                for(let num = 1; num <= 9; ++num) {  // Looping for trying putting numbers  
                    if(isValid(grid,r,c,num)) {     // if Valid number put the number
                        grid[r][c] = num;
                        if(backtrack(grid)) { return true; }  //// !Recurive call
                        grid[r][c] = 0;
                    }
                }
                return false;
            } 
        }
   }
   return true;
}

function isValid(grid,row,col,num) {      // Validation of numbers (cells)
    for(let i = 0; i < 9; ++i) {
        if(grid[row][i] === num) {   // checking if number of cell(in row),
            return false;           // isn't repeating by horizontal
        }
    }
    for(let i = 0; i < 9; ++i) {
        if(grid[i][col] === num) {  // checking if number of cell(in column) 
            return false;          // isn't repeating by vertically
        }
    }

    // Box 3x3 Sub-Grid
    let BoxStartRow = Math.floor(row / 3) * 3;  // Defining the start of box
    let BoxStartColumn = Math.floor(col / 3) * 3;
    for(let i = 0; i < 3; ++i){         // checking for specific box all cells
        for(let j = 0; j < 3; ++j) {
            if(grid[BoxStartRow + i][BoxStartColumn + j] === num) {  //!Chechking Each Cell
                return false;
            }
        }
    }
    return true;
}




 








// [0,0] [0,1] [0,2] | [0,3] [0,4] [0,5] | [0,6] [0,7] [0,8]
// [1,0] [1,1] [1,2] | [1,3] [1,4] [1,5] | [1,6] [1,7] [1,8]
// [2,0] [2,1] [2,2] | [2,3] [2,4] [2,5] | [2,6] [2,7] [2,8]
// -------------------|-------------------|-------------------
// [3,0] [3,1] [3,2] | [3,3] [3,4] [3,5] | [3,6] [3,7] [3,8]
// [4,0] [4,1] [4,2] | [4,3] [4,4] [4,5] | [4,6] [4,7] [4,8]
// [5,0] [5,1] [5,2] | [5,3] [5,4] [5,5] | [5,6] [5,7] [5,8]
// -------------------|-------------------|-------------------
// [6,0] [6,1] [6,2] | [6,3] [6,4] [6,5] | [6,6] [6,7] [6,8]
// [7,0] [7,1] [7,2] | [7,3] [7,4] [7,5] | [7,6] [7,7] [7,8]
// [8,0] [8,1] [8,2] | [8,3] [8,4] [8,5] | [8,6] [8,7] [8,8]
