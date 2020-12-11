const canvas = document.getElementsByTagName('canvas')[0];
const titleScreen = document.getElementById('titleScreen');
const instructions = document.getElementById('instructions');
const credits = document.getElementById('credits');

var buttons = titleScreen.querySelectorAll('button');

function setTitleScreen() {
    $(document.getElementsByTagName('body')[0]).css({'cursor':'url(./images/cursor.png),auto'});

    $(canvas).css({'animation':'slide 2s linear infinite'});
    canvas.onanimationiteration = setX;

    canvas.width = 500;
    canvas.height = 400;

    instructions.hidden = true;
    credits.hidden = true;
    titleScreen.hidden = false;

    $('#btns').css({'display':'flex', 'flex-direction':'column','margin':'5% 25% 0 25%'});
}

function setX() {
    canvas.style.setProperty('--xPosition', Math.random() * 1024 | 0)
};


instructions.querySelector('button').addEventListener('click', () => {
    canvas.hidden = false;
    instructions.hidden = true;
    titleScreen.hidden = false;
});

credits.querySelector('button').addEventListener('click', () => {
    canvas.hidden = false;
    credits.hidden = true;
    titleScreen.hidden = false;
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

    $(instructions.querySelector('h2')).css({'margin':'10% 0 10% 0'});
    $(instructions.querySelector('p')).css({'margin':'10% 0 9% 0'});
    $(instructions.querySelector('button')).css({'display':'block', 'margin':'auto', 'width':'50%'});
});

buttons[2].addEventListener('click', () => {
    canvas.hidden = true;
    titleScreen.hidden = true;
    credits.hidden = false;

    $(credits.querySelector('h2')).css({'margin':'10% 0 10%'});
    $(credits.querySelector('p')).css({'margin':'10% 0 14.5% 0'});
    $(credits.querySelector('button')).css({'width':'50%'});
})

document.addEventListener('DOMContentLoaded', setTitleScreen);