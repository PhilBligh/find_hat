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

    static generateField(h, w, per) {
        let numSq = h*w;
        let genArr = [];
        let finArr = []; 
        genArr.push(pathCharacter)
        while (numSq > 1) {
            genArr.push(fieldCharacter);
            numSq -= 1;
        }
        let putHat = function() {
            let randomNum = Math.floor(Math.random()*genArr.length)
            if (randomNum != 0) {
                genArr[randomNum] = hat
            }  else {
                putHat()
            }}
        putHat()

        let putHoles = function() {
            let numHoles = Math.floor(((genArr.length-2)*per)/100)
            let randomNum = Math.floor(Math.random()*genArr.length)
            for (let j=numHoles; j>0; j--) {
                if (genArr[randomNum] == fieldCharacter) {
                    genArr[randomNum] = hole;
                }
            }
        }
        putHoles()
        for (let i=0; i<genArr.length; i+=w) {
            let temp = genArr.slice(i, i+w);
            finArr.push(temp)
        }
        console.log(finArr)
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
        playGame()
  }

if (x < 0 || x > practice.fieldArr[0].length-1 || y < 0 || y > practice.fieldArr.length-1) {
    console.log('You went out of bounds');
} else if (practice.fieldArr[y][x] == hat) {
    console.log('You found your hat')
} else if (practice.fieldArr[y][x] == hole) {
    console.log('You fell down a hole')
} else {
    practice.fieldArr[y][x] = '*'
    playGame()
}
}
// playGame()
Field.generateField(3,3, 50)