let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#Reset");
let newGameBtn=document.querySelector("#newbtn");
let msgConatiner=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let mainContainer=document.querySelector(".MainContainer");

let turnO=true;  
let count=0;  

const winPatterns=[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame=()=>{
    turnO=true;
    count=0;
    enabledBtn();
    msgConatiner.classList.add("hide");
    mainContainer.classList.remove("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turnO){//player O
            box.innerText="O";
            turnO=false;
        }else{//player X
            box.innerText="X";
            turnO=true;  
        }
        box.disabled=true;
        count++;
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgConatiner.classList.remove("hide");
    mainContainer.classList.add("hide");
  };

const enabledBtn=()=>{
    for(box of boxes){
        box.disabled=false;
        box.innerText="";

    }
};

const showWinner=(Winner)=>{
    msg.innerText=`Congratulations, Winner is Player ${Winner}`;
    msgConatiner.classList.remove("hide");
    mainContainer.classList.add("hide");
};

const checkWinner=()=>{
    for(let patterns of winPatterns){
        let pos1val=boxes[patterns[0]].innerText;
        let pos2val=boxes[patterns[1]].innerText;
        let pos3val=boxes[patterns[2]].innerText;

        if (pos1val !="" && pos2val !="" && pos3val!=""){
            if(pos1val===pos2val && pos2val===pos3val){
                showWinner(pos1val);
                return true;
            }
        }
    }
};

resetBtn.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",resetGame);