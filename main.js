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
        let numHoles = Math.floor(((numSq-2)*per)/100)
        console.log(numHoles)
        let numField = numSq-numHoles-2
        genArr.push(hat);
        while (numHoles > 0) {
            genArr.push(hole);
            numHoles -= 1;
        }
        while (numField > 0) {
            genArr.push(fieldCharacter);
            numField -= 1;
        }
        genArr = genArr.sort(() => Math.random() - 0.5)
        genArr.unshift(pathCharacter)    

        for (let i=0; i<genArr.length; i+=w) {
            let temp = genArr.slice(i, i+w);
            finArr.push(temp)
        }
        
        return finArr

    }
}



playGame = function(myField) {
    myField.print()
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
        playGame(myField)
  }

if (x < 0 || x > myField.fieldArr[0].length-1 || y < 0 || y > myField.fieldArr.length-1) {
    console.log('You went out of bounds');
} else if (myField.fieldArr[y][x] == hat) {
    console.log('You found your hat')
} else if (myField.fieldArr[y][x] == hole) {
    console.log('You fell down a hole')
} else {
    myField.fieldArr[y][x] = '*'
    playGame(myField)
}
}
 
let philsfield = new Field(Field.generateField(5,5, 50))
let practice = new Field([['*', 'O', 'O'], ['░', '░', '░'], ['O', 'O', '^']])
playGame(philsfield)

