function hidePlayer1SetUpTools() {
	$("#player1AITypeSelectLabel").hide();
 	$("#player1AITypeSelect").hide();
 	$("#player1NodesCheckedLabel").hide();
 	$("#player1NodesChecked").hide();
 	$("#player1TimeTakenLabel").hide();
 	$("#player1TimeTaken").hide();
};

function showPlayer1SetUpTools() {
	$("#player1AITypeSelectLabel").show();
 	$("#player1AITypeSelect").show();
 	$("#player1NodesCheckedLabel").show();
 	$("#player1NodesChecked").show();
 	$("#player1TimeTakenLabel").show();
 	$("#player1TimeTaken").show();
};

function hidePlayer2SetUpTools() {
	$("#player2AITypeSelectLabel").hide();
 	$("#player2AITypeSelect").hide();
 	$("#player2NodesCheckedLabel").hide();
 	$("#player2NodesChecked").hide();
 	$("#player2TimeTakenLabel").hide();
 	$("#player2TimeTaken").hide();
};

function showPlayer2SetUpTools() {
	$("#player2AITypeSelectLabel").show();
 	$("#player2AITypeSelect").show();
 	$("#player2NodesCheckedLabel").show();
 	$("#player2NodesChecked").show();
 	$("#player2TimeTakenLabel").show();
 	$("#player2TimeTaken").show();
};

function changePlayer1ConfirmToUnconfirmed() {
	$("#player1Confirm").removeClass("confirmed");
	$("#player1Confirm").addClass("blink");
};

function changePlayer1ConfirmToConfirmed() {
	$("#player1Confirm").addClass("confirmed");
	$("#player1Confirm").removeClass("blink");
	$("#player1Confirm").html("Confirmed");
}

function changePlayer2ConfirmToUnconfirmed() {
	$("#player2Confirm").removeClass("confirmed");
	$("#player2Confirm").addClass("blink");
};

function changePlayer2ConfirmToConfirmed() {
	$("#player2Confirm").addClass("confirmed");
	$("#player2Confirm").removeClass("blink");
	$("#player2Confirm").html("Confirmed");
};

function changeStartButtonToUnconfirmed() {
	$("#startButton").removeClass("confirmed");
	$("#startButton").addClass("blink");
};

function changeStartButtonToConfirmed() {
	$("#startButton").addClass("confirmed");
	$("#startButton").removeClass("blink");
	$("#startButton").html("Started")
};

function checkIfPlayerWasChangedWhileGameWasInProgress() {
	
	if ($("#startButton").hasClass("confirmed")) {
		
		$("#prompt").html("Game stopped due to player change. Confirm player and click start to begin a new game.");
	}	
};

/*
============================================================================ ON LOAD
*/

$(document).ready(function() {

	hidePlayer1SetUpTools();
	
 	hidePlayer2SetUpTools();
 	
 	changePlayer1ConfirmToUnconfirmed();
	
	changePlayer2ConfirmToUnconfirmed();
	
	changeStartButtonToUnconfirmed(); 
	
	setTimeout(function() {
	
		$("#prompt").html("How about a nice game of Tic-Tac-Toe?");
		
		setTimeout(function() {
		
			$("#prompt").html("Set up the players and then click start.");
			
		}, 1500);
		
	}, 1000);
});

/*
========================================================================= PLAYER 1 SETUP
*/

$("#player1Select").change(function() {
	
	if ($("#player1Select option:selected").val() == "Human") {
		
		hidePlayer1SetUpTools();
	
	} 
	else {
	
		showPlayer1SetUpTools();
	
	}
	
	checkIfPlayerWasChangedWhileGameWasInProgress();
	
	changePlayer1ConfirmToUnconfirmed();
	
	changeStartButtonToUnconfirmed();
});

$("#player1AITypeSelect").change(function() { 
	
	checkIfPlayerWasChangedWhileGameWasInProgress();
	
	changePlayer1ConfirmToUnconfirmed();
	
	changeStartButtonToUnconfirmed();
});

$("#player1Confirm").click(function() {
	
	changePlayer1ConfirmToConfirmed();
});

/*
========================================================================= PLAYER 2 SETUP
*/

$("#player2Select").change(function() {
	if ($("#player2Select option:selected").val() == "Human") {
		
		hidePlayer2SetUpTools();
		
	} 
	else {
		
		showPlayer2SetUpTools(); 
	}
	
	checkIfPlayerWasChangedWhileGameWasInProgress();
	
	changePlayer2ConfirmToUnconfirmed();
	
	changeStartButtonToUnconfirmed();
});

$("#player2AITypeSelect").change(function() { 
	
	checkIfPlayerWasChangedWhileGameWasInProgress();
	
	changePlayer2ConfirmToUnconfirmed();
	
	changeStartButtonToUnconfirmed();
});

$("#player2Confirm").click(function() {
	
	changePlayer2ConfirmToConfirmed();
});

/*
========================================================================= GAME BOARD
*/

$("#startButton").click(function() {
	if ($("#player1Confirm").hasClass("confirmed") && $("#player2Confirm").hasClass("confirmed")) {
		if (!$("#startButton").hasClass("confirmed")) {
			
			changeStartButtonToConfirmed();
			
			$("#prompt").html("Game in progress.");
			
			$("#player1Select").prop("disabled", true);
			$("#player1AITypeSelect").prop("disabled", true);
			$("#player1Confirm").prop("disabled", true);
			
			$("#player2Select").prop("disabled", true);
			$("#player2AITypeSelect").prop("disabled", true);
			$("#player2Confirm").prop("disabled", true);
			
			$("#startButton").prop("disabled", true);
			
			playGame();
		}
	}
	else {
		$("#prompt").html("Both players must have their setup confirmed to start the game.");
	}
	
});