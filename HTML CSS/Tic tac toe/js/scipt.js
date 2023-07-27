let turn = "X"
let gameOver = false;
const boxes = Array.from(document.getElementsByClassName('box'));
const reset = document.getElementsByClassName('btn')[0];


function changeTurn(){
  return turn === 'X' ? 'O': 'X';
}

function checkDraw(){
  let span = Array.from(document.getElementsByClassName('boxtext'));
  let count = 0;
  span.forEach(ele=>{
    if(ele.classList.contains('x') || ele.classList.contains('o')){
        count+=1;
        console.log(count)
    }  
  })
  return count;
}

function checkWin(){
  let boxtext = document.getElementsByClassName('boxtext');
  
  let winComb = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ]

  winComb.forEach(ele=>{
      let a = boxtext[ele[0]].classList.contains('x');
      let b = boxtext[ele[1]].classList.contains('x');
      let c = boxtext[ele[2]].classList.contains('x');
      
      if(a && b && c && boxtext[ele[0]].innerText == ""){
        document.getElementsByClassName('turn')[0].innerText = "X Won";
        gameOver = true;
      }

      let d = boxtext[ele[0]].classList.contains('o');
      let e = boxtext[ele[1]].classList.contains('o');
      let f = boxtext[ele[2]].classList.contains('o');
      
      if(d && e && f && boxtext[ele[0]].innerText == ""){
        document.getElementsByClassName('turn')[0].innerText = "O Won";
        gameOver = true;
      }

  })
}



boxes.forEach(element => {
  let boxtext = element.querySelector('.boxtext');
  element.addEventListener('click',()=>{
    
    if(boxtext.innerText === ''){
      if(turn === 'X'){
        boxtext.classList.add('x');
        boxtext.classList.remove('o');
      }
      else{
        boxtext.classList.add('o');
        boxtext.classList.remove('x');
      }
      turn = changeTurn();
      checkWin();
      
      if(!gameOver){
        if(checkDraw() === 9){
          document.getElementsByClassName('turn')[0].innerText = "Draw";
        }
        else{
          document.getElementsByClassName('turn')[0].innerText = "Turn for " + turn;
        }
      }
      else{
        document.getElementById('b-1').style.pointerEvents =  "none";
      }
    }
    
  },{once:true})
})

boxes.forEach(element=>{
  if(element.querySelector('.boxtext').innerText !== ""){
    document.getElementsByClassName('turn')[0].innerText = "Draw";
  }
})

reset.addEventListener('click',()=>{
  window.location.reload();
  // let boxtexts = document.querySelectorAll('.boxtext');
  // Array.from(boxtexts).forEach(element=>{
  // element.classList.remove('o');
  // element.classList.remove('x'); 
  // })
  // once = false;
  // turn = 'X';
  // gameOver = false;
  // document.getElementById('b-1').style.pointerEvents =  "auto";
  // if(!gameOver){
  //       document.getElementsByClassName('turn')[0].innerText = "Turn for " + turn;
  //     }
})