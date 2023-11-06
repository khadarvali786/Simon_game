var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var start=false;
var level=0;

$(document).keypress(function (){
  if(!start){
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }
});

var userClickedPattern=[];
$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  
  checkAnswers(userClickedPattern.length-1);
})


function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

 playSound(randomChosenColour);

 level++;
 $("#level-title").text("Level " + level);
 
 
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(() => {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswers(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("sucess");
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    if(level>5){
      $("#level-title").text("Game Over your Score is "+level+" You are smart , Press Any Key to Restart");
    }
    else{
      $("#level-title").text("Game Over your Score is "+level+" You can do it , Press Any Key to Restart");
    }
    
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];
  start=false;
}


