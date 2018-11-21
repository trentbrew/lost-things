/*
Course: IT238 Assignment 4
Name: Trenton Brew
Date: Jan 29, 2018
Description: lots and lots of javascript to make the game function
*/

//----------------------------global variables---------------------------------

var winTrigger = false;
var won = false;
var clickable;
var isFound;
var score = 0;
var umberellaCount = 6;
var cameraCount = 5;
var pencilCount = 4;
var mugCount = 3;
var phoneCount = 2;
var numTries = 0;
var numSuccess = 0;
var numFailure = 0;
var selectedCells = [];

//-------------------------------functions-------------------------------------

//----------handle pre clicked functon----------

function handlePreClicked() {
  if(!won) {
    $("#message-text").html("You already clicked there :/");
    $("#message-text").css({
      'color':'#BDBDBD'
    });
    $("#exit-button").css({
      'color':'#BDBDBD'
    });
    $("#message").css({
      'border-color':'#BDBDBD'
    });
    $("#message").addClass("animation-active");
    setTimeout(function() {
      $("#message").removeClass("animation-active");
    }, 500);
  }
  else {
    $("#message").addClass("animation-active");
    setTimeout(function() {
      $("#message").removeClass("animation-active");
    }, 500);
  }
}

//----------cell clicked function----------

function handleCellClicked(target) {
  console.log("cell clicked");
  $(target).css({
    'background-color':'#9E9E9E'
  });
  //show message
  $("#message").css({
    'opacity':'1',
  });
  //expand main card
  $("#main").css({
    'height':'650px'
  });

  /*setTimeout(function() {
    $("#main").css('height','520px');
    $("#message").css({
      'opacity':'0'
    });
  }, 800);*/
}

//----------item found function----------

function handleItemFound(targetObj) {
  //increment success counter
  numSuccess++;
  //message with ternary for grammar
  $("#message-text").html(((targetObj.name == "Umberella") ? "Nice! You found an <strong>" + targetObj.name + "</strong> :)" : "Nice! You found a <strong>" + targetObj.name + "</strong> :)"));
  //making message color green
  $("#message").css({
    'border-color':'#66BB6A'
  });
  //changing message text
  $("#message-text").css({
    'color':'#66BB6A'
  });
  //changing color of message button
  $("#exit-button").css({
    'color':'#66BB6A'
  });
  //incrimenting success cunter in display
  $("#num-success strong").html(numSuccess);
  //resetting animation trigger for shake effect
  $("#message").removeClass("animation-active");
  //boolean just in case
  isFound = true;
}

//----------item not found function----------

function handleItemNotFound() {
  numFailure++;

  (score > 0 ? score -= 1 : score = 0); //giving score minimum of 0
  $("#message-text").html("You didn't find anything... :c");
  $("#message").css({
    'border-color':'#ef5350'
  });
  $("#message-text").css({
    'color':'#ef5350'
  });
  $("#exit-button").css({
    'color':'#ef5350'
  });
  $("#score strong").html(score);
  $("#message").addClass("animation-active");
  setTimeout(function() {
    $("#message").removeClass("animation-active");
  }, 500);

  $("#num-failure strong").html(numFailure);

  isFound = false;
}

//----------handle message exit function----------

function handleMessageExit() {
  isVisible = false;
  $("#message").css({
    'opacity':'0'
  });
  $("#main").css({
    'height':'520px'
  });
}

//----------checl win function----------

function checkWin() {
  if((umberellaCount <= 0) && //---check for win---
     (cameraCount <= 0) &&
     (mugCount <= 0) &&
     (pencilCount <= 0) &&
     (phoneCount <= 0)) {
    win();
  }
}

//----------check clickable function-----------

function checkClickable(cellID) {
  if(!won) {
    if(selectedCells.includes(cellID)) {
      clickable = false;
    }
    else {
      clickable = true;
    }
  }
  else {
    clickable = false;
  }
}

//----------update counters function----------

function updateCounters(targetObj) {
  if(targetObj.name == "Umberella") {
    score += 5;
    umberellaCount--;
    if(umberellaCount == 0) {
      $("#count-umberella").css({
        'color':'#66BB6A'
      });
    }
  }
  else if(targetObj.name == "Camera") {
    score += 5;
    cameraCount--;
    if(cameraCount == 0) {
      $("#count-camera").css({
        'color':'#66BB6A'
      });
    }
  }
  else if(targetObj.name == "Pencil") {
    score += 5;
    pencilCount--;
    if(pencilCount == 0) {
      $("#count-pencil").css({
        'color':'#66BB6A'
      });
    }
  }
  else if(targetObj.name == "Mug") {
    score += 5;
    mugCount--;
    if(mugCount == 0) {
      $("#count-mug").css({
        'color':'#66BB6A'
      });
    }
  }
  else {
    score += 5;
    phoneCount--;
    if(phoneCount == 0) {
      $("#count-phone").css({
        'color':'#66BB6A'
      });
    }
  }
  $("#score strong").html(score);
  $("#count-umberella strong").html(umberellaCount);
  $("#count-camera strong").html(cameraCount);
  $("#count-mug strong").html(mugCount);
  $("#count-pencil strong").html(pencilCount);
  $("#count-phone strong").html(phoneCount);
}

//----------win function----------

function win() {
  console.log("you won");
  won = true;
  $("body").css({
    'background-color':'#81C784'
  });
  $("#summary-divider").addClass("divider");
  $("#restart-button").css({
    'border-color':'#FFFFFF',
    'color':'#FFFFFF'
  });
  $("#summary").css({
    'color':'#FFFFFF'
  });
  $(".count").css({
    'color':'#FFFFFF'
  });
  $(".divider").css({
    'background-color':'#FFFFFF'
  });
  $("#score").css({
    'color':'#FFFFFF'
  });
  $("#exit-button").css({
    'color':'#66BB6A'
  });
  $("#message").css({
    'border-color':'#66BB6A'
  });
  $("#message-text").css({
    'color':'#66BB6A'
  });
  $("#message-text").html("<strong>Congratulations!!! You won! :D</strong>");
  displaySummary();
}

//----------display summary function----------

function displaySummary() {
  var summary;
  var grade;
  if(score >= 94) {
    grade = "A+<br>Amazing job!!! Go show off your score to your friends :D";
  }
  else if(score >= 90 && score < 94) {
    grade = "A-<br>You did pretty awesome ;) Try again and shoot for an A+!";
  }
  else if(score >= 84 && score < 90) {
    grade = "B+<br>Swell job :) I'm sure you could do better though.";
  }
  else if(score >= 80 && score < 84) {
    grade = "B-<br>Nice job. You're about average at this game.<br>You can get an A, I believe in you!";
  }
  else if(score >= 74 && score < 80) {
    grade = "C+, or shall I say... C++?<br>All jokes aside, you did alright.<br>Definitely Not great though.";
  }
  else if(score >= 70 && score < 74) {
    grade = "C-<br>You pass, but you still suck. Try again and do better!";
  }
  else if(score >= 60 && score < 70) {
    grade = "D<br>Yikes... You're trash at this game aren't you? Did you even try?";
  }
  else {
    grade = "F<br>Gee wiz just give up.<br>Literally you must've hit every single square. You're hot garbage.";
  }

  summary = ("<br>Your score was " + score + "<br>" +
                 "That's a solid " + grade + "<br>");
  $("#summary").html("<strong>Summary:</strong> " + summary);
}

//----------try dig function----------

function tryDig(targetCell, board) {
  var targetObj = board.dig(targetCell);
  numTries++; //increment number of tries
  $("#num-tries strong").html(numTries); //increment tries in display

  if(targetObj) { //---something found---
    handleItemFound(targetObj);
    //displaying icon for cell item
    $("#cell" + targetCell).css({
      'background-image':'url(' + targetObj.icon + ')'
    });
    //updating counters specified in assingment spec
    updateCounters(targetObj);
  }
  else { //---nothing found---
    handleItemNotFound();
  }
}

//----------handle reset function----------

function handleReset() {
  score = 0;
  umberellaCount = 6;
  cameraCount = 5;
  pencilCount = 4;
  mugCount = 3;
  phoneCount = 2;
  numTries = 0;
  numSuccess = 0;
  numFailure = 0;
  selectedCells = [];

  $("#score strong").html(score);
  $("#count-umberella strong").html(umberellaCount);
  $("#count-camera strong").html(cameraCount);
  $("#count-mug strong").html(mugCount);
  $("#count-pencil strong").html(pencilCount);
  $("#count-phone strong").html(phoneCount);
  $("#num-tries strong").html(numTries);
  $("#num-success strong").html(numSuccess);
  $("#num-failure strong").html(numFailure);

  $("body").css({
    'background-color':'#EEEEEE'
  });
  $("#summary-divider").removeClass("divider");
  $("#restart-button").css({
    'border-color':'#BDBDBD',
    'color':'#BDBDBD',
    'background-color':'#EEEEEE'

  });
  $("#summary").css({
    'display':'none'
  })
  $(".count").css({
    'color':'#9E9E9E'
  });
  $(".divider").css({
    'background-color':'#BDBDBD'
  });
  $("#score").css({
    'color':'#9E9E9E'
  });
  $("#message").css({
    'border-color':'#66BB6A',
    'opacity':'0',
    'margin-top':'0px'
  });
  $("#main").css({
    "height": "520px"
  });
}

//----------------------------------events-------------------------------------

$(window).ready(function() {

  console.log("The window is ready");
  isFound = false;
  board = new GameBoard();
  board.setBoard();

  //----------hover event to check for cell clickability----------

  $(".square").hover(function() {
    var cellID = $(this).attr('id').substring(4,6);
    checkClickable(cellID);
  });

  //----------square click event----------

  $(".square").click(function() {
    isVisible = true;

    if(clickable == true) {
      var cellID = $(this).attr('id').substring(4,6);
      handleCellClicked(this);
      tryDig(cellID, board);
      selectedCells.push(cellID); //pushing cell IDs to an array to keep track of them
      checkWin(); //checking for winning conditions
    }
    else { //if current item was already clicked
      handlePreClicked();
    }

    //----------exit message event----------

    $("#exit-button").click(function() {
      handleMessageExit();
    });

    //for testing
    if(winTrigger == true) {
      win();
    }
  });

  //----------click event for restart button----------

  $("#restart-button").click(function() {
    location.reload(); //refreshing page

    /*console.log("clicked new game");

    won = false;
    handleReset();

    board = new GameBoard();
    board.setBoard();
    isFound = false;*/
  });

  //----------hover event for restart button after win----------

  $("#restart-button").hover(function() {
    if(won) {
      $(this).css({
        'background-color':'#FFFFFF',
        'color':'#81C784'
      });
    }
  }, function() {
    if(won) {
      $(this).css({
        'background-color':'#81C784',
        'color':'#FFFFFF'
      });
    }
  });
});
