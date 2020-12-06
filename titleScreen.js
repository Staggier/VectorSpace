const canvas = document.getElementsByTagName('canvas')[0];
const titleScreen = document.getElementById('titleScreen');
const instructions = document.getElementById('instructions');
const credits = document.getElementById('credits');

function changeCursor(element) {
    $(element).css({'cursor':'url(/images/cursor.png),auto'});
}

canvas.addEventListener('mouseover', () => {
    changeCursor(canvas);
});

instructions.addEventListener('mouseover', (e) => {
    changeCursor(e.target);
})

instructions.querySelector('button').addEventListener('click', () => {
    canvas.hidden = false;
    instructions.hidden = true;
    titleScreen.hidden = false;
});

credits.addEventListener('mouseover', (e) => {
    changeCursor(e.target);
});

credits.querySelector('button').addEventListener('click', () => {
    canvas.hidden = false;
    credits.hidden = true;
    titleScreen.hidden = false;
});

document.getElementById('btns').addEventListener('mouseover', (e) => {
    changeCursor(e.target);
})

var buttons = titleScreen.querySelectorAll('button');

buttons[0].addEventListener('click', () => {
    $(canvas).css({'margin':'0', 'animation': 'slide 1s linear infinite'});
    titleScreen.hidden = true;
    canvas.width = 800;
    canvas.height = 600;
    
    game();
})

buttons[1].addEventListener('click', (e) => {
    canvas.hidden = true;
    titleScreen.hidden = true;
    instructions.hidden = false;

    $(instructions.querySelector('p')).css({'margin':'10% 0 10% 0'});
    $(instructions.querySelector('button')).css({'display':'block', 'margin':'auto', 'width':'50%'});
});

buttons[2].addEventListener('click', () => {
    canvas.hidden = true;
    titleScreen.hidden = true;
    credits.hidden = false;

    $(credits.querySelector('p')).css({'margin':'10% 0 10% 0'});
    $(credits.querySelector('button')).css({'width':'50%'});
})

document.addEventListener('DOMContentLoaded', () => {
    changeCursor(document.getElementsByTagName('html')[0]);

    $(canvas).css({"margin":"5% 0 0 0"});

    canvas.width = 500;
    canvas.height = 400;

    instructions.hidden = true;
    credits.hidden = true;

    $('#btns').css({'display':'flex', 'flex-direction':'column','margin':'5% 25% 0 25%'});
});