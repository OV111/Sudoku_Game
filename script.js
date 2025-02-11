import { initializeGrid, grid } from "./generateSudoku.js";

initializeGrid();    

const startGame = document.querySelector(".startGame");
const time = document.getElementById("timeNumber");
const pauseBtn = document.querySelector("#pause");
const playBtn = document.querySelector("#play");

const mistakeElem = document.getElementById("mistake");
let mistakeCount = 0;                                   // not const because changable
const square1number = document.getElementById("number");
    
const numbersBtn = document.querySelectorAll(".numbers");
let selectedNumber = null;
const squareBtn = document.querySelectorAll(".square");





numbersBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
        selectedNumber = e.target.textContent;
    })
});

//! Note that i define grid numbers as a string !!!/////////////////////////////////////////////////
let maxMistake = 3;

squareBtn.forEach((cell,index) => {   
        cell.addEventListener("click", (e) => {             

        let row = Math.floor(index / 9);            // Defining rows,columns(can't import)
        let column = index % 9;
        let num = selectedNumber;
      
        if(e.target.textContent === "") {          // empty cells only 
            if(isValid(grid,row,column,num)) {    // checking Valid rows,columns,SubBox 
                e.target.textContent = num;      // for putting the selectedNumber
                grid[row][column] = num;        // updating grid!
            } else {
                console.log("Invalid move: This number cannot be placed here!");//!This will be root for mistakecounter 
                if(mistakeCount == maxMistake) {console.log( "you lose")}
                mistakeCount++;
                mistakeElem.textContent = `${mistakeCount}/3`;
            }
        } else if(e.target.textContent !== "") {  // already defined numbers
            console.log("You can't change a predefined number!");
            return ;
        }    
        // e.target.textContent is the squares (input)number also what puzzle generate 
        // selectedNumber is the my selected number that i want to put in the square
        })
});

/*
  Checks if placing 'number' at grid[row][col] follows Sudoku rules,
  Ensures no duplicates in the row, column, or 3x3 box.
*/
function isValid(grid,row,col,number) {  
    for(let i = 0; i < 9; ++i) {        
        if(grid[row][i] == number) {
            return false;
        }                                   //! i need to fix the === comparsion(for perfection)
    }

    for(let j = 0; j < 9; ++j) {
        if(grid[j][col] == number) {
            return false;
        }
    }
    
    let BoxStartRow = Math.floor(row / 3) * 3;
    let BoxStartColumn = Math.floor(col / 3) * 3;
    for(let i = 0; i < 3; ++i) {
        for(let j = 0; j < 3; ++j) {
            if(grid[BoxStartRow + i][BoxStartColumn + j] == number) {
                return false;
            }
        }
    }
    return true;
}



// function mistakeCounter(grid) {
//        console.log(mistake);
// }



function scoreCounter() {

}


































 
let timer = 0
let seconds = 0;
let minutes = 0;
 
startGame.addEventListener("click",() => {
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline";
 
    clearInterval(timer)
    seconds = 0;
    minutes = 0;
    startTimer();
})
 
function startTimer() {
    timer = setInterval(()=> {
        seconds++
        if(seconds && seconds == 60) {
            minutes++;
            seconds = 0;
        }
        time.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; 
    },1000)
}



let stopTime = {minutes:0, seconds:0,}                 // stopTime object!

pauseBtn.addEventListener("click", () => {
    pauseBtn.style.display = "none"
    playBtn.style.display = "inline"
    const timeParts = time.textContent.split(":");    // seperating the time(00:00)
     
        stopTime = {                                      // storing time's
            minutes: parseFloat(timeParts[0]),
            seconds: parseFloat(timeParts[1]),
        };

    clearInterval(timer)      
})

playBtn.addEventListener("click",() => {
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline";

    minutes =  stopTime.minutes;
    seconds = stopTime.seconds;
    startTimer()
})

// /////////////////////////////////////////////////////////////////////////////////////////////////////





// alert("You Win")
