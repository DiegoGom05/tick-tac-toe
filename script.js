const createGameboard = function () {
    return {
        gameboard: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    };
}();

 
const player = {
    mark: 'X',
    turn: true,
}

const bot = {
    mark: 'O',
    turn: false,
}

function updateGameboard(playerX, playerY, botX, botY){
     
    if(!bot.turn){
        if(createGameboard.gameboard[playerX][playerY] == 'O' 
        || createGameboard.gameboard[playerX][playerY] == 'X'){
            console.log('That one is already full');
            playerTurn();
        } else {
            createGameboard.gameboard[playerX][playerY] = player.mark;
            let id = playerX + playerY;
            let button = document.getElementById(id);
            button.innerText = 'X' 
        }      
    } else {
        if(createGameboard.gameboard[botX][botY] == 'O' 
        || createGameboard.gameboard[botX][botY] == 'X'){
            console.log('That one is already full');
            botTurn();
        } else {
            createGameboard.gameboard[botX][botY] = bot.mark;
            let id = botX + botY;
            let button = document.getElementById(id);
            console.log(button);
            button.innerText = 'O';
        }
    }
    console.log(createGameboard.gameboard);
}

function botTurn() {
    let botX = String(Math.round(Math.random() * 2));
    let botY = String(Math.round(Math.random() * 2));
    updateGameboard(undefined, undefined, botX, botY);
   
}

function playerTurn(btns){
    for (let i = 0; i < 9; i++) {
        btns[i].addEventListener('click', function () {
            let playerX = String(btns[i].id.slice(0, 1));
            let playerY = String(btns[i].id.slice(1, 2));
            updateGameboard(playerX, playerY);
            botTurn(); 
        });
    }
   
}

function winCheck() {
    for (let i = 0; i < 3; i++) {
        if (createGameboard.gameboard[i][0] === createGameboard.gameboard[i][1] && createGameboard.gameboard[i][1] === createGameboard.gameboard[i][2] && createGameboard.gameboard[i][0] !== '') {
            return createGameboard.gameboard[i][0];
        }
    }

    for (let i = 0; i < 3; i++) {
        if (createGameboard.gameboard[0][i] === createGameboard.gameboard[1][i] && createGameboard.gameboard[1][i] === createGameboard.gameboard[2][i] && createGameboard.gameboard[0][i] !== '') {
            return createGameboard.gameboard[0][i];
        }
    }

    if (createGameboard.gameboard[0][0] === createGameboard.gameboard[1][1] && createGameboard.gameboard[1][1] === createGameboard.gameboard[2][2] && createGameboard.gameboard[0][0] !== '') {
        return createGameboard.gameboard[0][0];
    }

    if (createGameboard.gameboard[0][2] === createGameboard.gameboard[1][1] && createGameboard.gameboard[1][1] === createGameboard.gameboard[2][0] && createGameboard.gameboard[0][2] !== '') {
        return createGameboard.gameboard[0][2];
    }

    return null;
}

function play (){
    let btns = document.querySelectorAll('button');
    const winnerdiv = document.querySelector('.winner');
    let movement = 0;
    while(true){
        if(!player.turn){
            console.log('Bot\'s turn');
            botTurn();
            player.turn = true;
            bot.turn = false;
        } else { 
            console.log('Player\'s turn');
            playerTurn(btns);
            bot.turn = true;
            player.turn = false;
        }

        movement++;
        if (movement >= 5) {
            const winner = winCheck();
            if (winner) {
                winnerdiv.innerText = `${winner} is the winner`;
                break;
            } else if (movement === 9) {
                console.log('It\'s a tie!');
                break;
            }
        }
    }
}

play();

