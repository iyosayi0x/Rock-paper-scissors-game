const ROCK = document.querySelector("#rock");
const PAPER = document.querySelector("#paper");
const SCISSORS = document.querySelector("#scissors");
const DIALOG = document.querySelector("#dialog");
const TIMER = document.querySelector("#timer");
const TRY_AGAIN = document.querySelector("[data-try]");

//MOVES
let computer_move;
let player_move;

//SCORE STUFF
let player_score = 0;
let computer_score = 0;
let count;

//SESSION STORAGE STUFF
let victory_status;

//TIMER STUFF
let secs = 59;
let isDefined = false;

//STARTING THE GAME
function start_game() {
  document.querySelector("#match_result").classList.remove("hide");
}
//ANY BUTTON CAN CALL THE START GAME FUNCTION
document.querySelectorAll(".move").forEach(x=>
  x.onclick = ()=> {
    start_game();
    timer_begin();
  });

//MAIN GAME

//AN ARRAY TO STORE AVAILABLE CHOICES FOR THE COMPUTER
const moves = [{
  name: "Rock",
  icon: "/images/rock.png"
},
  {
    name: "Paper",
    icon: "/images/paper.png"
  },
  {
    name: "Scissors",
    icon: "/images/scissors.png"
  }];

function choose_move(choice) {
  let random = Math.round(Math.random()*2);
  document.querySelector("#computer_choice").src = moves[random].icon;
  computer_move = moves[random].name;
  player_move = choice;
  checks();
}

//IF ELSE BLOCK TO MAKES CHECKS ON DRAW WIN OR LOOSE
function checks() {
  if (player_move === computer_move) {
    show_draw("its a draw");
    //FOR ROCK
  } else if (player_move === "Rock" && computer_move === "Paper") {
    show_fail("You loose, paper covers rock");
  } else if (player_move === "Rock" && computer_move === "Scissors") {
    show_win("You win,  rock breaks scissors");
  }
  //FOR PAPER
  else if (player_move === "Paper" && computer_move === "Rock") {
    show_win("You win,  paper covers rock");
  } else if (player_move === "Paper" && computer_move === "Scissors") {
    show_fail("You loose,  scissors cuts paper");
  }
  //FOR SCISSORS
  else if (player_move === "Scissors" && computer_move === "Rock") {
    show_fail("You loose,  rock breaks scissors");
  } else if (player_move === "Scissors" && computer_move === "Paper") {
    show_win("You win,  scissors cuts paper");
  }

}

//WHEN ITS A DRAW
function show_draw(message) {
  DIALOG.innerText = message;
  DIALOG.style.color = "grey";
  player_score++;
  computer_score++;
  update_score(player_score, computer_score);

}
//WHEN PLAYER WINS
function show_win(message) {
  DIALOG.innerText = message;
  DIALOG.style.color = "green";
  player_score += 2;
  update_score(player_score, computer_score);

}
//WHEN PLAYER FAILS
function show_fail(message) {
  DIALOG.innerText = message;
  DIALOG.style.color = "red";
  computer_score += 2;
  update_score(player_score, computer_score);

}

function update_score(player, comp) {
  document.querySelector("#player_score").innerText = player;
  document.querySelector("#comp_score").innerText = comp;
}

function start_couting() {
  secs--;
  //SOME SPECIAL FEATURES
  if (secs < 10) {
    TIMER.innerText = `00 : 0${secs}`;
  } else {
    TIMER.innerText = `00 : ${secs}`;
  }
  //CALLING THE ENDGAME FUNCTION
  if (secs <= 0) {
    endgame();
    end_dialog();
    add_toStorage(player_score,victory_status);
    update_board();
  }

}

function timer_begin() {
  if (!isDefined) {
    count = setInterval(start_couting, 1000);
    isDefined = true;
  } else {
    return;
  }
}

//END GAMES WHEN COUTNDOWN RUNS OUT
function endgame() {
  count = clearInterval(count);
  document.querySelector("#shell").style.display = "none";
  document.querySelector("[data-end]").classList.remove("hide");

}

//RESETTING GAME TO START AGAIN
function reset() {
  //RESETTING SOME STYLES
  document.querySelector("#shell").style.display = "";
  document.querySelector("[data-end]").classList.add("hide");
  document.querySelector("#match_result").classList.add("hide");
  
  //RESETTING TIMER
  isDefined = false;
  secs = 59;
  timer_begin();
  
  //RESETTING PLAYER SCORES 
  player_score = 0;
  computer_score = 0;
  update_score(player_score, computer_score);

}

const end_msg=msg=>document.querySelector("[data-msg]").innerHTML=msg;

function end_dialog(){
  //IF PLAYERR WINS 
  if (player_score > computer_score) {
    end_msg(`<span style="color:green">YOU WIN</span> , outstanding job😎, your score is ${player_score}`);
    victory_status="Win";
    //IF PLAYER LOOSES
  }else if (player_score < computer_score) {
    end_msg(`<span style="color:red">YOU LOSE</span> , try again you might win 😉`);
    victory_status="Loose";
    
    //IF THERES NO WINNER
  }else {
    end_msg("Its a tie , NO WINNER");
    victory_status="Draw";
  }
}

//SETTING THE PLAYERS GAME RESULT ICON WHEN THE USER CLICKS ON A MOVE
const setIcon = index=>document.querySelector("#player_choice").src = moves[index].icon;

//CLICK EVENT TO RUN
ROCK.addEventListener("click", ()=> {
  choose_move("Rock");
  setIcon(0);
});

PAPER.addEventListener("click", ()=> {
  choose_move("Paper");
  setIcon(1);
});

SCISSORS.addEventListener("click", ()=> {
  choose_move("Scissors");
  setIcon(2);
});

//TRY AGAIN
TRY_AGAIN.addEventListener("click", ()=> {
  reset();
});