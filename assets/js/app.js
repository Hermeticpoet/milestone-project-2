// Variables
let playerSeq = [];
let simonSeq = [1, 3, 2, 4]; // For Initial Test purposes ONLY!**!
let id, color, level = 0;
// let on = false;
let win = false;

const onBtn = document.querySelector("#powerOn");
const levelNum = 4;

// Page Loads & then Power Game Board Up

$(document).ready(function() {
    $("#powerOn").click(function() {
        if (onBtn.checked == true) {
            playPowerOnSound();
            $("#count").text("HI");
            setTimeout(clearTurnCount, 1000); // Clear HI text & change to --
        } else {
            $("#count").text(" "); // Blank display if power turned off
        }
    });
    
    // Press the Start Button to Begin Game
    
    $(".startBtn").click(function() {
        level++; 
        play();
    });
    
    // Add Listener to colorBtns 
    
    $(".colorBtn").click(function() {
        id = $(this).attr("id");
        color = $(this).attr("class").split(" ")[2];
        playerSeq.push(id); // add to user's array for matching with simonSeq
        console.log(id +" "+ color);
        addClassSound(id, color);
        
        
        // Check User Sequence is correct match to Simon, if not display error
        
        if (!playerSeqCorrect()) {
            playErrorSound();
            displayError();
            playerSeq = [];
        }
        
        
        // If User guess matches length of simon sequence then up level and 
        // reset player's sequence array & call play function again
        
        if (playerSeq.length == simonSeq.length) {
            level++;
            playerSeq = []; 
            play();
        }
    });
});


/*--  Check Player Sequence against Simon to be Correct & Loop
      Thru index of playerSeq and test against same index of simonSeq --*/

function playerSeqCorrect() {
    for (i = 0; i < playerSeq.length; i++) {
        if (playerSeq[i] != simonSeq[i]) {
            return false;
        }
    }
    return true;
}


// Display Error Function

function displayError() {
    console.log("error");
    let counter = 0;
    let playerError = setInterval(function() {
        $("#count").text("NO");
        counter++;
        if (counter == 4) {
            $("#count").text(level);
            clearInterval(playerError);
            playerSeq = [];
            counter = 0;
        }
    }, 500);
}


// Create Power On Sound Function 

function playPowerOnSound() {
    powerOnSound = document.querySelector("#powerOnSound");
    powerOnSound.play();
}


// Create Function to Clear Display after Power On 

function clearTurnCount() {
    $("#count").text("--");
}




