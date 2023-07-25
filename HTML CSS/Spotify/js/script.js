console.log("Welcome to spotify")

//Initailize the variables
let songIndex = 1;
let audioElement = new Audio('/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay')
let myprogressbar = document.getElementById('myprogressbar')
let volumebar = document.getElementById('volumeslider')
let gif = document.getElementById('gif')
let mastersongname = document.getElementById('mastersongname')
let songitems = Array.from(document.getElementsByClassName('song-item'));
let updDur = document.getElementsByClassName('updDur')
let constDur = document.getElementsByClassName('constDur')
let voli = document.getElementById('voli')


audioElement.volume=0;

let songs = [
  {songName: "As It Was", filePath: "/songs/1.mp3", coverPath: "/covers/1.jpg"},
  {songName: "Heat Waves", filePath: "/songs/2.mp3", coverPath: "/covers/2.jpg"},
  {songName: "Afterthought", filePath: "/songs/3.mp3", coverPath: "/covers/3.jpg"},
  {songName: "Last day on earth", filePath: "/songs/4.mp3", coverPath: "/covers/4.jpg"},
  {songName: "Let Me Down Slowly", filePath: "/songs/5.mp3", coverPath: "/covers/5.jpg"},
  {songName: "Living Life, In The Night", filePath: "/songs/6.mp3", coverPath: "/covers/6.jpg"},
  {songName: "I Ain't Worried", filePath: "/songs/7.mp3", coverPath: "/covers/7.jpg"},
  {songName: "Past Lives", filePath: "/songs/8.mp3", coverPath: "/covers/8.jpg"},
]

songitems.forEach((element, i)=>{
  
  element.getElementsByTagName('img')[0].src=songs[i].coverPath;
  element.getElementsByClassName('songname')[0].innerHTML=songs[i].songName;
})

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
  if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
    document.getElementById(songIndex).classList.remove('fa-circle-play')
    document.getElementById(songIndex).classList.add('fa-circle-pause')
    gif.style.opacity=1;
    document.getElementById('bg-img').src=`/covers/${songIndex}.jpg`
    
    
  }
  else{
    audioElement.pause();
    masterPlay.classList.add('fa-circle-play')
    masterPlay.classList.remove('fa-circle-pause')
    gif.style.opacity=0;
    document.getElementById(songIndex).classList.add('fa-circle-play')
    document.getElementById(songIndex).classList.remove('fa-circle-pause')
    document.getElementById('bg-img').src=`/covers/${songIndex}.jpg`

  }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
  //update seekbar
  progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
  myprogressbar.value = progress;
  updDur[0].innerHTML = Math.floor(audioElement.currentTime/60) + ":" + Math.floor(audioElement.currentTime%60) + "/"
  constDur[0].innerHTML = Math.floor(audioElement.duration/60) + ":" + Math.floor(audioElement.duration%60)
})

myprogressbar.addEventListener('change', ()=>{
  audioElement.currentTime = (myprogressbar.value) * (audioElement.duration)/100 
})

volumebar.addEventListener('input',(e)=>{
  audioElement.volume = e.currentTarget.value/100;
})

const makeallplays = ()=>{
  Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.classList.add('fa-circle-play');
    element.classList.remove('fa-circle-pause');
  })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
  element.addEventListener('click',(e)=>{
    makeallplays();
    songIndex = parseInt(e.target.id)
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    audioElement.src = `/songs/${songIndex}.mp3`;
    mastersongname.innerText=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.add('fa-circle-pause')
    masterPlay.classList.remove('fa-circle-play')
    document.getElementById('bg-img').src=`/covers/${songIndex}.jpg`

  })
})

document.getElementById('next').addEventListener('click',()=>{
  if(songIndex>8){
    songIndex=1;
  }
  else{
    songIndex+=1;
  }
   audioElement.src = `/songs/${songIndex}.mp3`;
   mastersongname.innerText=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.add('fa-circle-pause')
    masterPlay.classList.remove('fa-circle-play')
    makeallplays();
    document.getElementById(songIndex).classList.add('fa-circle-pause')
    document.getElementById(songIndex).classList.remove('fa-circle-play')
    document.getElementById('bg-img').src=`/covers/${songIndex}.jpg`

  })

document.getElementById('previous').addEventListener('click',()=>{
  if(songIndex<=1){
    songIndex=1;
  }
  else{
    songIndex-=1;
  }
   audioElement.src = `/songs/${songIndex}.mp3`;
    mastersongname.innerText=songs[songIndex-1].songName;
   audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.add('fa-circle-pause')
    masterPlay.classList.remove('fa-circle-play')
    makeallplays();
    document.getElementById(songIndex).classList.remove('fa-circle-play')
    document.getElementById(songIndex).classList.add('fa-circle-pause')
    document.getElementById('bg-img').src=`/covers/${songIndex}.jpg`
  })

document.getElementById('volicon').addEventListener('click',()=>{
  if(audioElement.volume <= 0){
    audioElement.volume = volumebar.value /100
    voli.classList.remove('fa-volume-xmark')
    voli.classList.add('fa-volume-off')
  }
  else{
    audioElement.volume = 0;
    voli.classList.add('fa-volume-xmark')
    voli.classList.remove('fa-volume-off')
  }
})

volumebar.addEventListener('change',(e)=>{
  if(e.currentTarget.value <=0){
    voli.classList.add('fa-volume-xmark')
    voli.classList.remove('fa-volume-off')
    voli.classList.remove('fa-volume-low')
    voli.classList.remove('fa-volume-high')
  }
  else if(e.currentTarget.value >0 && e.currentTarget.value <=15){
    voli.classList.remove('fa-volume-xmark')
    voli.classList.add('fa-volume-off')
    voli.classList.remove('fa-volume-low')
    voli.classList.remove('fa-volume-high')
  }
  else if(e.currentTarget.value >15 && e.currentTarget.value <=40){
    voli.classList.remove('fa-volume-xmark')
    voli.classList.remove('fa-volume-off')
    voli.classList.add('fa-volume-low')
    voli.classList.remove('fa-volume-high')
  }
  else {
    voli.classList.remove('fa-volume-xmark')
    voli.classList.remove('fa-volume-off')
    voli.classList.remove('fa-volume-low')
    voli.classList.add('fa-volume-high')
  }
})

