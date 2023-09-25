let inputDir = {x:0, y:0};
let speed = 8;
let lastPaintTime = 0;
let snakeArr = [
  {x:12, y:15}
];
let food = {x:10, y:10};
let score = 0;
let board = document.getElementById("board");
let scoreele = document.getElementById("score");

// creating game loop to repaint window continuosly
function main(ctime){
  window.requestAnimationFrame(main);
  if((ctime - lastPaintTime)/1000 < 1/speed){
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

//Display snake and food

function isCollide(){
  //if snake collides with itself
  for(let i=1;i<snakeArr.length;i++){
    if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y){
      return true;
    }
  }
    if(snakeArr[0].x >= 18 || snakeArr[0].x <=0 || snakeArr[0].y >= 18 || snakeArr[0].y <=0){
      return true;
    }
  
}

function gameEngine(){
  //updating the snakeArray and food
  if(isCollide()){
    inputDir = {x:0, y:0};
    alert(`Game over. Your Score : ${score}. Press any key to play again`);
    snakeArr = [{x:12, y:15}];
    score = 0;
  } 

  //When snake eats food increment score and regenerate food and update snakeArr
  if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
    let a = 2;
    let b = 16;
    food = {x : Math.round(a + (b-a) * Math.random()), y : Math.round(a + (b-a) * Math.random())};
    score+=1;
  }

  //move the snake
  for(let i = snakeArr.length-2; i>=0; i--){
    snakeArr[i+1] = {...snakeArr[i]};
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  
  // Display the Food
  board.innerHTML = "";
  foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  board.appendChild(foodElement);


  // Display the snake
  snakeArr.forEach((e,index)=>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index === 0){
      snakeElement.classList.add('head');
    }
    else{
      snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
  })

  //Display score
  scoreele.innerHTML = `Score : ${score}`;
}



window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
  inputDir = {x:0, y:1}; //start the game
  switch(e.key){
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
  }
});