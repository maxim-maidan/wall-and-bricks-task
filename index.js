const toArray = (str) => str.split(' ');
const isZeroMatrix = (matrix) => matrix.every(el => el.every(elem => !elem));
const arrayContain = (matrix, value) => matrix.every(el => +el == +value);
const getElementById = id => document.getElementById(id);
const getValueById = id => getElementById(id).value;

let targetMatrix = [];

function Wall(width, height, matrix) {
    this.height = height;
    this.width = width;
    this.matrix = matrix;

    this.buildWall = brick => {
        let brickCounter = 1;

        for (let wallRow = 0; wallRow < this.height; wallRow++) {
            for (let wallColumn = 0; wallColumn < this.width; wallColumn++) {
                if ((wallRow + brick.height) <= this.height && (wallColumn + brick.width) <= this.width && this.matrix[wallRow][wallColumn] == 1 && brickCounter <= brick.amount) {
                    let part = [];
                    for (let i = wallRow; i < (+wallRow + +brick.height); ++i) {
                        for (let j = wallColumn; j < (+wallColumn + +brick.width); j++) {
                            if (i<this.height && j< this.width) {
                                part.push(this.matrix[i][j]);
                            }
                        }
                    }
                    if (arrayContain(part, 1)) {
                        brickCounter++;
                        for (let i = wallRow; i < (+wallRow + +brick.height); i++) {
                            for (let j = wallColumn; j < (+wallColumn + +brick.width); j++) {
                                if (i<this.height && j< this.width) {
                                    this.matrix[i][j] = 0;
                                }
                                
                            }
                        }
                    }
                }
            }
        }

    };
}

function Brick(height, width, amount) {
    this.height = height;
    this.width = width;
    this.amount = amount;
}

let brick = [new Brick(1, 1, 1)];

drawBricks();
let wallColumns;
let wallRows;
function generateWall() {
    targetMatrix = [];
    wallColumns = getValueById('wallColumnsAmount');
    wallRows = getValueById('wallRowsAmount');
    let table = ``;
    for (let j = 0; j < wallRows; j++) {
        targetMatrix.push([]);
        table += `<tr class="table__row"> \n`;
        for (let i = 0; i < wallColumns; i++) {
            targetMatrix[j][i] = 0;
            table += `<td class="table__elem" onclick="setActiveElement(${j}, ${i})" id="${j}-${i}"></td>`
        }
        table += `</tr>`;
    }
    getElementById('matrix').innerHTML = table;
}

function setActiveElement(row, col) {
    const id = row + "-" + col;
    const classList = getElementById(id).classList;
    if (Array.from(classList).includes("table__elem--active")) {
        classList.remove("table__elem--active")
        targetMatrix[row][col] = 0;
    }
    else {
        classList.add('table__elem--active')
        targetMatrix[row][col] = 1;
    }
}

function drawBricks() {
    const bricksTemplate = brick.map((elem, i) => {
        return `<div class="brick flex fd-row jc-sb">
        <p class="brick__subtitle subtitle">Width:</p>
        <input id="width${i}" value="${elem.width}" type="number" class="brick__input input" onchange="changeBrickParam('width',${i})">
        <p class="brick__subtitle subtitle">Height:</p>
        <input id="height${i}" value="${elem.height}" type="number" class="brick__input input"  onchange="changeBrickParam('height',${i})">
        <p class="brick__subtitle subtitle">Amount:</p>
        <input id="amount${i}"  value="${elem.amount}" type="number" class="brick__input input"  onchange="changeBrickParam('amount',${i})">
        <button class="brick__delete" onclick="deleteBrick(${i})"><i class="fa fa-times"></i></button>
        </div>`;
    }).join('');
    getElementById('bricksField').innerHTML = bricksTemplate;
}
function addBrick() {
    brick.push(new Brick(1, 1, 1));
    drawBricks();
}

function changeBrickParam(param, index) {
    const id = param + index;
    const value = getValueById(id);
    brick[index][param] = value;
}

function deleteBrick(index) {
    brick.splice(index, 1);
    drawBricks();
}
function checkBuild() {
    const targetWall = JSON.parse(JSON.stringify(targetMatrix));
    const wall = new Wall(wallColumns, wallRows, targetWall);
    const sortedBricks = JSON.parse(JSON.stringify(brick)).sort((a, b) => {
        if (a.height * a.width < b.height * b.width) return 1;
        if (a.height * a.width == b.height * b.width) return 0;
        if (a.height * a.width > b.height * b.width) return -1;
    });
    sortedBricks.forEach(elem => {
        wall.buildWall(elem);
    })
    isZeroMatrix(wall.matrix) ? alert('YES') : alert('NO');
}
