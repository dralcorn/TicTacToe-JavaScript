
// ******************************************************* gameSquareObject Constructor

function gameSquareObject(id, state, innerText) {
	
	// Variables
	
	this.id = id;
	
	this.state = state;
	
	this.innerText = innerText;
	
	// Methods - Getters
	
	this.getId = function() {
	
		return this.id;
	};
	
	this.isEmpty = function() {

		return this.state;
	}; 

	this.getInnerText = function() {

		return this.innerText;
	};
	
	// Methods - Setters
	
	this.setAsEmpty = function(state) {

		this.state = state;
	};
	
	this.setInnerText =	function(innerText) {

		this.innerText = innerText;
	};
};

// ******************************************************* playerObject Constructor

function playerObject(playerDesignationNumber) {

	var playerSelectName = "#player" + playerDesignationNumber + "Select option:selected";
	
	var playerAISelectName = "#player" + playerDesignationNumber + "AITypeSelect option:selected";
	
	this.type = $(playerSelectName).val();
	
	this.aIType;
	
	if (this.type == "Human") {
	
		this.aIType = "Human";
	}
	else {
		
		this.aIType = $(playerAISelectName).val();
	}
	
	this.character;
	
	if (playerDesignationNumber == "1") {
	
		this.character = "X";
	}
	else {
	
		this.character = "O";
	}
	
	//alert(this.type + " " + this.aIType);
	 
};

function gameStateObject(board, currentScore) {
	
	this.gameBoard = board;
	
	this.score = currentScore;
	
	this.player1Wins = function () {
	
		if (this.score == Infinity) {
		
			return true;
		}
		
		return false;
	}
	
	this.player2Wins = function () {
	
		if (this.score == -Infinity) {
		
			return true;
		}
		
		return false;
	}
	
	this.getLegalMoves = function () {
	
		//alert("Getting legal moves");
	
		var listOfLegalMoves = [];
		
		for (var i = 0; i < 9; i++) {
		
			if (this.gameBoard[i].isEmpty()) {
				
				listOfLegalMoves[listOfLegalMoves.length] = this.gameBoard[i].id;
				
				//alert("Square " + i + " is a legal move.");
			}
		}
		
		return listOfLegalMoves;
	}
	
	this.createSuccessorState = function (playerCharacter, squareToBeOccupied) {
		
		//alert("Creating successor");
		
		var s0 = new gameSquareObject("0", this.gameBoard[0].isEmpty(), this.gameBoard[0].getInnerText());
		var s1 = new gameSquareObject("1", this.gameBoard[1].isEmpty(), this.gameBoard[1].getInnerText());
		var s2 = new gameSquareObject("2", this.gameBoard[2].isEmpty(), this.gameBoard[2].getInnerText());
		var s3 = new gameSquareObject("3", this.gameBoard[3].isEmpty(), this.gameBoard[3].getInnerText());
		var s4 = new gameSquareObject("4", this.gameBoard[4].isEmpty(), this.gameBoard[4].getInnerText());
		var s5 = new gameSquareObject("5", this.gameBoard[5].isEmpty(), this.gameBoard[5].getInnerText());
		var s6 = new gameSquareObject("6", this.gameBoard[6].isEmpty(), this.gameBoard[6].getInnerText());
		var s7 = new gameSquareObject("7", this.gameBoard[7].isEmpty(), this.gameBoard[7].getInnerText());
		var s8 = new gameSquareObject("8", this.gameBoard[8].isEmpty(), this.gameBoard[8].getInnerText());
		
		var newBoard = [s0, s1, s2, s3, s4, s5, s6, s7, s8];
		
		newBoard[squareToBeOccupied].setInnerText(playerCharacter);
		
		newBoard[squareToBeOccupied].setAsEmpty(false);
		
		var newScore = this.calculateScore(newBoard) + this.score;
		
		var newGameStateObject = new gameStateObject(newBoard, newScore);
		
		//alert("Old board: 0-" + this.gameBoard[0].getInnerText() + " 1-" +  this.gameBoard[1].getInnerText() + " 2-"  +  this.gameBoard[2].getInnerText() + " 3-"  +  this.gameBoard[3].getInnerText() + " 4-"  +  this.gameBoard[4].getInnerText() + " 5-" +  this.gameBoard[5].getInnerText() + " 6-" +  this.gameBoard[6].getInnerText() + " 7-" +  this.gameBoard[7].getInnerText() + " 8-" +  this.gameBoard[8].getInnerText());
		
		//alert("New board: 0-" + newBoard[0].getInnerText() + " 1-" +  newBoard[1].getInnerText() + " 2-"  +  newBoard[2].getInnerText() + " 3-"  +  newBoard[3].getInnerText() + " 4-"  +  newBoard[4].getInnerText() + " 5-" +  newBoard[5].getInnerText() + " 6-" +  newBoard[6].getInnerText() + " 7-" +  newBoard[7].getInnerText() + " 8-" +  newBoard[8].getInnerText());
		
		return newGameStateObject;
	}
	
	this.calculateScore = function (theBoard) {
	
		//alert("Calculating board score");
	
		var result = 0;
		
		var xCount = 0;
		var oCount = 0;
		var emptyCount = 0;
		
		//alert("Checking Rows");
		
		for (var i = 0; i < 9; i = i + 3) {
		
			//alert("Checking row starting with square " + i);
		
			for (var q = i; q < (i + 3); q++) {
				
				if (theBoard[q].getInnerText() == "X") {
					
					//alert("X found");
					
					xCount++;
				}
				else if (theBoard[q].getInnerText() == "O") {
					
					//alert("O found");
					
					oCount++;
				}
				else { // theBoard[q].getInnerText() == "_" (i.e. it's empty)
					
					//alert("Blank found");
					
					emptyCount++;
				}
			}
			
			if (xCount == 1 && emptyCount == 2) {
			
				//alert("One point for X in row starting with square " + i);
			
				result++;
			}
			else if (xCount == 2 && emptyCount == 1) {
				
				//alert("Two points for X in row starting with square " + i);
				
				result += 2;
			}
			else if (xCount == 3) {
				
				//alert("X wins with three x's in row starting with square " + i);
				
				return Infinity;
			}
			else if (oCount == 1 && emptyCount == 2) {
				
				//alert("One point for O in row starting with square " + i);
				
				result--;
			}
			else if (oCount == 2 && emptyCount == 1) {
			
				//alert("Two points for O in row starting with square " + i);
				
				result -= 2;
			}
			else if (oCount == 3) {
				
				//alert("O wins with three o's in row starting with square " + i);
				
				return -Infinity;
			}
			
			xCount = 0;
			oCount = 0;
			emptyCount = 0;
		}
		
		//alert("Checking Columns");
		
		for (var r = 0; r < 3; r++) {
		
			//alert("Checking column starting with square " + r);
		
			for (var k = r; k < (r + 7); k = k + 3) {
				
				if (theBoard[k].getInnerText() == "X") {
					
					//alert("X found");
					
					xCount++;
				}
				else if (theBoard[k].getInnerText() == "O") {
					
					//alert("O found");
					
					oCount++;
				}
				else { // theBoard[k].getInnerText() == "_" (i.e. it's empty)
					
					//alert("Blank found");
					
					emptyCount++;
				}
			}
			
			if (xCount == 1 && emptyCount == 2) {
				
				//alert("One point for X in column starting with square " + r);
				
				result++;
			}
			else if (xCount == 2 && emptyCount == 1) {
				
				//alert("Two points for X in column starting with square " + r);
				
				result += 2;
			}
			else if (xCount == 3) {
				
				//alert("X wins with three x's in column starting with square " + r);
				
				return Infinity;
			}
			else if (oCount == 1 && emptyCount == 2) {
				
				//alert("One point for O in column starting with square " + r);
				
				result--;
			}
			else if (oCount == 2 && emptyCount == 1) {
				
				//alert("Two points for O in column starting with square " + r);
				
				result -= 2;
			}
			else if (oCount == 3) {
				
				//alert("O wins with three o's in column starting with square " + r);
				
				return -Infinity;
			}
			
			xCount = 0;
			oCount = 0;
			emptyCount = 0;
		}
		
		//alert("Checking diagonal 0-4-8");
		
		for (var w = 0; w < 9; w = w + 4) {
			
			if (theBoard[w].getInnerText() == "X") {
				
				//alert("X found");
				
				xCount++;
			}
			else if (theBoard[w].getInnerText() == "O") {
				
				//alert("O found");
				
				oCount++;
			}
			else { // theBoard[w].getInnerText() == "_" (i.e. it's empty)
				
				//alert("Blank found");
				
				emptyCount++;
			}
		}
		
		if (xCount == 1 && emptyCount == 2) {
		
			//alert("One point for X in diagonal 0-4-8");
		
			result++;
		}
		else if (xCount == 2 && emptyCount == 1) {
			
			//alert("Two points for X in diagonal 0-4-8");
			
			result += 2;
		}
		else if (xCount == 3) {
			
			//alert("X wins with three x's in diagonal 0-4-8");
			
			return Infinity;
		}
		else if (oCount == 1 && emptyCount == 2) {
			
			//alert("One point for O in diagonal 0-4-8");
			
			result--;
		}
		else if (oCount == 2 && emptyCount == 1) {
			
			//alert("Two points for O in diagonal 0-4-8");
			
			result -= 2;
		}
		else if (oCount == 3) {
			
			//alert("O wins with three o's in diagonal 0-4-8");
			
			return -Infinity;
		}
		
		xCount = 0;
		oCount = 0;
		emptyCount = 0;
		
		//alert("Checking diagonal 2-4-6");
		
		for (var z = 2; z < 7; z = z + 2) {
			
			if (theBoard[z].getInnerText() == "X") {
				
				//alert("X found");
				
				xCount++;
			}
			else if (theBoard[z].getInnerText() == "O") {
				
				//alert("O found");
				
				oCount++;
			}
			else { // theBoard[z].getInnerText() == "_" (i.e. it's empty)
				
				//alert("Blank found");
				
				emptyCount++;
			}
		}
		
		if (xCount == 1 && emptyCount == 2) {
		
			//alert("One point for X in diagonal 2-4-6");
		
			result++;
		}
		else if (xCount == 2 && emptyCount == 1) {
			
			//alert("Two points for X in diagonal 2-4-6");
			
			result += 2;
		}
		else if (xCount == 3) {
			
			//alert("X wins with three x's in diagonal 2-4-6");
			
			return Infinity;
		}
		else if (oCount == 1 && emptyCount == 2) {
			
			//alert("One point for O in diagonal 2-4-6");
			
			result--;
		}
		else if (oCount == 2 && emptyCount == 1) {
			
			//alert("Two points for O in diagonal 2-4-6");
			
			result -= 2;
		}
		else if (oCount == 3) {
			
			//alert("O wins with three o's in diagonal 2-4-6");
			
			return -Infinity;
		}
		
		//alert("Returning a board score of " + result);
		
		return result;
	}	
};

// ***************************************************************** playGame Function

function playGame(gameBoard, player1, player2, isPlayer1sTurn) {
	
	//alert("In playGame");	
	
	// *********************************************************************************
	//  												  * Game Setup and Start Code  *
	// *********************************************************************************
	
	var square0 = new gameSquareObject("0", true, "0");
	var square1 = new gameSquareObject("1", true, "1");
	var square2 = new gameSquareObject("2", true, "2");
	var square3 = new gameSquareObject("3", true, "3");
	var square4 = new gameSquareObject("4", true, "4");
	var square5 = new gameSquareObject("5", true, "5");
	var square6 = new gameSquareObject("6", true, "6");
	var square7 = new gameSquareObject("7", true, "7");
	var square8 = new gameSquareObject("8", true, "8");
	
	var gameBoard = [square0, square1, square2, square3, square4, square5, square6, square7, square8];
	
	var player1 = new playerObject("1");
	
	var player2 = new playerObject("2");
																		
	var activePlayer = player1;
	
	var isPlayer1sTurn = true;
	
	var winner = "No one, yet";
	
	var timeDecimalPoints = 3; // Used by Computer Agents in displaying the "Time taken last turn"									
																
	//alert("Player 1's turn");											
																		
	// First takeTurn() call. <------------------------------------ * Game starts here. *								
	takeTurn();															
	
	// *********************************************************************************
	//  													 			  * Turn Code  *
	// *********************************************************************************
	
	// ************************************************************** Used by all players
	
	function takeTurn() {
	
		//alert("In takeTurn");
		
		if (activePlayer.type == "Human") {
			
			//alert("Player is Human");
			
			activateSquareClickedListener();
		}
		else {
		
			//alert("Player is Computer");
			
			setTimeout(function() {
			
				computerTurnControl();
				
			}, 1000);
			
		}
	};
	
		function continueTurn() {
	
		//alert("In continueTurn");
		
		if (checkIfSomeoneHasWon()) {
			
			//alert(winner + " has won the game");
			
			$("#prompt").html(winner + " has won the game.");
		}
		else {
			
			//alert("Neither player has won");
			
			if (!checkIfGameIsADraw()) {
				
				changePlayers();
			}
			else {
				
				$("#prompt").html("Game has ended in a draw.");
			}
		}	
	};
	
	function checkIfSomeoneHasWon() {
		
		//alert("In checkIfSomeoneHasWon");
		
		var result = false;
		
		var winningCharacter = "_";
		
		if (gameBoard[0].getInnerText() == gameBoard[1].getInnerText() &&			// Check Rows
			gameBoard[1].getInnerText() == gameBoard[2].getInnerText()) {
			
			result = true;
			
			winningCharacter = gameBoard[0].getInnerText();
			
			//alert("3 matched in Row 1");
		}
		else if (gameBoard[3].getInnerText() == gameBoard[4].getInnerText() && 
				gameBoard[4].getInnerText() == gameBoard[5].getInnerText()) {
			
			result = true;
			
			winningCharacter = gameBoard[3].getInnerText();
			
			//alert("3 matched in Row 2");
		}
		else if (gameBoard[6].getInnerText() == gameBoard[7].getInnerText() && 
				gameBoard[7].getInnerText() == gameBoard[8].getInnerText()) {
			
			result = true;
			
			winningCharacter = gameBoard[6].getInnerText();
			
			//alert("3 matched in Row 3");
		}
		else if (gameBoard[0].getInnerText() == gameBoard[3].getInnerText() &&		// Check Columns
				gameBoard[3].getInnerText() == gameBoard[6].getInnerText()) {
			
			result = true;
			
			winningCharacter = gameBoard[0].getInnerText();
			
			//alert("3 matched in Column 1");
		}
		else if (gameBoard[1].getInnerText() == gameBoard[4].getInnerText() && 
				gameBoard[4].getInnerText() == gameBoard[7].getInnerText()) {
			
			result = true;
			
			winningCharacter = gameBoard[1].getInnerText();
			
			//alert("3 matched in Column 2");
		}
		else if (gameBoard[2].getInnerText() == gameBoard[5].getInnerText() && 
				gameBoard[5].getInnerText() == gameBoard[8].getInnerText()) {
			
			result = true;
			
			winningCharacter = gameBoard[2].getInnerText();
			
			//alert("3 matched in Column 3");
		}
		else if (gameBoard[0].getInnerText() == gameBoard[4].getInnerText() && 		// Check Diagonals
			gameBoard[4].getInnerText() == gameBoard[8].getInnerText()) {
			
			result = true;
			
			winningCharacter = gameBoard[0].getInnerText();
			
			//alert("3 matched in Diagonal 1");
		}
		else if (gameBoard[2].getInnerText() == gameBoard[4].getInnerText() && 
				gameBoard[4].getInnerText() == gameBoard[6].getInnerText()) {
			
			result = true;
			
			winningCharacter = gameBoard[2].getInnerText();
			
			//alert("3 matched in Diagonal 2");
		}
		
		if (result) {
		
			if (winningCharacter == "X") {
			
				winner = "Player 1";
			}
			else {
			
				winner = "Player 2";
			}
		}
		
		return result;
	};
	
	function checkIfGameIsADraw() {
		
		//alert("In checkIfGameIsADraw");
		
		var result = false;
		
		var occupiedSquareCount = 0;
		
		for (var i = 0; i < 9; i++) {
			
			if (gameBoard[i].getInnerText() == "X" ||
				gameBoard[i].getInnerText() == "O") {
			
				occupiedSquareCount++;
			}
		}
		
		if (occupiedSquareCount == 9) {
			
			result = true;
		}
		
		return result;
	};
	
	function changePlayers() {
		
		//alert("In changePlayers");
	
		if (isPlayer1sTurn) {
			
			activePlayer = player2;
			
			isPlayer1sTurn = false;
			
			$("#whoseTurn").val("Player 2");
			
			//alert("Player 2's turn");
		}
		else {
		
			activePlayer = player1;
			
			isPlayer1sTurn = true;
			
			$("#whoseTurn").val("Player 1");
			
			//alert("Player 1's turn");
		}
		
		takeTurn();
	};
	
	// ****************************************************** Used by human players only 
	
	function squareClickedListener() {
	
		var squareHtmlID = $(this).attr('id');
		
		var selectedSquareValue;
		
		switch (squareHtmlID) {
			case "squareA":
				selectedSquareValue = 0;
				break;
			case "squareB":
				selectedSquareValue = 1;
				break;
			case "squareC":
				selectedSquareValue = 2;
				break;
			case "squareD":
				selectedSquareValue = 3;
				break;
			case "squareE":
				selectedSquareValue = 4;
				break;
			case "squareF":
				selectedSquareValue = 5;
				break;
			case "squareG":
				selectedSquareValue = 6;
				break;
			case "squareH":
				selectedSquareValue = 7;
				break;
			case "squareI":
				selectedSquareValue = 8;
		}
		
		//alert("In squareClickedListener (" + squareHtmlID + " [" + selectedSquareValue + "] clicked)");
		
		if (gameBoard[selectedSquareValue].isEmpty()) {
			
			//alert("Square empty");
			
			$("#prompt").html("Game in progress.");
			
			gameBoard[selectedSquareValue].setAsEmpty(false);
			
			gameBoard[selectedSquareValue].setInnerText(activePlayer.character);
			
			$(this).html(gameBoard[selectedSquareValue].getInnerText());
			
			deactivateSquareClickedListener();
			
			continueTurn();
		}
		else {
		
			//alert("Square already selected");
			
			$("#prompt").html("Square already selected. Please select another.");
		}
	};
	
	function activateSquareClickedListener() {
	
		//alert("In activateSquareClickedListener");
		
		$("#squareA").bind("click", squareClickedListener);
		$("#squareB").bind("click", squareClickedListener);
		$("#squareC").bind("click", squareClickedListener);
		$("#squareD").bind("click", squareClickedListener);
		$("#squareE").bind("click", squareClickedListener);
		$("#squareF").bind("click", squareClickedListener);
		$("#squareG").bind("click", squareClickedListener);
		$("#squareH").bind("click", squareClickedListener);
		$("#squareI").bind("click", squareClickedListener);
	};
	
	function deactivateSquareClickedListener() {
	
		//alert("In deactivateSquareClickedListener");
		
		$("#squareA").unbind("click", squareClickedListener);
		$("#squareB").unbind("click", squareClickedListener);
		$("#squareC").unbind("click", squareClickedListener);
		$("#squareD").unbind("click", squareClickedListener);
		$("#squareE").unbind("click", squareClickedListener);
		$("#squareF").unbind("click", squareClickedListener);
		$("#squareG").unbind("click", squareClickedListener);
		$("#squareH").unbind("click", squareClickedListener);
		$("#squareI").unbind("click", squareClickedListener);
	};
	
	// **************************************************** Used by computer players only 
	
	function computerTurnControl() {
		
		//alert("In computerTurnControl");
		
		if (activePlayer.aIType == "Random") {
		
			randomAgentControl();
		}
		else if (activePlayer.aIType == "Reflex") {
		
			reflexAgentControl();
		}
		else if (activePlayer.aIType == "Minimax") {
		
			minimaxAgentControl();
		}
		else if (activePlayer.aIType == "Minimax w/ AB") {
		
			minimaxWithAlphaBetaPruningAgentControl();
		}
		else { // activePlayer.aIType == "Expectimax"
		
			expectimaxAgentControl();
		}
	};
	
	function randomAgentControl() { // <------------------------------- Used by Random Agent 
	
		//alert("In randomAgentControl");
		
		var startTime = new Date();
		
		var movesChecked = 0;
		
		var randomNumber;
		
		while (true) {
		
			movesChecked++;
		
			randomNumber = Math.floor(Math.random() * 9);
			
			//alert("Square " + randomNumber + " randomly selected.");
			
			if (gameBoard[randomNumber].isEmpty()) {
				
				//alert("Square empty.");
				
				break;
			}
			else {
				
				//alert("Square already selected. Selecting different square.");
			}
		}
		
		var endTime = new Date();
		
		var timeElapsed = ((endTime - startTime) / 1000);
		
		if (activePlayer.character == "X") {
			
			$("#player1TimeTaken").val(Number(timeElapsed).toFixed(timeDecimalPoints) + " seconds");
			$("#player1NodesChecked").val(movesChecked);
		}
		else {
			
			$("#player2TimeTaken").val(Number(timeElapsed).toFixed(timeDecimalPoints) + " seconds");
			$("#player2NodesChecked").val(movesChecked);
		}
		
		gameBoard[randomNumber].setAsEmpty(false);
				
		gameBoard[randomNumber].setInnerText(activePlayer.character);
			
		$(getSquareHtmlID(randomNumber)).html(gameBoard[randomNumber].getInnerText());
			
		continueTurn();
	};
	
	function reflexAgentControl() { // <----------------------------- Used by Reflex Agent
	
		//alert("In reflexAgentControl");
		
		var startTime = new Date();
		
		var movesChecked = 0;
		
		var squareNums = [];
		
		var squareValues = [];
		
		var highestValueSquare = -1;
		
		var highestValue = -1;
	
		for (var i = 0; i < 9; i++) {
			
			//alert("Checking square " + i);
			
			if (gameBoard[i].isEmpty()) {
			
				movesChecked++;
				
				//alert("Square " + i + " is empty.");
				
				squareNums[squareNums.length] = i;
				
				squareValues[squareValues.length] = getSquareValue(gameBoard, i, activePlayer.character);
				
				//alert("i = " + i +  ". Square " + squareNums[squareNums.length - 1] + " has a total value of " + squareValues[squareValues.length - 1]);
			}
			else {
			
				//alert("Square " + i + " is occupied.");
			}
		}
		
		for (var q = 0; q < squareNums.length; q++) {
			
			if (squareValues[q] > highestValue) {
				
				highestValueSquare = squareNums[q];
				
				highestValue = squareValues[q];
			}
		}
		
		//alert("Square " + highestValueSquare + " has the highest value (" + highestValue + ") and will be selected.");
		
		var endTime = new Date();
		
		var timeElapsed = ((endTime - startTime) / 1000);
		
		if (activePlayer.character == "X") {
			
			$("#player1TimeTaken").val(Number(timeElapsed).toFixed(timeDecimalPoints) + " seconds");
			$("#player1NodesChecked").val(movesChecked);
		}
		else {
			
			$("#player2TimeTaken").val(Number(timeElapsed).toFixed(timeDecimalPoints) + " seconds");
			$("#player2NodesChecked").val(movesChecked);
		}
		
		gameBoard[highestValueSquare].setAsEmpty(false);
				
		gameBoard[highestValueSquare].setInnerText(activePlayer.character);
			
		$(getSquareHtmlID(highestValueSquare)).html(gameBoard[highestValueSquare].getInnerText());
			
		continueTurn();
	
	};
	
	// <--------------------------------------------------------------- Used by Minimax Agent
	
	function minimaxAgentControl() {
		
		//alert("In minimaxAgentControl");
		
		var startTime = new Date();
		
		var movesChecked = 0;
		
		var oldValue;
		
		var newValue;
		
		var rootGameState = new gameStateObject(gameBoard, calculateRootGameBoardScore(gameBoard));
		
		var legalMoves = rootGameState.getLegalMoves();
		
		// DEBUG CODE - Start
		/*		
		var tempString = "";
		
		for (var y = 0; y < legalMoves.length; y++) {
		
			tempString = tempString + legalMoves[y] + " ";
		}
		
		alert("Root legal moves are " + tempString);
		*/
		// DEBUG CODE - End
		
		var bestMove = 100;
		
		var tiedMoves = [];
		
		var highestScoringTiedMove = 100;
		
		var highestScoringTiedMoveValue = 0;
		
		if (activePlayer.character == "X") { 
			
			//alert("Running minimax for player 1; will return max value after running minimax");
			
			oldValue = -Infinity;
			
			for (var i = 0; i < legalMoves.length; i++) {
			
				newValue = value(rootGameState.createSuccessorState("X", legalMoves[i]), getOppositePlayerCharacter("X"));
				
				if (newValue > oldValue) {
					
					oldValue = newValue;
					
					bestMove = legalMoves[i];
					
					tiedMoves.length = 0;
						
					tiedMoves[0] = legalMoves[i];
				}
				else if (newValue == oldValue) {
					
					tiedMoves[tiedMoves.length] = legalMoves[i];
				}
			}
		}
		else { // activePlayer.character == "O" 
			
			//alert("Running minimax for player 2; will return min value after running minimax");
		
			oldValue = Infinity;
			
			for (var i = 0; i < legalMoves.length; i++) {
			
				newValue = value(rootGameState.createSuccessorState("O", legalMoves[i]), getOppositePlayerCharacter("O"));
				
				if (newValue < oldValue) {
					
					oldValue = newValue;
					
					bestMove = legalMoves[i];
					
					tiedMoves.length = 0;
						
					tiedMoves[0] = legalMoves[i];
				}
				else if (newValue == oldValue) {
					
					tiedMoves[tiedMoves.length] = legalMoves[i];
				}
			}
		}
		
		//alert("Square " + bestMove + " was selected with a score of " + oldValue);
		
		if (tiedMoves.length > 0) {
		
			//alert("Tied moves found");
			
			bestMove = tiedMoves[0];
			
			var tempValue = 0;
			
			for (var g = 0; g < tiedMoves.length; g++) {
			
				movesChecked++;
			
				tempValue = getSquareValue(gameBoard, parseInt(tiedMoves[g]), activePlayer.character);
				
				//alert("Square " + tiedMoves[g] + " has a reflex value of " + tempValue);
			
				if (tempValue > highestScoringTiedMoveValue) {
				
					highestScoringTiedMoveValue = tempValue;
					
					highestScoringTiedMove = tiedMoves[g];
					
					bestMove = highestScoringTiedMove;
				}
			}
			
			//alert("Square " + bestMove + " (" + highestScoringTiedMove + ") has the highest reflex value");
		}
		
		var endTime = new Date();
		
		var timeElapsed = ((endTime - startTime) / 1000);
		
		if (activePlayer.character == "X") {
			
			$("#player1TimeTaken").val(Number(timeElapsed).toFixed(timeDecimalPoints) + " seconds");
			$("#player1NodesChecked").val(movesChecked);
		}
		else {
			
			$("#player2TimeTaken").val(Number(timeElapsed).toFixed(timeDecimalPoints) + " seconds");
			$("#player2NodesChecked").val(movesChecked);
		}
		
		gameBoard[bestMove].setAsEmpty(false);
				
		gameBoard[bestMove].setInnerText(activePlayer.character);
		
		//alert(bestMove + "0 " + getSquareHtmlID(parseInt(bestMove)) + " " + activePlayer.character + " " + gameBoard[bestMove].getInnerText());
		
		$(getSquareHtmlID(parseInt(bestMove))).html(gameBoard[bestMove].getInnerText());
			
		continueTurn();
		
		function value(gameStateObj, playerCharacter) {
		
			movesChecked++;
			
			if (gameStateObj.player1Wins() || gameStateObj.player2Wins()) {
				
				return gameStateObj.score;
			}
			
			if (playerCharacter == "X") {
			
				return maxValue(gameStateObj, playerCharacter);
			}
			else { // playerCharacter == "O"
				
				return minValue(gameStateObj, playerCharacter);
			}
		};
		
		function minValue(gameStateObj, playerCharacter) {
			
			var v = Infinity;
			
			var possibleMoves = gameStateObj.getLegalMoves();
			
			for (var i = 0; i < possibleMoves.length; i++) {
				
				v = Math.min(v, value(gameStateObj.createSuccessorState(playerCharacter, possibleMoves[i]), getOppositePlayerCharacter(playerCharacter)));
			}
			
			return v;
		};
		
		function maxValue(gameStateObj, playerCharacter) {
			
			var v = -Infinity;
			
			var possibleMoves = gameStateObj.getLegalMoves();
			
			for (var i = 0; i < possibleMoves.length; i++) {
				
				v = Math.max(v, value(gameStateObj.createSuccessorState(playerCharacter, possibleMoves[i]), getOppositePlayerCharacter(playerCharacter)));
			}
			
			return v;
		};
	};
	
	// <--------------------------------------------------------------- Used by Minimax w/ AB Agent
	
	function minimaxWithAlphaBetaPruningAgentControl() {
	
		//alert("In minimaxWithAlphaBetaPruningAgentControl");
		
		var startTime = new Date();
		
		var movesChecked = 0;
		
		var oldValue;
		
		var newValue;
		
		var alpha = -Infinity;
		
		var beta = Infinity;
		
		var rootGameState = new gameStateObject(gameBoard, calculateRootGameBoardScore(gameBoard));
		
		var legalMoves = rootGameState.getLegalMoves();
		
		// DEBUG CODE - Start
		/*		
		var tempString = "";
		
		for (var y = 0; y < legalMoves.length; y++) {
		
			tempString = tempString + legalMoves[y] + " ";
		}
		
		alert("Root legal moves are " + tempString);
		*/
		// DEBUG CODE - End
		
		var bestMove = 100;
		
		var tiedMoves = [];
		
		var highestScoringTiedMove = 100;
		
		var highestScoringTiedMoveValue = 0;
		
		if (activePlayer.character == "X") { 
			
			//alert("Running minimax for player 1; will return max value after running minimax");
			
			oldValue = -Infinity;
			
			for (var i = 0; i < legalMoves.length; i++) {
			
				newValue = value(rootGameState.createSuccessorState("X", legalMoves[i]), getOppositePlayerCharacter("X"), alpha, beta);
				
				if (newValue > oldValue) {
				
					oldValue = newValue;
					
					bestMove = legalMoves[i];
					
					tiedMoves.length = 0;
						
					tiedMoves[0] = legalMoves[i];
					
					if (oldValue > beta) {
						
						break;
					}
					
					alpha = Math.max(alpha, oldValue);
				}
				else if (newValue == oldValue) {
					
					tiedMoves[tiedMoves.length] = legalMoves[i];
				}
			}
		}
		else { // activePlayer.character == "O" 
			
			//alert("Running minimax for player 2; will return min value after running minimax");
		
			oldValue = Infinity;
			
			for (var i = 0; i < legalMoves.length; i++) {
			
				newValue = value(rootGameState.createSuccessorState("O", legalMoves[i]), getOppositePlayerCharacter("O"), alpha, beta);
				
				if (newValue < oldValue) {
				
					oldValue = newValue;
					
					bestMove = legalMoves[i];
					
					tiedMoves.length = 0;
						
					tiedMoves[0] = legalMoves[i];
					
					if (oldValue < alpha) {
					
						break;
					}
					
					beta = Math.min(beta, oldValue);
				}
				else if (newValue == oldValue) {
					
					tiedMoves[tiedMoves.length] = legalMoves[i];
				}
			}
		}
		
		//alert("Square " + bestMove + " was selected with a score of " + oldValue);
		
		if (tiedMoves.length > 0) {
		
			//alert("Tied moves found");
			
			bestMove = tiedMoves[0];
			
			var tempValue = 0;
			
			for (var g = 0; g < tiedMoves.length; g++) {
			
				movesChecked++;
			
				tempValue = getSquareValue(gameBoard, parseInt(tiedMoves[g]), activePlayer.character);
				
				//alert("Square " + tiedMoves[g] + " has a reflex value of " + tempValue);
			
				if (tempValue > highestScoringTiedMoveValue) {
				
					highestScoringTiedMoveValue = tempValue;
					
					highestScoringTiedMove = tiedMoves[g];
					
					bestMove = highestScoringTiedMove;
				}
			}
			
			//alert("Square " + bestMove + " (" + highestScoringTiedMove + ") has the highest reflex value");
		}
		
		var endTime = new Date();
		
		var timeElapsed = ((endTime - startTime) / 1000);
		
		if (activePlayer.character == "X") {
			
			$("#player1TimeTaken").val(Number(timeElapsed).toFixed(timeDecimalPoints) + " seconds");
			$("#player1NodesChecked").val(movesChecked);
		}
		else {
			
			$("#player2TimeTaken").val(Number(timeElapsed).toFixed(timeDecimalPoints) + " seconds");
			$("#player2NodesChecked").val(movesChecked);
		}
		
		gameBoard[bestMove].setAsEmpty(false);
				
		gameBoard[bestMove].setInnerText(activePlayer.character);
		
		//alert(bestMove + "0 " + getSquareHtmlID(parseInt(bestMove)) + " " + activePlayer.character + " " + gameBoard[bestMove].getInnerText());
		
		$(getSquareHtmlID(parseInt(bestMove))).html(gameBoard[bestMove].getInnerText());
			
		continueTurn();
		
		function value(gameStateObj, playerCharacter, alpha, beta) {
		
			movesChecked++;
			
			if (gameStateObj.player1Wins() || gameStateObj.player2Wins()) {
				
				return gameStateObj.score;
			}
			
			if (playerCharacter == "X") {
			
				return maxValue(gameStateObj, playerCharacter, alpha, beta);
			}
			else { // playerCharacter == "O"
				
				return minValue(gameStateObj, playerCharacter, alpha, beta);
			}
		};
		
		function minValue(gameStateObj, playerCharacter, alpha, beta) {
			
			var v = Infinity;
			
			var possibleMoves = gameStateObj.getLegalMoves();
			
			for (var i = 0; i < possibleMoves.length; i++) {
				
				v = Math.min(v, value(gameStateObj.createSuccessorState(playerCharacter, possibleMoves[i]), getOppositePlayerCharacter(playerCharacter), alpha, beta));
			
				if (v < alpha) {
				
					return v;
				}
				
				beta = Math.min(beta, v);
			}
			
			return v;
		};
		
		function maxValue(gameStateObj, playerCharacter, alpha, beta) {
			
			var v = -Infinity;
			
			var possibleMoves = gameStateObj.getLegalMoves();
			
			for (var i = 0; i < possibleMoves.length; i++) {
				
				v = Math.max(v, value(gameStateObj.createSuccessorState(playerCharacter, possibleMoves[i]), getOppositePlayerCharacter(playerCharacter), alpha, beta));
			
				if (v > beta) {
				
					return v;
				}
				
				alpha = Math.max(alpha, v);
			}
			
			return v;
		};
	};
	
	// <--------------------------------------------------------------- Used by Expectimax Agent
	
	function expectimaxAgentControl() {
	
		//alert("In expectimaxAgentControl");
		
		var startTime = new Date();
		
		var movesChecked = 0;
		
		var oldValue;
		
		var newValue;
		
		var rootGameState = new gameStateObject(gameBoard, calculateRootGameBoardScore(gameBoard));
		
		var legalMoves = rootGameState.getLegalMoves();
		
		// DEBUG CODE - Start
		/*		
		var tempString = "";
		
		for (var y = 0; y < legalMoves.length; y++) {
		
			tempString = tempString + legalMoves[y] + " ";
		}
		
		alert("Root legal moves are " + tempString);
		*/
		// DEBUG CODE - End
		
		var bestMove = 100;
		
		var tiedMoves = [];
		
		var highestScoringTiedMove = 100;
		
		var highestScoringTiedMoveValue = 0;
		
		if (activePlayer.character == "X") { 
			
			//alert("Running minimax for player 1; will return max value after running minimax");
			
			oldValue = -Infinity;
			
			for (var i = 0; i < legalMoves.length; i++) {
			
				newValue = valueX(rootGameState.createSuccessorState("X", legalMoves[i]), getOppositePlayerCharacter("X"));
				
				if (newValue > oldValue) {
				
					oldValue = newValue;
					
					bestMove = legalMoves[i];
					
					tiedMoves.length = 0;
						
					tiedMoves[0] = legalMoves[i];
				}
				else if (newValue == oldValue) {
					
					tiedMoves[tiedMoves.length] = legalMoves[i];
				}
			}
		}
		else { // activePlayer.character == "O" 
			
			//alert("Running minimax for player 2; will return min value after running minimax");
		
			oldValue = Infinity;
			
			for (var i = 0; i < legalMoves.length; i++) {
			
				newValue = valueO(rootGameState.createSuccessorState("O", legalMoves[i]), getOppositePlayerCharacter("O"));
				
				if (newValue < oldValue) {
				
					oldValue = newValue;
					
					bestMove = legalMoves[i];
					
					tiedMoves.length = 0;
						
					tiedMoves[0] = legalMoves[i];
				}
				else if (newValue == oldValue) {
					
					tiedMoves[tiedMoves.length] = legalMoves[i];
				}
			}
		}
		
		//alert("Square " + bestMove + " was selected with a score of " + oldValue);
		
		if (tiedMoves.length > 0) {
		
			//alert("Tied moves found");
			
			bestMove = tiedMoves[0];
			
			var tempValue = 0;
			
			for (var g = 0; g < tiedMoves.length; g++) {
			
				movesChecked++;
			
				tempValue = getSquareValue(gameBoard, parseInt(tiedMoves[g]), activePlayer.character);
				
				//alert("Square " + tiedMoves[g] + " has a reflex value of " + tempValue);
			
				if (tempValue > highestScoringTiedMoveValue) {
				
					highestScoringTiedMoveValue = tempValue;
					
					highestScoringTiedMove = tiedMoves[g];
					
					bestMove = highestScoringTiedMove;
				}
			}
			
			//alert("Square " + bestMove + " (" + highestScoringTiedMove + ") has the highest reflex value");
		}
		
		var endTime = new Date();
		
		var timeElapsed = ((endTime - startTime) / 1000);
		
		if (activePlayer.character == "X") {
			
			$("#player1TimeTaken").val(Number(timeElapsed).toFixed(timeDecimalPoints) + " seconds");
			$("#player1NodesChecked").val(movesChecked);
		}
		else {
			
			$("#player2TimeTaken").val(Number(timeElapsed).toFixed(timeDecimalPoints) + " seconds");
			$("#player2NodesChecked").val(movesChecked);
		}
		
		gameBoard[bestMove].setAsEmpty(false);
				
		gameBoard[bestMove].setInnerText(activePlayer.character);
		
		//alert(bestMove + "0 " + getSquareHtmlID(parseInt(bestMove)) + " " + activePlayer.character + " " + gameBoard[bestMove].getInnerText());
		
		$(getSquareHtmlID(parseInt(bestMove))).html(gameBoard[bestMove].getInnerText());
			
		continueTurn();
		
		function valueX(gameStateObj, playerCharacter) {
		
			movesChecked++;
			
			if (gameStateObj.player1Wins() || gameStateObj.player2Wins()) {
				
				return gameStateObj.score;
			}
			
			if (playerCharacter == "X") {
			
				return maxValue(gameStateObj, playerCharacter);
			}
			else { // playerCharacter == "O"
				
				return expValueX(gameStateObj, playerCharacter);
			}
		};
		
		function valueO(gameStateObj, playerCharacter) {
		
			movesChecked++;
			
			if (gameStateObj.player1Wins() || gameStateObj.player2Wins()) {
				
				return gameStateObj.score;
			}
			
			if (playerCharacter == "X") {
			
				return expValueO(gameStateObj, playerCharacter);
			}
			else { // playerCharacter == "O"
				
				return minValue(gameStateObj, playerCharacter);
			}
		};
		
		function minValue(gameStateObj, playerCharacter) {
			
			var v = Infinity;
			
			var possibleMoves = gameStateObj.getLegalMoves();
			
			for (var i = 0; i < possibleMoves.length; i++) {
				
				v = Math.min(v, valueO(gameStateObj.createSuccessorState(playerCharacter, possibleMoves[i]), getOppositePlayerCharacter(playerCharacter)));
			}
			
			return v;
		};
		
		function maxValue(gameStateObj, playerCharacter) {
			
			var v = -Infinity;
			
			var possibleMoves = gameStateObj.getLegalMoves();
			
			for (var i = 0; i < possibleMoves.length; i++) {
				
				v = Math.max(v, valueX(gameStateObj.createSuccessorState(playerCharacter, possibleMoves[i]), getOppositePlayerCharacter(playerCharacter)));
			}
			
			return v;
		};
		
		function expValueX(gameStateObj, playerCharacter) {
			
			var v = 0;
			
			var possibleMoves = gameStateObj.getLegalMoves();
			
			for (var i = 0; i < possibleMoves.length; i++) {
			
				probability = (1.0 / possibleMoves.length); // Read Note Below
				
				/* 
				
				Note: 
				
				Sometimes the probability is different for each move; here the prob treated the same, for ease of programming 
				and in anticipation of running against a random computer agent. So in this application the probability could be
				computed just once outside of the for loop instead of for each iteration of the loop. It's just computed here 
				as a reminding that in cases where expectimax is not running against a random agent, probability must be computed 
				separately for every move.
				
				*/
				
				v = probability * valueX(gameStateObj.createSuccessorState(playerCharacter, possibleMoves[i]), getOppositePlayerCharacter(playerCharacter));
			}
			
			return v;
		};
		
		function expValueO(gameStateObj, playerCharacter) {
			
			var v = 0;
			
			var possibleMoves = gameStateObj.getLegalMoves();
			
			for (var i = 0; i < possibleMoves.length; i++) {
			
				probability = (1.0 / possibleMoves.length); // Read Note Below
				
				/* 
				
				Note: 
				
				Sometimes the probability is different for each move; here the prob treated the same, for ease of programming 
				and in anticipation of running against a random computer agent. So in this application the probability could be
				computed just once outside of the for loop instead of for each iteration of the loop. It's just computed here 
				as a reminding that in cases where expectimax is not running against a random agent, probability must be computed 
				separately for every move.
				
				*/
				
				v = probability * valueO(gameStateObj.createSuccessorState(playerCharacter, possibleMoves[i]), getOppositePlayerCharacter(playerCharacter));
			}
			
			return v;
		};
	};
	
	// <--------------------------------------------------------------- Used by Various Computer Agents
	
	function getSquareValue(board, squareNumberID, playerCharacter) {
		
		//alert("In getSquareValue");
		
		var score = 0;
		
		var score = 0;

		score = score + rowScore() + columnScore() + diagonalScore();
		
		return score;

		function rowScore() {
		
			//alert("In rowScore");

			var row = 0;
	
			var result = 0;
			
			var dangerCounter = 0;

			switch (squareNumberID) {
				case 0:
				case 1:
				case 2:
					row = 1;
					break;
				case 3:
				case 4:
				case 5:
					row = 2;
					break;
				case 6:
				case 7:
				case 8:
					row = 3;
			}
			
			if (row == 1) {

				if ((board[0].isEmpty() || board[0].getInnerText() == playerCharacter) &&
					(board[1].isEmpty() || board[1].getInnerText() == playerCharacter) &&
					(board[2].isEmpty() || board[2].getInnerText() == playerCharacter)) {
			
					result++;
					
					for (var i = 0; i < 3; i++) {
						
						if (board[i].getInnerText() == playerCharacter) {
						
							result++;
						} 
					}
				}
				else {
					
					for (var i = 0; i < 3; i++) {
						
						if (board[i].getInnerText() == getOppositePlayerCharacter(playerCharacter)) {
						
							dangerCounter++;
						}
					}
				}
			}
			else if (row == 2) {
	
				if ((board[3].isEmpty() || board[3].getInnerText() == playerCharacter) &&
					(board[4].isEmpty() || board[4].getInnerText() == playerCharacter) &&
					(board[5].isEmpty() || board[5].getInnerText() == playerCharacter)) {
			
					result++;
					
					for (var i = 3; i < 6; i++) {
						
						if (board[i].getInnerText() == playerCharacter) {
						
							result++;
						} 
					}
				}
				else {
					
					for (var i = 3; i < 6; i++) {
						
						if (board[i].getInnerText() == getOppositePlayerCharacter(playerCharacter)) {
						
							dangerCounter++;
						}
					}
				}
			}
			else { // row == 3
	
				if ((board[6].isEmpty() || board[6].getInnerText() == playerCharacter) &&
					(board[7].isEmpty() || board[7].getInnerText() == playerCharacter) &&
					(board[8].isEmpty() || board[8].getInnerText() == playerCharacter)) {
			
					result++;
					
					for (var i = 6; i < 9; i++) {
						
						if (board[i].getInnerText() == playerCharacter) {
						
							result++;
						} 
					}
				}
				else {
					
					for (var i = 6; i < 9; i++) {
						
						if (board[i].getInnerText() == getOppositePlayerCharacter(playerCharacter)) {
						
							dangerCounter++;
						}
					}
				}
			}
			
			if (dangerCounter == 2) {
				
				result = result + 4;
				
				//alert("Danger of Lose bonus added.");
			}
			
			//alert("Row value equals " + result);
	
			return result;
		};

		function columnScore() {
		
			//alert("In columnScore");

			var column = 0;
	
			var result = 0;
			
			var dangerCounter = 0;

			switch (squareNumberID) {
				case 0:
				case 3:
				case 6:
					column = 1;
					break;
				case 1:
				case 4:
				case 7:
					column = 2;
					break;
				case 2:
				case 5:
				case 8:
					column = 3;
			}
	
			if (column == 1) {

				if ((board[0].isEmpty() || board[0].getInnerText() == playerCharacter) &&
					(board[3].isEmpty() || board[3].getInnerText() == playerCharacter) &&
					(board[6].isEmpty() || board[6].getInnerText() == playerCharacter)) {
			
					result++;
					
					for (var i = 0; i < 7; i = i + 3) {
						
						if (board[i].getInnerText() == playerCharacter) {
						
							result++;
						} 
					}
				}
				else {
					
					for (var i = 0; i < 7; i = i + 3) {
						
						if (board[i].getInnerText() == getOppositePlayerCharacter(playerCharacter)) {
						
							dangerCounter++;
						}
					}
				}	
			}
			else if (column == 2) {
	
				if ((board[1].isEmpty() || board[1].getInnerText() == playerCharacter) &&
					(board[4].isEmpty() || board[4].getInnerText() == playerCharacter) &&
					(board[7].isEmpty() || board[7].getInnerText() == playerCharacter)) {
			
					result++;
					
					for (var i = 1; i < 8; i = i + 3) {
						
						if (board[i].getInnerText() == playerCharacter) {
						
							result++;
						} 
					}
				}
				else {
					
					for (var i = 1; i < 8; i = i + 3) {
						
						if (board[i].getInnerText() == getOppositePlayerCharacter(playerCharacter)) {
						
							dangerCounter++;
						}
					}
				}	
			}
			else { // column == 3
	
				if ((board[2].isEmpty() || board[2].getInnerText() == playerCharacter) &&
					(board[5].isEmpty() || board[5].getInnerText() == playerCharacter) &&
					(board[8].isEmpty() || board[8].getInnerText() == playerCharacter)) {
			
					result++;
					
					for (var i = 2; i < 9; i = i + 3) {
						
						if (board[i].getInnerText() == playerCharacter) {
						
							result++;
						} 
					}
				}
				else {
					
					for (var i = 2; i < 9; i = i + 3) {
						
						if (board[i].getInnerText() == getOppositePlayerCharacter(playerCharacter)) {
						
							dangerCounter++;
						}
					}
				}	
			}
			
			if (dangerCounter == 2) {
				
				result = result + 4;
				
				//alert("Danger of Lose bonus added.");
			}
			
			//alert("Column value equals " + result);
	
			return result;		
		};

		function diagonalScore() {
			
			//alert("In diagonalScore");
			
			var result = 0;
			
			var dangerCounter = 0;
	
			switch(squareNumberID) {
				case 0:
				case 8:
					if ((board[0].isEmpty() || board[0].getInnerText() == playerCharacter) &&
						(board[4].isEmpty() || board[4].getInnerText() == playerCharacter) &&
						(board[8].isEmpty() || board[8].getInnerText() == playerCharacter)) {
			
						result++;
						
						for (var i = 0; i < 8; i = i + 4) {
						
							if (board[i].getInnerText() == playerCharacter) {
						
								result++;
							} 
						}
					}
					else {
					
						for (var i = 0; i < 8; i = i + 4) {
						
							if (board[i].getInnerText() == getOppositePlayerCharacter(playerCharacter)) {
						
								dangerCounter++;
							}
						}
					}
					break;
				case 2:
				case 6:
					if ((board[2].isEmpty() || board[2].getInnerText() == playerCharacter) &&
						(board[4].isEmpty() || board[4].getInnerText() == playerCharacter) &&
						(board[6].isEmpty() || board[6].getInnerText() == playerCharacter)) {
			
						result++;
						
						for (var i = 2; i < 7; i = i + 2) {
						
							if (board[i].getInnerText() == playerCharacter) {
						
								result++;
							} 
						}
					}
					else {
					
						for (var i = 2; i < 7; i = i + 2) {
						
							if (board[i].getInnerText() == getOppositePlayerCharacter(playerCharacter)) {
						
								dangerCounter++;
							}
						}
					}
					break;
				case 4:
					if ((board[0].isEmpty() || board[0].getInnerText() == playerCharacter) &&
						(board[4].isEmpty() || board[4].getInnerText() == playerCharacter) &&
						(board[8].isEmpty() || board[8].getInnerText() == playerCharacter)) {
			
						result++;
						
						for (var i = 0; i < 8; i = i + 4) {
						
							if (board[i].getInnerText() == playerCharacter) {
						
								result++;
							} 
						}
					}
					else {
					
						for (var i = 0; i < 8; i = i + 4) {
						
							if (board[i].getInnerText() == getOppositePlayerCharacter(playerCharacter)) {
						
								dangerCounter++;
							}
						}
					}
					
					if ((board[2].isEmpty() || board[2].getInnerText() == playerCharacter) &&
						(board[4].isEmpty() || board[4].getInnerText() == playerCharacter) &&
						(board[6].isEmpty() || board[6].getInnerText() == playerCharacter)) {
			
						result++;
						
						for (var i = 2; i < 7; i = i + 2) {
						
							if (board[i].getInnerText() == playerCharacter) {
						
								result++;
							} 
						}
					}
					else {
					
						for (var i = 2; i < 7; i = i + 2) {
						
							if (board[i].getInnerText() == getOppositePlayerCharacter(playerCharacter)) {
						
								dangerCounter++;
							}
						}
					}
			}
			
			if (dangerCounter == 2) {
				
				result = result + 4;
				
				//alert("Danger of Lose bonus added.");
			}
			
			//alert("Diagonal value equals " + result);
	
			return result;
		};
		
	};
	
	function getSquareHtmlID(numberID) {
		
		//alert("In getSquareHtmlID");
		
		var stringID;
		
		switch (numberID) {
			case 0:
				stringID = "#squareA";
				break;
			case 1:
				stringID = "#squareB";
				break;
			case 2:
				stringID = "#squareC";
				break;
			case 3:
				stringID = "#squareD";
				break;
			case 4:
				stringID = "#squareE";
				break;
			case 5:
				stringID = "#squareF";
				break;
			case 6:
				stringID = "#squareG";
				break;
			case 7:
				stringID = "#squareH";
				break;
			case 8:
				stringID = "#squareI";
		}
		
		return stringID
	};
	
	function getOppositePlayerCharacter(playerCharacter) {
		
		var character = "";
		
		if (playerCharacter == "X") {
			
			character = "O";
		}
		else {
			
			character = "X";
		}
		
		return character;
	};
	
	function calculateRootGameBoardScore(theBoard) {
	
		//alert("Calculating root board score");
	
		var result = 0;
		
		var xCount = 0;
		var oCount = 0;
		var emptyCount = 0;
		
		//alert("Checking Rows");
		
		for (var i = 0; i < 9; i = i + 3) {
		
			//alert("Checking row starting with square " + i);
		
			for (var q = i; q < (i + 3); q++) {
				
				if (theBoard[q].getInnerText() == "X") {
					
					//alert("X found");
					
					xCount++;
				}
				else if (theBoard[q].getInnerText() == "O") {
					
					//alert("O found");
					
					oCount++;
				}
				else { // theBoard[q].getInnerText() == "_" (i.e. it's empty)
					
					//alert("Blank found");
					
					emptyCount++;
				}
			}
			
			if (xCount == 1 && emptyCount == 2) {
			
				//alert("One point for X in row starting with square " + i);
			
				result++;
			}
			else if (xCount == 2 && emptyCount == 1) {
				
				//alert("Two points for X in row starting with square " + i);
				
				result += 2;
			}
			else if (xCount == 3) {
				
				//alert("X wins with three x's in row starting with square " + i);
				
				return Infinity;
			}
			else if (oCount == 1 && emptyCount == 2) {
				
				//alert("One point for O in row starting with square " + i);
				
				result--;
			}
			else if (oCount == 2 && emptyCount == 1) {
			
				//alert("Two points for O in row starting with square " + i);
				
				result -= 2;
			}
			else if (oCount == 3) {
				
				//alert("O wins with three o's in row starting with square " + i);
				
				return -Infinity;
			}
			
			xCount = 0;
			oCount = 0;
			emptyCount = 0;
		}
		
		//alert("Checking Columns");
		
		for (var r = 0; r < 3; r++) {
		
			//alert("Checking column starting with square " + r);
		
			for (var k = r; k < (r + 7); k = k + 3) {
				
				if (theBoard[k].getInnerText() == "X") {
					
					//alert("X found");
					
					xCount++;
				}
				else if (theBoard[k].getInnerText() == "O") {
					
					//alert("O found");
					
					oCount++;
				}
				else { // theBoard[k].getInnerText() == "_" (i.e. it's empty)
					
					//alert("Blank found");
					
					emptyCount++;
				}
			}
			
			if (xCount == 1 && emptyCount == 2) {
				
				//alert("One point for X in column starting with square " + r);
				
				result++;
			}
			else if (xCount == 2 && emptyCount == 1) {
				
				//alert("Two points for X in column starting with square " + r);
				
				result += 2;
			}
			else if (xCount == 3) {
				
				//alert("X wins with three x's in column starting with square " + r);
				
				return Infinity;
			}
			else if (oCount == 1 && emptyCount == 2) {
				
				//alert("One point for O in column starting with square " + r);
				
				result--;
			}
			else if (oCount == 2 && emptyCount == 1) {
				
				//alert("Two points for O in column starting with square " + r);
				
				result -= 2;
			}
			else if (oCount == 3) {
				
				//alert("O wins with three o's in column starting with square " + r);
				
				return -Infinity;
			}
			
			xCount = 0;
			oCount = 0;
			emptyCount = 0;
		}
		
		//alert("Checking diagonal 0-4-8");
		
		for (var w = 0; w < 9; w = w + 4) {
			
			if (theBoard[w].getInnerText() == "X") {
				
				//alert("X found");
				
				xCount++;
			}
			else if (theBoard[w].getInnerText() == "O") {
				
				//alert("O found");
				
				oCount++;
			}
			else { // theBoard[w].getInnerText() == "_" (i.e. it's empty)
				
				//alert("Blank found");
				
				emptyCount++;
			}
		}
		
		if (xCount == 1 && emptyCount == 2) {
		
			//alert("One point for X in diagonal 0-4-8");
		
			result++;
		}
		else if (xCount == 2 && emptyCount == 1) {
			
			//alert("Two points for X in diagonal 0-4-8");
			
			result += 2;
		}
		else if (xCount == 3) {
			
			//alert("X wins with three x's in diagonal 0-4-8");
			
			return Infinity;
		}
		else if (oCount == 1 && emptyCount == 2) {
			
			//alert("One point for O in diagonal 0-4-8");
			
			result--;
		}
		else if (oCount == 2 && emptyCount == 1) {
			
			//alert("Two points for O in diagonal 0-4-8");
			
			result -= 2;
		}
		else if (oCount == 3) {
			
			//alert("O wins with three o's in diagonal 0-4-8");
			
			return -Infinity;
		}
		
		xCount = 0;
		oCount = 0;
		emptyCount = 0;
		
		//alert("Checking diagonal 2-4-6");
		
		for (var z = 2; z < 7; z = z + 2) {
			
			if (theBoard[z].getInnerText() == "X") {
				
				//alert("X found");
				
				xCount++;
			}
			else if (theBoard[z].getInnerText() == "O") {
				
				//alert("O found");
				
				oCount++;
			}
			else { // theBoard[z].getInnerText() == "_" (i.e. it's empty)
				
				//alert("Blank found");
				
				emptyCount++;
			}
		}
		
		if (xCount == 1 && emptyCount == 2) {
		
			//alert("One point for X in diagonal 2-4-6");
		
			result++;
		}
		else if (xCount == 2 && emptyCount == 1) {
			
			//alert("Two points for X in diagonal 2-4-6");
			
			result += 2;
		}
		else if (xCount == 3) {
			
			//alert("X wins with three x's in diagonal 2-4-6");
			
			return Infinity;
		}
		else if (oCount == 1 && emptyCount == 2) {
			
			//alert("One point for O in diagonal 2-4-6");
			
			result--;
		}
		else if (oCount == 2 && emptyCount == 1) {
			
			//alert("Two points for O in diagonal 2-4-6");
			
			result -= 2;
		}
		else if (oCount == 3) {
			
			//alert("O wins with three o's in diagonal 2-4-6");
			
			return -Infinity;
		}
		
		return result;
	};
};