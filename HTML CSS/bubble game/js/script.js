var timer = 60;
var score = 0;

function increaseScore(){
  score += 1;
  document.querySelector("#scoreVal").textContent = score;
}

function makeBubble(){
  document.querySelector("#bottom").innerHTML= ""
  for(let i=1; i<=133; i++){
  let randomNumber = Math.floor(Math.random() * 10);
  document.querySelector("#bottom").innerHTML += `<div class="bubble">${randomNumber}</div>`;
} 
}

function runTimer(){
  var timerinterval = setInterval(function(){
    if(timer>0){
      timer--;
      document.querySelector("#timerValue").textContent = timer;
    }
    else{
    clearInterval(timerinterval);
    document.querySelector("#bottom").innerHTML=`<h1 style="color:white">Game Over</h1> <button id="button" onclick="restartGame()">Restart</button>`;
    document.querySelector("#bottom").style.flexDirection = "column";
    document.querySelector("#button").style.display = "block";
    
  }
  },1000)
  
}

function getHit(){
  document.querySelector("#hitval").textContent = Math.floor(Math.random() * 10);
}

function restartGame(){
  timer = 60;
  score = 0;
  document.querySelector("#button").style.display = "none";
  document.querySelector("#bottom").innerHTML="";
  document.querySelector("#scoreVal").textContent = score;
  makeBubble();
  runTimer();
}

document.querySelector("#bottom").addEventListener("click", e => {
  var clickedNum = Number(e.target.textContent);
  var hitNum = Number(document.querySelector("#hitval").textContent);
  if(clickedNum === hitNum){
    increaseScore();
    makeBubble();
    getHit();
  }
})

makeBubble();
runTimer();
getHit();
// increaseScore();