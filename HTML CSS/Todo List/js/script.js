const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');


function addTask(){
  let info = inputBox.value;
  console.log(info)
  if(!info){
    return
  }
  else{
    let li = document.createElement("li");
    listContainer.appendChild(li).innerText = info;
    
    let span = document.createElement('span');
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener('click',function(e){
  if(e.target.tagName === 'LI'){
    e.target.classList.toggle('checked')
    saveData();
  }
  else if(e.target.tagName === 'SPAN'){
    e.target.parentElement.remove();
    saveData();
  }
});

function saveData(){
  localStorage.setItem("data", listContainer.innerHTML);
}

function displayData(){
  listContainer.innerHTML = localStorage.getItem("data");
}
displayData();