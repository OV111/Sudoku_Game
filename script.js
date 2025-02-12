import { initializeGrid, grid } from "./generateSudoku.js";


initializeGrid();    

const startGame = document.querySelector(".startGame");
const time = document.getElementById("timeNumber");
const pauseBtn = document.getElementById("pause");
const playBtn = document.getElementById("play");

const mistakeElem = document.getElementById("mistake");
let mistakeCount = 0;                                   // not const because changable
let maxMistake = 3;
let selectedNumber = null;

const numbersBtn = document.querySelectorAll(".numbers");
const squareBtn = document.querySelectorAll(".square");

const score = document.getElementById("score");
let scoreCount = 0;

numbersBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
        selectedNumber = e.target.textContent;
    });
});

//! Note that i define grid numbers as a string !!!/////////////////////////////////////////////////


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


// //? create the gameover function adding the sound of game over !

let gameoversound = new Audio("mixkit-player-losing-or-failing-2042.wav");
gameoversound.preload = "auto";

let gameDisplay = document.getElementById("game-display");
let gameOverScreen = document.getElementById("game-over-screen");
let restartGameBtn = document.getElementById("restart");


function restartGame() {                           // Restart Game in case of loose
    gameOverScreen.style.display = "none";
    gameDisplay.style.display = "block";
    
    mistakeCount = 0;
    mistakeElem.textContent = `0/3`;

    squareBtn.forEach((cell) => {cell.textContent = ""});   // Clear all filled squares on the board
    initializeGrid();                                      // Reinitializing grid
}



let scoreText = document.getElementById("scoreText");
function gameOver() {
    gameDisplay.style.display = "none";
    gameOverScreen.style.display = "block";
    gameoversound.play();
    scoreText.textContent = `Your Score is ${scoreCount}`
    restartGameBtn.addEventListener("click",() => {
        restartGame();
    });
}

function mistakeCounter() {
    ++mistakeCount;
    mistakeElem.textContent = `${mistakeCount}/3`;
    if(mistakeCount > maxMistake) {      //! see one more time
        console.log("you lose");
        gameOver();
        // throw new Error("you lose"); // for debugging
    }
}



function scoreCounter() {    // think about the every time user earns score sound effect    AND ALSO ABOUT THE SOUND BUTTON EFFECT
    scoreCount += 100
    score.textContent = scoreCount;
}


function checkWin() {
    for(let r = 0; r < 9; ++r) {
        for(let c = 0; c < 9; ++c) {
            if(grid[r][c] === "") { return false;}
        }
    }
    return true;
}


let gameWinScreen = document.getElementById("game-win-screen");
let playAgainBtn = document.getElementById("playAgain"); 

function gameWin() {                                        // add the sound effects
    if(checkWin()) {    
        gameDisplay.style.display = "none";
        gameWinScreen.style.display = "block";

        playAgainBtn.addEventListener("click", () => {
            restartGame();
            scoreText.textContent = "0"                                                 // thing about score deletion 
            gameWinScreen.style.display = "none";
        })
        console.log("You Win! 🎉"); // for me
    }
}















 
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
