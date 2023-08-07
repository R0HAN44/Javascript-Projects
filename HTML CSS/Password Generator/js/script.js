const charRange = document.getElementById('charRange');
const charNumber = document.getElementById('charNumber');
const form = document.getElementsByClassName('form')[0];
const uppercase = document.getElementById('uppercase');
const numbers = document.getElementById('numbers');
const symbol = document.getElementById('symbol');
const passDisplay = document.getElementById('passDisplay');
const icon = document.getElementsByClassName('icon')[0];
const copied = document.getElementsByClassName('copied')[0];
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const number = "1234567890";
const symb = "!@#$%^&*()_-=+<>?|/[]";

charNumber.addEventListener('input', syncAmount);
charRange.addEventListener('input', syncAmount);

form.addEventListener('submit',e=>{
  e.preventDefault();
  const charAmount = charNumber.value;
  const includeUpper = uppercase.checked;
  const includeNumbers = numbers.checked;
  const includeSymbol = symbol.checked;
  const password = generatePass(charAmount,includeUpper,includeNumbers,includeSymbol);
})

function generatePass(charAmount,includeUpper,includeNumbers,includeSymbol){
  let passwordString = lower;
  if(includeUpper) passwordString+=upper;
  if(includeNumbers) passwordString+=number;
  if(includeSymbol) passwordString+=symb;

  let password="";
  for(let i=0;i<charAmount;i++){
    password+= passwordString[Math.floor(Math.random() * passwordString.length)];
  }
  passDisplay.innerText = password;
}


function syncAmount(e){
  let value = e.target.value;
  charNumber.value = value;
  charRange.value = value;
}

icon.addEventListener('click',()=>{
  copied.style.display = "block";
  setTimeout(()=>{
    copied.style.display = "none";
  },1500);
  let text = passDisplay.innerText;
  let inputEle = document.createElement('input');
  inputEle.setAttribute('value', text);
  document.body.appendChild(inputEle);
  inputEle.select();
  document.execCommand('copy');
  inputEle.parentNode.removeChild(inputEle);
})