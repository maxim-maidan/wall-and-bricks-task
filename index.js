const toArray = (str) => str.split(' ');
const matrixContain = (matrix, value) => matrix.every(el => el.every(elem => +elem == +value));      //checks whether matrix contains value
const arrayContain = (matrix, value) => matrix.every(el => +el == +value);      //checks whether array contains value

function Wall(width, height, matrix) {      //class wall
    this.height = height;
    this.width = width;
    this.matrix = matrix;

    this.buildWall = brick => {     //method for checking the possibility of building a wall
        let brickCounter = 1;

        for (let wallRow = 0; wallRow < this.height; wallRow++) {
            for (let wallColumn = 0; wallColumn < this.width; wallColumn++) {

                if ((wallRow + brick.height) <= this.height && (wallColumn + brick.width) <= this.width && this.matrix[wallRow][wallColumn] == 1 && brickCounter <= brick.amount) {
                    let part = [];
                    for (let i = wallRow; i < (+wallRow + +brick.height); i++) {
                        for (let j = wallColumn; j < (+wallColumn + +brick.width); j++) {
                            part.push(this.matrix[i][j]);
                        }
                    }

                    if (arrayContain(part, 1)) {
                        brickCounter++;
                        for (let i = wallRow; i < (+wallRow + +brick.height); i++) {
                            for (let j = wallColumn; j < (+wallColumn + +brick.width); j++) {
                                this.matrix[i][j] = 0;
                            }
                        }
                    }
                }
            }
        }

    };
    this.makeInt = () => {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.matrix[i][j] = parseInt(this.matrix[i][j]);
            }
        }
    };
}

function Brick(height, width, amount) {     //class brick
    this.height = height;
    this.width = width;
    this.amount = amount;
}

let matrix = [];
let size = toArray(prompt("Enter matrix size:"));
for (let i = 0; i < size[1]; i++) {
    matrix[i] = toArray(prompt(`Enter matrix row № ${i + 1}:`));
}

let wall = new Wall(+size[0], +size[1], matrix);
wall.makeInt();
let amountOfBricks = prompt("Enter amount of bricks:")
let brick = [];
for (let i = 0; i < amountOfBricks; i++) {
    let brickStats = toArray(prompt(`Brick №${i + 1} stats`));
    brick[i] = new Brick(+brickStats[0], +brickStats[1], +brickStats[2]);       //initialize a new brick with parameters
}

brick = brick.sort((a, b) => {       //sort bricks by square
    if (a.height * a.width < b.height * b.width) return 1;
    if (a.height * a.width == b.height * b.width) return 0;
    if (a.height * a.width > b.height * b.width) return -1;
});

for (let i = 0; i < amountOfBricks; i++) {
    wall.buildWall(brick[i]);               //transfer bricks to the method
}

console.log(wall.matrix);
matrixContain(wall.matrix, 0) ? console.log('yes') : console.log('no')     //check whether all elements of the matrix are zero
