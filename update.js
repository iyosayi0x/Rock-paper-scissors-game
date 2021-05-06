const BOARD = document.querySelector("#board");
const NST = document.querySelector("#nst");
const INTS = document.querySelector("#int_scores");
const DS = document.querySelector("#dialog_scores");

function update_board(){
  //SETTING STUFF TO EMPTY STRING
  NST.innerHTML="";
  DS.innerHTML="";
  
  //FOR LOOP STUFF
  for(let i=0; i<SS.length; i++){
    //CREATING ELEMENTS
    let divElem=document.createElement('div');
    let divElem2=document.createElement('div');
    
    //GIVING THOSE ELEMENSTS CLASS
    divElem.className='int';
    divElem2.className='mr';
    
    //GETTING KEY & VALUE PAIRS FROM SESSION STORAGE
    let key=SS.key(i);
    let value=SS.getItem(key);
    
    //SETTING CREATED TEXT TO KEY AND VALUE PAIRS
    divElem.innerText=key;
    divElem2.innerText=value;
    
    //APPENDING CHILD TO RIGHT DIVS IN BODY
    INTS.appendChild(divElem);
    DS.appendChild(divElem2);
  }
}
if (SS.length !==0) {
  BOARD.classList.remove("hide");
  NST.classList.add("hide");
  update_board();
}else {
   BOARD.classList.add("hide");
  NST.classList.remove("hide");
}

