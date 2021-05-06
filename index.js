const show_msg= (func, msg)=> {
  alertify({
    title: func,
    text: msg
  });
};

const ROCK_IMG =document.querySelector("[data-rock]");
const PAPER_IMG =document.querySelector("[data-paper]");
const SCISSORS_IMG =document.querySelector("[data-sci]");

//ROCK 
ROCK_IMG.onclick =()=> show_msg("Rock" ,"Loses to Paper  \n Wins Scissors \n Draws to itself");

//PAPER
PAPER_IMG.onclick =()=> show_msg("Paper" ,"Loses to Scissors  \n Wins Rock \n Draws to itself");

//SCISSORS
SCISSORS_IMG.onclick =()=> show_msg("Scissors" ,"Loses to Rock  \n Wins Paper \n Draws to itself");