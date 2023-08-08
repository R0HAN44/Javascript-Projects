const url = "https://api.themotivate365.com/stoic-quote";

let author = document.getElementById('author');
let quote = document.getElementById('quote');

async function getData(){
  const response = await fetch(url);
  let data = await response.json();
  console.log(data);

  quote.innerHTML = data.quote;
  author.innerHTML = data.author;
  
}

function tweet(){
  window.open("https://twitter.com/intent/tweet?text=" + quote.innerHTML + " ---- by " + author.innerHTML, "Tweet Window", "width=600, height=300");
}
getData();