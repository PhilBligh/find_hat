const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let x = 0;
let y = 0;


class Field {
    constructor(fieldArr) {
        this.fieldArr = fieldArr;
    }
    print() {
        console.log('\n')
        const fieldMap = this.fieldArr.map(square => console.log(square.join('')));
        console.log('\n')
    }
}

let practice = new Field([['*', '0', '0'], ['░', '░', '░'], ['0', '0', '^']])

playGame = function() {
    practice.print()
    let userInput = prompt('Where would you like to move?')
    switch(userInput) {
        case 'u':
        y -= 1
            break;
        case 'd':
            y += 1
            break;
        case 'l':
            x -= 1
            break
        case 'r':
            x += 1
            break;
        default:
        console.log('You did not input a valid option')
        practice.print()
  }

if (x < 0 || x > practice.fieldArr[0].length-1 || y < 0 || y > practice.fieldArr.length-1) {
    console.log('You went out of bounds');
} else if (practice.fieldArr[y][x] == '^') {
    console.log('You found your hat')
} else if (practice.fieldArr[y][x] == '0') {
    console.log('You fell down a hole')
} else {
    practice.fieldArr[y][x] = '*'
    playGame()
}
}
playGame()