var triviaQuestions = [{
	question: "What is the original name given to the blood elves?",
	answerList: ["Quil'dorei", "Kel'dorei", "Sin'dorei", "Draenei"],
	answer: 2
},{
	question: "Which of the following is the only raid in world of warcraft where you can play a game of  chess?",
	answerList: ["The Steamvaults", "The Gamevaults", "Boardgame Land", "Karazhan", "Caverns of Time: The Creation of Classical Boardgames"],
	answer: 3
},{
	question: "Who's commonly referred to as The Betrayer?",
	answerList: ["Arthas Menethil", "Illidan Stormrage", "Deathwing", "Loken", "Vancleef", "Sylvaniso"],
	answer: 1
},{
	question: "Arthas Menethil's horse is named?",
	answerList: ["Invincible", "Indestructible", "Nightmare", "Jaina", "Death Hoof", "Chromaggus"],
	answer: 0
},{
	question: "The Well of Eternity currently resides where?",
	answerList: ["Silvermoon City", "Darnassus", "Dalaran", "Tempest Keep", "The Maelstrom", "Teldrassil"],
	answer: 4
},{
	question: "Malfurion has a brother, who is it?",
	answerList: ["Illidan", "Cenarius", "Zalex", "Blackraven", "Hodir", "Kael"],
	answer: 0
},{
	question: "What year did World of Warcraft forst launch?",
	answerList: ["1984", "2000", "2004", "1995"],
	answer: 2
},{
	question: "Who is the Aspect of Magic?",
	answerList: ["Alexstrasza", "Kalecgos", "Nozdormu", "Malygos", "Ysera", "Vaelastrasz"],
	answer: 1
},{
	question: "As of Wrath of the Lich King, the current Lich King is who?",
	answerList: ["Ner'Zhul", "Arthas and Ner'Zhul", "Kil'jaeden", "Gul'Dan", "Arthas Menethil", "Alexandros Mograine"],
	answer: 4
},{
	question: "Alexandros Mograine was killed by who?",
	answerList: ["Kel'Thuzad", "Baron Rivendare", "Renault Mograine", "Darion Mograine", "The Lich King", "Illidan"],
	answer: 2
},{
	question: "Kel'Thuzad was brought back to life thanks to what?",
	answerList: ["The Corrupted Ashbringer", "The Sunwell", "The Cries of Sylvanas", "The Lich King himself", "Deathwing", "Alexstrasza"],
	answer: 1
},{
	question: "The Sons of Arugal are what kind of creatures?",
	answerList: ["Worgen", "Murlocs", "Humans", "Ogres", "Orcs", "Dwarves"],
	answer: 0
},{
	question: "Identify the quote to whom it belongs to. 'What joy is there in this curse!?'",
	answerList: ["Thrall", "Vereesa Windrunner", "Arthas Menethil", "Sylvanas Windrunner", "Darion Mograine", "Medivh"],
	answer: 3
},{
	question: "Medivh was slain by what two heroes?",
	answerList: ["Illidan and Malfurion", "Arthas and Uther", "Thrall and Grom", "Rhonin and Krasus", "Hodir and Loken", "Lothar and Khadgar"],
	answer: 5
},{
	question: "Sorrow Hill is named so for what event?",
	answerList: ["The first coming of the Legion", "The arrival of the Scourge", "The defeat of Uther", "The turning point of Arthas Menethil", "The second invasion of the Orcs", "The hill that Sylvanas was defeated on"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 6; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 10;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 2000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 2000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
