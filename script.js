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
let selectedNumber = null;
let maxMistake = 3;
let mistakeCount = 0;                                   
let scoreCount = 0;

// Audio Elements
const scoreSound = new Audio("Audio sounds/ScoreSuccess.wav");
scoreSound.preload = "auto";

const gameWinSound = new Audio("Audio sounds/GameWin.wav");
gameWinSound.preload = "auto";

const gameOverSound = new Audio("Audio sounds/GameLose.wav");
gameOverSound.preload = "auto";


let timeStarted = false;

numbersBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
        selectedNumber = e.target.textContent;
        if(!timeStarted) {
            startTimer();
            timeStarted  = true;
        }
    });
});

squareBtn.forEach((cell,index) => {   
    cell.addEventListener("click", (e) => {             
        let row = Math.floor(index / 9);            // Defining rows,columns(can't import)
        let column = index % 9;
        let num = selectedNumber;

        if(e.target.textContent === "" && selectedNumber !== null) {          // Empty cells only 
            if(isValid(grid,row,column,num)) {    // Checking Valid rows,columns,SubBox 
                console.log(num)
                e.target.textContent = num;      // For putting the selectedNumber
                grid[row][column] = num;        // Updating grid(for incomer check)!
                scoreCounter();                           // Adding Score for each right move
                gameWin();                               // In case the User wins
            } else {
                console.log("Invalid move: This number cannot be placed here!");
                mistakeCounter();
            }
        } else if(e.target.textContent !== "") {      // Already defined numbers
            console.log("You can't change a predefined number!");
            return ;
        }    
    });
    // e.target.textContent is the squares (input)number also what puzzle generate 
    // selectedNumber is the my selected number that i want to put in the square
});

/*
  Checks if placing 'number' at grid[row][col] follows Sudoku rules,
  Ensures no duplicates in the row, column, or 3x3 box.
*/
function isValid(grid,row,col,number) {  
    for(let i = 0; i < 9; ++i) {        
        if(grid[row][i] == number) {
            return false;
        }                                   //! I need to fix the === comparsion(for perfection)
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

function scoreCounter() {
    scoreCount += 100;
    score.textContent = scoreCount;
    scoreSound.play();
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
let timeNumber = document.getElementById("timeNumber");
let scoreTime = document.getElementById("scoreTime");
function gameWin() {                                      
    if(checkWin()) {    
        gameDisplay.style.display = "none";
        gameWinScreen.style.display = "block";
        gameWinSound.play();
        scoreTime.textContent = `You completed game in ${timeNumber.textContent}`  
        clearInterval(timer);

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
    
    selectedNumber = null;
    
    mistakeCount = 0;                       // Resetting mistake
    mistakeElem.textContent = `0/3`;
    scoreCount = 0;                         // Resetting score
    score.textContent = "0";

    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    timeStarted = false;
    time.textContent = "00:00";

    squareBtn.forEach((cell) => {cell.textContent = ""});   // Clear all filled squares on the board
    initializeGrid();                                      // Reinitializing grid
}
function gameOver() {
    gameDisplay.style.display = "none";
    gameOverScreen.style.display = "block";
    gameOverSound.play();
    scoreText.textContent = `Your Score is ${scoreCount}`;

    seconds = 0;
    minutes = 0;
    timeStarted = false;
    time.textContent = "00:00";

    restartGameBtn.addEventListener("click",() => {
        restartGame();
    });
}




// Time Logic side //
 
let timer = 0                       // add the pause when user win                       
let seconds = 0;                   // and reset the time when useer win || loss
let minutes = 0;
 
startGame.addEventListener("click",() => {
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline";
    timeStarted = true;
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    startTimer();
})
 
function startTimer() {
    timer = setInterval(()=> {
        seconds++;
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

    clearInterval(timer);
})

playBtn.addEventListener("click",() => {
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline";

    minutes =  stopTime.minutes;
    seconds = stopTime.seconds;
    startTimer();
})