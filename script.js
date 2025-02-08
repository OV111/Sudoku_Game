import { initializeGrid } from "./generateSudoku.js";

initializeGrid()    

const startGame = document.querySelector(".startGame");
const time = document.getElementById("timeNumber");
const pauseBtn = document.querySelector("#pause")
const playBtn = document.querySelector("#play")

const mistakeElem = document.getElementById("mistake")
const square1number = document.getElementById("number");
 
const numbersBtn = document.querySelectorAll(".numbers")
let selectedNumber = null;
const squareBtn = document.querySelectorAll(".square")
 
numbersBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
        selectedNumber = e.target.textContent
        console.log(selectedNumber);                    // Removable
    })
})



//! Note that i define grid numbers as a string !!!/////////////////////////////////////////////////

squareBtn.forEach((x) => {                                      // THIS NEED TO BE CHANGED 
    x.addEventListener("click", (e) => {                                   
        if(e.target.textContent === selectedNumber) {
            alert("you already choose");  
        } else if(e.target.textContent === "1") {
            alert("already defined")
        }
        else if(selectedNumber) {
            e.target.textContent = selectedNumber;
        } 
    })
})
 
 


 
let timer = 0
let seconds = 0;
let minutes = 0;
 
startGame.addEventListener("click",() => {
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline";
 
    clearInterval(timer)
    seconds = 0;
    minutes = 0;
    startTimer()
    
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




let stopTime = {minutes:0, seconds:0,}                 // stop Time object!

pauseBtn.addEventListener("click", () => {
    pauseBtn.style.display = "none"
    playBtn.style.display = "inline"
    const timeParts = time.textContent.split(":");    // seperating the time(00:00)
     
        stopTime = {                                      // storing time's
            minutes: parseFloat(timeParts[0]),
            seconds: parseFloat(timeParts[1]),
        }
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
