// Global Variables ************************************************************

let userSeq = [];
let simonSeq = [];
let id, color, level = 0;
let strict = false;
let error = false;
let topScore;

let topScoreDisplay = document.querySelector("#topScoreCount").value;
let onBtn = document.querySelector("#powerOn");
let strictBtn = document.querySelector("#strictOn");

const colorBtns = document.querySelectorAll(".colorBtn");
const total_GAME_LEVELS = 20;


// Load Page with Buttons Disabled *********************************************

$(document).ready(function () {
 $('.startBtn').attr('disabled','disabled');
 addDisable();

 // Power Game Board On / Off
 
 $("#powerOn").click(function() {
    if (onBtn.checked == true) {
        playPowerOnSound();
        $("#count").text("HI");
        setTimeout(clearTurnCount, 1200);
        $('.startBtn').removeAttr('disabled');
        topScoreDisplay = getTopScoreFromLocalStorage();
        $("#topScoreCount").text(topScoreDisplay);
    } else {
        resetGame();
        $(".startBtn").attr("disabled", "disabled");
        addDisable();
      }
 });
});

// Press Start to Begin the Game ***********************************************

$(".startBtn").click(function() {
   resetGame();
   level++;
   genSimonSeq();
   setTimeout(removeDisable, 1500);
});

// Color Button Listener *******************************************************

$(".colorBtn").click(function() {
 id = $(this).attr("id");
 color = $(this).attr("class").split(" ")[2];
 genUserSeq();
});


// Strict Button Listener ******************************************************

$("#strictOn").click(function () {
 if (strictBtn.checked == true) {
   strict = true;
 } else {
  strict = false;
 }
});



// Generate Simon Sequence *****************************************************

function genSimonSeq() {
 addDisable();
 $("#count").text(level);
 if (!error) {
  getRandomNum();
 }
 let i = 0;
 let myInterval = setInterval(function () {
  id = simonSeq[i];
  color = $("#"+id).attr("class").split(" ")[2]; 
  addClassSound(id, color);
  i++;
  if (i == simonSeq.length) {
   clearInterval(myInterval);
  }
 }, 1000);
 setTimeout(removeDisable, 2000);
}


// Create Player Sequence Array ************************************************

function genUserSeq() {
 userSeq.push(id);
 addClassSound(id, color);
 
 // Check Player Sequence
 
 if (checkUserSeq()) {
  if (userSeq.length == simonSeq.length && userSeq.length < total_GAME_LEVELS) {
   level++;
   userSeq = [];
   error = false;
   setTopScore();
   genSimonSeq();
  }
  else if (userSeq.length == simonSeq.length && userSeq.length == total_GAME_LEVELS) {
   playGameWinSound();
   displayWin();
   lightUpBoard();
   removeBtnLights();
   setTopScore();
   resetGame();
  }
 }

 else if (!checkUserSeq()) {
  if (strictBtn.checked == true) {
   strictMessage();
   playErrorSound();
   resetGame();
  }
  else {
   displayError();
   error = true;
   setTimeout(genSimonSeq, 1000);
  }
 }
}


// Check User Seq with Simon Seq ***********************************************

function checkUserSeq() {
 for (var i = 0; i < userSeq.length; i++) {
  if (userSeq[i] != simonSeq[i]) {
   return false;
  }
 }
 return true;
}


// Display Error Function ******************************************************

function displayError() {
 playErrorSound();
 let counter = 0;
 let myError = setInterval(function () {
  $("#count").text("NO");
  counter++;
  if (counter == 3) {
   $("#count").text(level);
   clearInterval(myError);
   userSeq = [];
   counter = 0;
  }
 }, 300);
}


// Display Win Function ********************************************************

function displayWin() {
 let count = 0;
 let winInterval = setInterval(function () {
  count++;
  $("#count").text("WIN");
  $("#topScoreCount").text("🏆");
  if (count == 8) {
   clearInterval(winInterval);
   $("#count").text("--");
   $("#topScoreCount").text("20"); 
   count = 0;
  }
 }, 700);
}


// Set the Level to Top Score Display ******************************************

function setTopScore() {
 checkTopScore();
 $("#topScoreCount").text(topScoreDisplay);
 setTopScoreToLocalStorage();
}


// Check Top Score Against User Level ******************************************

function checkTopScore() {
 if (level > topScoreDisplay) {
  topScoreDisplay = level;
 } 
}


// Save Top Score to Local Storage *********************************************

function setTopScoreToLocalStorage() {
 localStorage.setItem("Top Score", topScoreDisplay);
}


// Get Top Score from Local Storage ********************************************

function getTopScoreFromLocalStorage() {
 let topScoreFromLS = localStorage.getItem("Top Score");
 if (topScoreFromLS === null || topScoreFromLS === undefined) {
  topScoreFromLS = "00";
 }
 return topScoreFromLS;
}


// Light Up All Buttons for Win ************************************************

function lightUpBoard() {
 setTimeout(redBtn, 1000);
 setTimeout(greenBtn, 1500);
 setTimeout(blueBtn, 2000);
 setTimeout(yellowBtn, 2500);
}


// Remove All Button Lights After Win ******************************************

function removeBtnLights() {
 setTimeout(redBtnRemove, 3000);
 setTimeout(greenBtnRemove, 3500);
 setTimeout(blueBtnRemove, 4000);
 setTimeout(yellowBtnRemove, 4500);
}


function redBtn() {
 $(".red").addClass("red-light");
}

function redBtnRemove() {
 $(".red").removeClass("red-light");
}

function greenBtn() {
 $(".green").addClass("green-light");
}

function greenBtnRemove() {
 $(".green").removeClass("green-light");
}

function blueBtn() {
 $(".blue").addClass("blue-light");
}

function blueBtnRemove() {
 $(".blue").removeClass("blue-light");
}

function yellowBtn() {
 $(".yellow").addClass("yellow-light");
}

function yellowBtnRemove() {
 $(".yellow").removeClass("yellow-light");
}


// Strict Message Function *****************************************************

function strictMessage() {
 let count = 0;
 let strictInterval = setInterval(function() {
  count++;
  $("#count").text("NO");
  $("#topScoreCount").text("😖");
  if (count == 4) {
   clearInterval(strictInterval);
   $("#topScoreCount").text(topScore);
   count = 0;
  }
 }, 500);
}


// Generate Random Number ******************************************************

function getRandomNum() {
 let random = Math.floor((Math.random() * 4) + 1);
 simonSeq.push(random);
}


// Create Function to Light Up Color Buttons & Play Sound Effect ***************

function addClassSound(id, color) {
    $("#"+id).addClass(color + "-light");       
    playBtnSound();         
    setTimeout(function() {
        $("#"+id).removeClass(color + "-light");
    }, 500);        
}


// Add btn-diasble class to color buttons **************************************

function addDisable() {
 colorBtns.forEach(function (button) {
  button.classList.add("btn-disabled");
 });
}


// Remove btn-disabled class from color buttons ********************************

function removeDisable() {
 colorBtns.forEach(function (button) {
  button.classList.remove("btn-disabled");
 });
}


// Reset the Game **************************************************************

function resetGame() {
 userSeq = [];
 simonSeq = [];
 level = 0;
 strict = false;
 error = false;
 $("#count").text(" ");
 if (onBtn.checked == true) {
   $("#topScoreCount").text(topScoreDisplay);
 } else {
   $("#topScoreCount").text(" ");
 }
}


// Create Function for Play Button Sound ***************************************

function playBtnSound() {
    let btnSound = document.querySelector("#btnSound");
    btnSound.play();
}


// Create Error Sound Function *************************************************

function playErrorSound() {
    let errSound = document.querySelector("#errSound");
    errSound.play();
}


// Create Power On Sound Function **********************************************

function playPowerOnSound() {
    let powerOnSound = document.querySelector("#powerOnSound");
    powerOnSound.play();
}


// Create Game Win Sound Function **********************************************

function playGameWinSound() {
 let gameWinSound = document.querySelector("#gameWinSound");
 gameWinSound.play();
}


// Create Function to Clear Display after Power On *****************************

function clearTurnCount() {
    $("#count").text("--");
}




