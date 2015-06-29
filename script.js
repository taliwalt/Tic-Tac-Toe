window.onload = playTicTacToe;
var theSquares = document.querySelectorAll('.square');
var atBat = document.querySelector("#atBat");
var theCounter = 1;
var theScoreKeeper = 0;
var xSquares = [];
var oSquares = [];

var winningCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

function playTicTacToe() {
	addClickListener();
	addResetListener();
}

function addClickListener() {
	for (var i = theSquares.length - 1; i >= 0; i--) {
		theSquares[i].addEventListener("click", gamePlay);
	}
}

function gamePlay(event) {
	if (event.target.innerHTML === "") {
		if (theCounter % 2 === 0) {
			oSquares.push(parseInt(event.target.getAttribute("data-square-val")));
			event.target.innerHTML = "O";
			// event.target.setAttribute("class","x");
			atBat.innerHTML = "X, you are up!";
			theCounter++;
			winnerCheck(oSquares, "O");
		} else {
			xSquares.push(parseInt(event.target.getAttribute("data-square-val")));
			event.target.innerHTML = "X";
			// event.target.setAttribute("class","o");
			atBat.innerHTML = "O, you are up!";
			theCounter++;
			winnerCheck(xSquares, "X");
		}
		// if the counter is greater than or equal to 10, the game is a draw!
		if (theCounter >= 10) {
			turnText.innerHTML = "Game Over!";
			var conf = confirm("It's a draw, do you want to play again?");
			if (conf) {
				resetBoard();
			}
		}
	}
}

function addResetListener() {
	var resetButton = document.getElementById("reset");
	resetButton.addEventListener("click", resetBoard);
}

function winnerCheck(playerSquares, name) {
	for (i = 0; i < winningCombinations.length; i++) {
		winCounter = 0;														// reset the winCounter each time!
		
		for (var j = 0; j < winningCombinations[i].length; j++) {			// loop over each individual array
			
			if (playerSquares.indexOf(winningCombinations[i][j]) !== -1) {	// if the number in winning combo array is === a number in playerSquares array, add to winCounter
				winCounter++;
			}
			
			if (winCounter === 3) {											// if winCounter === 3 that means all 3 moves are winning combos and game is over!
				atBat.innerHTML = name + " Wins!";
				alert("Game over, " + name + " wins!");
				resetBoard();
			}
		}
	}
}

function resetBoard() {
	for (var i = theSquares.length - 1; i >= 0; i--) {
		theSquares[i].innerHTML = "";
		// theSquares[i].setAttribute("class","clear");

	}
	oSquares = [];
	xSquares = [];
	theScoreKeeper = 0;
	theCounter = 1;
	atBat.innerHTML = "X, you're up!";
}