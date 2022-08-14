
/****************************************************************/
/ variables /
/****************************************************************/
var checkWin
var playerNum = 0;
var playerArr = [{ name: "p1_Wins", value: -1, symbl: "X", wins: 0, losses: 0, draws: 0 },
{ name: "p2_Wins", value: 1, symbl: "O", wins: 0, losses: 0, draws: 0 }];
var array = [0, 0, 0,
  0, 0, 0,
  0, 0, 0];
var checkWinArr
var gameOver = false;
var wins = 0;
var losses = 0;
var draws = 0;
var playerTurn;


function playBoard() {
  document.getElemenetById("button").onclick = function() { gridClicked() };

}

function gridClicked(_elemtNumber) {

  if (array[_elemtNumber] == 0) {
    array[_elemtNumber] = playerArr[playerNum].value;
  }
  fb_writeRec("games", "gameId", array);
}

// function winFunction(_elemtNumber) {
//   array[_elemtNumber] = playerArr[playerNum].value;
//   winner = false
//   for (var i = 0; i < 9; i++){
//     result = array[i];
//     if (result == true) {
//       wins = wins + 1
//       winner = true 
//       document.getElementById("p1_Wins").innerHTML = "Wins: " + wins
//     }
//     if (winner == false) {
//       losses = losses + 1
//       document.getElementById("p2_Losses").innerHTML = "Losses: " + losses;
//     }

//     console.log ('wins = ' + wins + ' losses = ' + losses)

//     var btnObj = document.getElementById("button" + i)
//     btnObj.disabled = true;
//     btnObj.style.backgroundColor = "red";
//   }
// }

// START OF FUNCTIONS //
/ check win array goes and checks if a player has won by seeing if three buttons on the game board in a row have the same player id /
function checkWinArr() {
  if (array[0] == array[1] && array[1] == array[2] && array[0] != 0) {
    console.log(array[0])
    displayWinner(array[0])
  }
  if (array[3] == array[4] && array[4] == array[5] && array[3] != 0) {
    console.log(array[3])
    displayWinner(array[3])
  }
  if (array[6] == array[7] && array[7] == array[8] && array[6] != 0) {
    console.log(array[6])
    displayWinner(array[6])
  }
  if (array[0] == array[3] && array[3] == array[6] && array[0] != 0) {
    console.log(array[0])
    displayWinner(array[0])
  }
  if (array[1] == array[4] && array[4] == array[7] && array[1] != 0) {
    console.log(array[1])
    displayWinner(array[1])
  }
  if (array[2] == array[5] && array[5] == array[8] && array[2] != 0) {
    console.log(array[2])
    displayWinner(array[2])
  }
  if (array[0] == array[4] && array[4] == array[8] && array[0] != 0) {
    console.log(array[0])
    displayWinner(array[0])
  }
  if (array[2] == array[4] && array[4] == array[6] && array[2] != 0) {
    console.log(array[2])
    displayWinner(array[2])
  }
}
/ this function resets the board by making all the buttons null and setting all the player numbers on the baord back to 0 /
function reset() {
  array = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  fb_writeRec("games", "gameId", array);
  for (var i = 0; i < 9; i++) {
    var btnObj = document.getElementById("button" + i)
    btnObj.disabled = false;
    btnObj.style.backgroundColor = "";
    btnObj.innerHTML = "";
  }
}
/ this function displays the board to the other person playing the game through the firebase /

function displayGrid() {

  for (var i = 0; i < array.length; i++) {
    var player = 2;

    if (array[i] == -1) {
      player = 0;

    } else if (array[i] == 1) {
      player = 1;
    }

    if (player != 2) {
      var btnObj = document.getElementById("button" + i)
      btnObj.disabled = true;
      btnObj.style.backgroundColor = "red";
      btnObj.innerHTML = playerArr[player].symbl

    } else {
      var btnObj = document.getElementById("button" + i)
      btnObj.disabled = false;
      btnObj.style.backgroundColor = "";
      btnObj.innerHTML = "";
    }
  }
}
/ this function resets the board through the firebase so that the other persons clicks is not still there when you reset the game/
function gridReturn(_snapshot) {
  var data = _snapshot.val()

  array = data;
  displayGrid()
  checkWinArr()
  tie()
}
runOnUpdate("games", "gameId", gridReturn);

/ this function disables all the buttons on the grid so that you can not continue playing when someone has won /

function freezeGame() {
  for (var i = 0; i < 9; i++) {
    var btnObj = document.getElementById("button" + i)
    btnObj.disabled = true;
    btnObj.style.backgroundColor = "red";
  }
}

/ this function displays which player has won /

function displayWinner(winnervalue) {
  //making the winner value into the winner
  //so it can be used in player array
  var winner;
  var loser;
  //winnervalue being -1 means that player 0 won
  //if player 0 doesn't win, player 1 wins
  if (winnervalue == -1) {
    winner = 0;
    loser = 1;
  } else {
    winner = 1;
    loser = 0;
  }
  playerArr[winner].wins += 1;
  playerArr[loser].losses += 1;



  document.getElementById("p1_Wins").innerHTML = "Wins: " + playerArr[0].wins


  document.getElementById("p1_Losses").innerHTML = "Losses: " +
    playerArr[0].losses



  document.getElementById("p2_Wins").innerHTML = "Wins: " + playerArr[1].wins


  document.getElementById("p2_Losses").innerHTML = "Losses: " +
    playerArr[1].losses


  console.log(playerArr[winner]);

  freezeGame();
}
function tie() {
  var emptySqr = false;
  for (var i = 0; i < 9; i++) {
    if (array[i] == 0) {
      emptySqr = true;
    } 
  }


  if (emptySqr == false) {
    
    playerArr[0].draws +=1;
    playerArr[1].draws +=1;

    
    document.getElementById("p1_Draws").innerHTML = "Draws: " + playerArr[0].draws 

    document.getElementById("p2_Draws").innerHTML = "Draws: " + playerArr[1].draws
    
    console.log("Draw");
    freezeGame()
  } 
}


async function checkForWaiting(){
  var waiting = await readRec("waitingList", "");
  return waiting;
}




// END OF CODE //