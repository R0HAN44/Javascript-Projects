let ham = document.getElementById('ham');
console.log(ham)
function myfunc(){
  let x = document.getElementById('ulist');
  if(x.style.visibility === "hidden"){
    x.style.visibility = 'visible';
    
  }
  else{
    x.style.visibility = 'hidden';
    
  }
}