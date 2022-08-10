const CHANGE_COLOR_DELAY = 1000;
let timerId = null;

const refs = {
 startBtn : document.querySelector('[data-start]'),
 stopBtn : document.querySelector('[data-stop]'), 
 body : document.querySelector("body"),  
};

refs.startBtn.addEventListener('click', startChangeColorBg);
refs.stopBtn.addEventListener('click', stopChangeColorBg);

refs.stopBtn.disabled = true;

function startChangeColorBg(){
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    timerId = setInterval(() => {
        getRandomHexColor();
      }, CHANGE_COLOR_DELAY);   
}

function stopChangeColorBg(){
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    clearInterval(timerId);

}

function getRandomHexColor() {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    refs.body.style.backgroundColor = randomColor;
  }
