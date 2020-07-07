let order=[];
let playerOrder=[];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict=false;
let noise=true;
let on=false;
let win;
//_-------------------------------const variables start------------------------------//
const turnCounter=document.querySelector("#turn");
const topLeft=document.querySelector("#topleft");
const topRight=document.querySelector("#topright");
const bottomLeft=document.querySelector("#bottomleft");
const bottomRight=document.querySelector("#bottomright");
const strictButton=document.querySelector("#strict");
const onButton=document.querySelector("#on");
const startButton=document.querySelector("#start");
//_-------------------------------const variables end------------------------------//


//_-------------------------------button function start------------------------------//
strictButton.addEventListener('change',(event) =>{
 if (strictButton.checked==true){
     strict=true;
 }else{
     strict=false;
 }
})

onButton.addEventListener('click',(event)=>{
    if (onButton.checked==true){
        on=true;
    turnCounter.innerHTML="-";
}else{
    on=false;
    turnCounter.innerHTML="";
    clearColor();
    clearInterval(intervalId);
}
  
})

startButton.addEventListener('click', (event)=>{
    if(on || win){
     play();
    }
});
//_-------------------------------button function ends------------------------------//

//_-------------------------------play function starts------------------------------//
function play(){
win=false;
order=[];
playerOrder=[];
flash=0;
intervalId=0;
turn=1;
turnCounter.innerHTML=1;
good=true;
for (var i=0; i=20; i++) {
order.push(Math.floor(Math.random()*4)+1);
}
compTurn=true;

intervalId=setInterval(gameTurn,800);
}

//_-------------------------------play colors ends------------------------------//


//_-------------------------------turn function starts------------------------------//
function gameTurn(){
    on=false;

    if(flash==turn){
    clearInterval(intervalId); 
    compTurn=false;
    clearColor();
    on=true;
    }
  if (compTurn) {
      clearColor();
      setTimeout(()=>{
        if (order[flash]==1) one();
        if (order[flash]==2) two();
        if (order[flash]==3) three();
        if (order[flash]==4) four();
        flash++;
     },200);
  } 
}
//_-------------------------------turn function ends-----------------------------------//

//_-------------------------------sound and light function starts------------------------------//
function one(){
    if(noise){
        let audio=document.getElementById("clip1");
        audio.play();
    }
    noise=true;
    topLeft.style.backgroundcolor="lightgreen";
}

function two(){
    if(noise){
        let audio=document.getElementById("clip2");
        audio.play();
    }
    noise=true;
    topRight.style.backgroundcolor="tomato";
}

function three(){
    if(noise){
        let audio=document.getElementById("clip3");
        audio.play();
    }
    noise=true;
    bottomLeft.style.backgroundcolor="yellow";
}

function four(){
    if(noise){
        let audio=document.getElementById("clip4");
        audio.play();
    }
    noise=true;
    bottomRight.style.backgroundcolor="lightskyblue";
}
//_-------------------------------sound and light function ends------------------------------//

//_-------------------------------light colors before click-----------------------------//
function clearColor(){
    topLeft.style.backgroundcolor="darkgreen";
    topRight.style.backgroundcolor="darkred";
    bottomLeft.style.backgroundcolor="goldenrod";
    bottomRight.style.backgroundcolor="darkblue";

}

//_-------------------------------------end---------------------------------------------------//


//_-------------------------------flashing lights start--------------------------------------//
function flashColor(){
    topLeft.style.backgroundcolor="lightgreen";
    topRight.style.backgroundcolor="tomato";
    bottomLeft.style.backgroundcolor="yellow";
    bottomRight.style.backgroundcolor="lightskyblue";

}

//_-------------------------------flashing lights end--------------------------------------//

//_-------------------------------push function start------------------------------//

topLeft.addEventListener('click',(event)=>{
    if(on){
        playerOrder.push(1);
        check();
        one();
        if(!win){
            setTimeout(() =>{
                clearColor();
            },300);
        }
    }
})

topRight.addEventListener('click',(event)=>{
    if(on){
        playerOrder.push(2);
        check();
        two();
        if(!win){
            setTimeout(() =>{
                clearColor();
            },300);
        }
    }
})

bottomLeft.addEventListener('click',(event)=>{
    if(on){
        playerOrder.push(3);
        check();
        three();
        if(!win){
            setTimeout(() =>{
                clearColor();
            },300);
        }
    }
})

bottomRight.addEventListener('click',(event)=>{
    if(on){
        playerOrder.push(4);
        check();
        four();
        if(!win){
            setTimeout(() =>{
                clearColor();
            },300);
        }
    }
})

//_-------------------------------push function ends---------------------------------------//


//_-------------------------------check function start--------------------------------------//

function check(){
    if(playerOrder[playerOrder.lenght-1]!== order[playerOrder.lenght-1])
    good=false;
    if(playerOrder.length==20 && good){
        winGame();
    }
    if(good==false){
        flashColor();
        turnCounter.innerHTML="TRY AGAIN!";
        setTimeout(()=>{
            turnCounter.innerHTML=turn;
            clearColor();

            if(strict){
                play();
            }else{
                compTurn=true
                flash=0;
                playerOrder=[];
                good=true;
                intervalId=setInterval(gameTurn,800)
            }
        },800);
        noise=false;
    }
    if(turn==playerOrder.length && good &&!win){
      turn++;
      playerOrder=[];
      compTurn=true;
      flash=0;
      turnCounter.innerHTML=turn; 
    }
}
//_-------------------------------check function ends-----------------------------------//

//_-------------------------------win function starts------------------------------//
function winGame(){
    flashColor();
    turnCounter.innerHTML="WIN";
    on=false;
    win=true;

}

//_-------------------------------win function ends------------------------------//