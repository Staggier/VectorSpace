const canvas = document.getElementsByTagName('canvas')[0];
const titleScreen = document.getElementById('titleScreen');
const instructions = document.getElementById('instructions');
const credits = document.getElementById('credits');

var buttons = titleScreen.querySelectorAll('button');

var menuSoundtrack = new Audio('./audio/Six_Umbrellas_-_09_-_Joker.mp3');

var backgroundImage = new Image(canvas.width, canvas.height);
backgroundImage.src = './images/background.png';

var backgrounds;

menuSoundtrack.onended = () => {
    menuSoundtrack.play();
}

function setTitleScreen() {
    $(document.getElementsByTagName('body')[0]).css({'cursor':'url(./images/cursor.png),auto'});

    setBackgrounds();

    canvas.width = 500;
    canvas.height = 400;

    instructions.hidden = true;
    credits.hidden = true;
    titleScreen.hidden = false;

    menuSoundtrack.play();
    inGameSoundtrack.pause();

    $('#btns').css({'display':'flex', 'flex-direction':'column','margin':'5% 25% 0 25%'});
    titleScreenAnimation();
}

instructions.querySelector('button').addEventListener('click', () => {
    canvas.hidden = false;
    instructions.hidden = true;
    titleScreen.hidden = false;
    setTitleScreen();
});

credits.querySelector('button').addEventListener('click', () => {
    canvas.hidden = false;
    credits.hidden = true;
    titleScreen.hidden = false;
    setTitleScreen();
});

buttons[0].addEventListener('click', () => {    
    titleScreen.hidden = true;
    canvas.width = 800;
    canvas.height = 575;

    $(canvas).css({'margin':'2% 0 0 0'});
    game();
})

buttons[1].addEventListener('click', (e) => {
    canvas.hidden = true;
    titleScreen.hidden = true;
    instructions.hidden = false;

    $(instructions.querySelector('h2')).css({'margin':'10% 0 0 0'});
    $(instructions.querySelector('p')).css({'margin':'10% 0 9% 0'});
    $(instructions.querySelector('button')).css({'display':'block', 'margin':'auto', 'width':'50%'});
});

buttons[2].addEventListener('click', () => {
    canvas.hidden = true;
    titleScreen.hidden = true;
    credits.hidden = false;

    $(credits.querySelector('h2')).css({'margin':'2% 0 2% 0'});
    $(credits.querySelector('p')).css({'margin':'0 0 1% 0'});
    $(credits.querySelector('button')).css({'width':'50%', 'margin':'1% 0 0 0'});
})

document.addEventListener('DOMContentLoaded', setTitleScreen);