var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

function nextSequence() {

    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);  
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);

}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

function playSound(name) {

    var audio2 = new Audio("./sounds/" + name + ".mp3");
	audio2.play();
    
}

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    } else {
        
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function() {
        $("body").removeClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        }, 200);
        level = 0;
        start = false;
        gamePattern = [];
        $(document).on("keydown", function startOver() {
            if (!start) {
                $("#level-title").text("Level " + level);
                nextSequence();
                start = true;
            }    
        })
        
    }
}

$(".btn").on("click", function handler(){

    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function caller() {

    if (!start) {
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
})