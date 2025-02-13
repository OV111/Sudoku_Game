import { initializeGrid, grid } from "./generateSudoku.js";

initializeGrid();    

// All DOM Elements
const startGame = document.querySelector(".startGame");
const mistakeElem = document.getElementById("mistake");
const score = document.getElementById("score");
const time = document.getElementById("timeNumber");
const pauseBtn = document.getElementById("pause");
const playBtn = document.getElementById("play");

const numbersBtn = document.querySelectorAll(".numbers");
const squareBtn = document.querySelectorAll(".square");

const gameDisplay = document.getElementById("game-display");
const gameWinScreen = document.getElementById("game-win-screen");
const gameOverScreen = document.getElementById("game-over-screen");

const scoreText = document.getElementById("scoreText");
const playAgainBtn = document.getElementById("playAgain"); 
const restartGameBtn = document.getElementById("restart");

// Game Variables (not const because changable)
let maxMistake = 3;
let selectedNumber = null;
let scoreCount = 0;
let mistakeCount = 0;                                   





// Audio Elements
let scoreSound = new Audio("Audio sounds/ScoreSuccess.wav");
scoreSound.preload = "auto";

let gameWinSound = new Audio("Audio sounds/GameWin.wav");
gameWinSound.preload = "auto";

let gameOverSound = new Audio("Audio sounds/mixkit-player-losing-or-failing-2042.wav");
gameOverSound.preload = "auto";










numbersBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
        selectedNumber = e.target.textContent;
    });
});

//! Note that i define grid numbers as a string 

squareBtn.forEach((cell,index) => {   
        cell.addEventListener("click", (e) => {             

        let row = Math.floor(index / 9);            // Defining rows,columns(can't import)
        let column = index % 9;
        let num = selectedNumber;
      
        if(e.target.textContent === "") {          // empty cells only 
            if(isValid(grid,row,column,num)) {    // checking Valid rows,columns,SubBox 
                e.target.textContent = num;      // for putting the selectedNumber
                grid[row][column] = num;        // updating grid!
                scoreCounter();            // Adding Score for each right move
                gameWin();                //if User wins
            } else {
                console.log("Invalid move: This number cannot be placed here!");//!This will be root for mistakecounter 
                mistakeCounter();
                //! game when is mistske
            }
        } else if(e.target.textContent !== "") {  // already defined numbers
            console.log("You can't change a predefined number!");
            return ;
        }    
        // e.target.textContent is the squares (input)number also what puzzle generate 
        // selectedNumber is the my selected number that i want to put in the square
        });
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


function checkWin() {
    for(let r = 0; r < 9; ++r) {
        for(let c = 0; c < 9; ++c) {
            if(grid[r][c] === "") { 
                return false;
            }
        }
    }
    return true;
}
function gameWin() {                                      
    if(checkWin()) {    
        gameDisplay.style.display = "none";
        gameWinScreen.style.display = "block";
        gameWinSound.play();

        playAgainBtn.addEventListener("click", () => {
            score.textContent = "0";                                          
            gameWinScreen.style.display = "none";
            restartGame(); 
        })
        console.log("You Win! 🎉"); // for me
    }
}
function restartGame() {                           
    gameOverScreen.style.display = "none";
    gameDisplay.style.display = "block";
    
    mistakeCount = 0;                       // Resetting mistake
    mistakeElem.textContent = `0/3`;
    scoreCount = 0;                         // Resetting score
    score.textContent = "0";

    squareBtn.forEach((cell) => {cell.textContent = ""});   // Clear all filled squares on the board
    initializeGrid();                                      // Reinitializing grid
}

function gameOver() {
    gameDisplay.style.display = "none";
    gameOverScreen.style.display = "block";
    gameOverSound.play();
    scoreText.textContent = `Your Score is ${scoreCount}`;

    restartGameBtn.addEventListener("click",() => {
        restartGame();
    });
}

function mistakeCounter() {
    ++mistakeCount;
    mistakeElem.textContent = `${mistakeCount}/3`;
    if(mistakeCount > maxMistake) { 
        gameOver();
        console.log("you lose");         // for me
        // throw new Error("you lose"); // for debugging
    }
}
function scoreCounter() {
    scoreCount += 100;
    score.textContent = scoreCount;
    scoreSound.play();
}





// Timer side///







 
let timer = 0                       // add the pause when user win
                                    // and reset the time when useer win || loss
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
    startTimer();
})

// /////////////////////////////////////////////////////////////////////////////////////////////////////





// alert("You Win")
