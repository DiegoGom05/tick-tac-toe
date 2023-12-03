 

 
const player = {
    mark: 'X',
    turn: true,
}

const bot = {
    mark: 'O',
    turn: false,
}

function updateGameboard(btn, button){
    if(!player.turn){
        if(button.innerText != 'X' && button.innerText != 'O'){
            button.innerText = 'O';
            bot.turn = false;
        } else if(bot.turn == true) {
            botTurn();
            console.log('already taken');
        }
        
      
    } else {
        if(btn.innerText != 'X' && btn.innerText != 'O'){
            btn.innerText = 'X';
        }
        console.log('already taken');
    }

   
}

function botTurn() {
    let botX = String(Math.round(Math.random() * 2));
    let botY = String(Math.round(Math.random() * 2));
    let button = document.getElementById(botX + botY);
    updateGameboard(undefined, button);
}

 
function winCheck(buttonsArray) {
  
    for (let i = 0; i < 3; i++) {
        const rowStart = i * 3;
        if (
            buttonsArray[rowStart].innerText !== '' &&
            buttonsArray[rowStart].innerText === buttonsArray[rowStart + 1].innerText &&
            buttonsArray[rowStart].innerText === buttonsArray[rowStart + 2].innerText
        ) {
                return buttonsArray[rowStart].innerText;
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (
            buttonsArray[i].innerText !== '' &&
            buttonsArray[i].innerText === buttonsArray[i + 3].innerText &&
            buttonsArray[i].innerText === buttonsArray[i + 6].innerText
        ) {
                return buttonsArray[i].innerText;
        }
    }

    // Check diagonals
    if (
        buttonsArray[0].innerText !== '' &&
        buttonsArray[0].innerText === buttonsArray[4].innerText &&
        buttonsArray[0].innerText === buttonsArray[8].innerText
    ) {
        return buttonsArray[0].innerText;
    }

    if (
        buttonsArray[2].innerText !== '' &&
        buttonsArray[2].innerText === buttonsArray[4].innerText &&
        buttonsArray[2].innerText === buttonsArray[6].innerText
    ) {
        return buttonsArray[2].innerText }

    return null;
}


function play() {
    let btns = document.querySelectorAll('button');
    const buttonsArray = Array.from(btns);
    let winnerDiv = document.querySelector('.winner');

    buttonsArray.forEach(btn => {
        btn.addEventListener('click', () => {
            if (player.turn) {
                updateGameboard(btn);
                player.turn = false;
                bot.turn = true;
                
            }

            if (bot.turn) {
                botTurn();
               
                player.turn = true;
            }
            win = winCheck(buttonsArray);
            if(win){
                winnerDiv.innerHTML = `the winner was ${win}`;
            }
             

        });
    });
}

play();
 
