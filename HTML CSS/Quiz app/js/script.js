const url = "https://opentdb.com/api.php?amount=50&category=18&type=multiple";
window.onload = fetchQuestions();

const optionButtons = document.querySelectorAll('.btn');
const nextButton = document.getElementById('next-btn');
const answerButtons = document.getElementById('answer-buttons');
let score = 0;
let questionNumber = 1 ;

function startQuiz(){
  score = 0;
  questionNumber = 1;
  
}


async function fetchQuestions(){
  let resolve = await fetch(url);
  let data  = await resolve.json();
  let results = data.results;
  let result = results[Math.floor(Math.random()* results.length)];
  
  showQuestion(result);
  
}

function showQuestion(result){
  resetState();
  
  document.getElementById('question').innerHTML = `${questionNumber}. `+result.question;
  let optList = result.incorrect_answers;
  
  optList.splice(Math.floor(Math.random()*4),0,result.correct_answer);
  
  optList.forEach((options,index)=>{
    let button = document.createElement("button");
    button.innerHTML = options;
    button.classList.add('btn');
    
    answerButtons.appendChild(button);
    
    if(options == result.correct_answer){
      button.dataset.correct = "true";
    }
    button.addEventListener('click',checkAnswer);
  })
}

function checkAnswer(e){
  let selectedButton = e.target;
  let isCorrect = selectedButton.dataset.correct === "true";
  if(isCorrect){
    selectedButton.classList.add('cor');
    score++;
  }
  else{
    selectedButton.classList.add('incor');
  }
  Array.from(answerButtons.children).forEach(button=>{
    if(button.dataset.correct === "true"){
      button.classList.add('cor');
    }
    button.disabled = true;
  })
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  document.getElementById('question').innerHTML = `You Scored ${score} out of 10`;
  nextButton.style.display = "block";
  nextButton.innerHTML = "Play Again";
}

function handleNextButton(){
  questionNumber+=1;
  if(questionNumber < 10){
    fetchQuestions();
  }
  else{
    showScore();
  }
}

nextButton.addEventListener('click',()=>{
  if(questionNumber < 10){
    handleNextButton();
  }
  else{
    fetchQuestions();
    startQuiz();
  }
});

function resetState(){
  nextButton.innerHTML = "Next";
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

startQuiz();
