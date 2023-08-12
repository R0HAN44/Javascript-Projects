const buttons = document.querySelectorAll('.btn');
const slides = document.querySelectorAll('img');
console.log(slides)
let counter = 0;

slides.forEach((slide,index)=>{
  slide.style.left = `${index * 100}%`;
})

function showPrev(){
  counter--;
  if(counter < 0){
    counter = 0;
  }
  showImage();
}

function showNext(){
  counter++;
  if(counter > 2){
    counter = 2;
  }
  showImage();
}

function showImage(){
  slides.forEach(slide => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  })
}