let inputDir = {x:0, y:0};
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let board = document.getElementById('board');
let snakeArr = [
  {x:16, y:16}
] 
let food = {x:13, y:15};


function main(ctime){
  window.requestAnimationFrame(main);
  if((ctime - lastPaintTime)/1000 < 1/speed){
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(sarr){
  return false;
}


function gameEngine(){
  //updating the snake array and food
  if(isCollide(snakeArr)){
    inputDir = {x:0, y:0};
    alert('Game Over. Press Any key to play again!');
    snakeArr = [{x:13, y:15}];
    score = 0;
  }

  //after eaten food increment score and regen food
  if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y:snakeArr[0].y+inputDir.y});
    let a = 2;
    let b = 16;
    food = {x:Math.round(a + (b-a)*Math.random()), y:Math.round(a + (b-a)*Math.random())}
  }

  //moving the snake
  for(let i=snakeArr.length-2;i>=0;i--){
    
    snakeArr[i+1] = {...snakeArr[i]};
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //display the snake
  board.innerHTML = "";
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
  });
  
  //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}



window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
  inputDir = {x:0, y:1} //start the game
  switch (e.key){
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
    default:
      break;
  }
});