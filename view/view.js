"use-strict"
import { start, startMutations, createCells, stopMutations, clearBoard } from "../controller/controller.js"


document.getElementById('grid-select').addEventListener('click', createGame);

const addButton = document.getElementById('add-btn');
const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');
const clearButton = document.getElementById('clear-btn');

function createGame(){
    let row = document.getElementById('row-select').value;
    let col = document.getElementById('col-select').value;
    const selection = document.getElementById('selecter-div');
    selection.classList.add('hide');
    const buttons = document.getElementById('button-row');
    buttons.style.display = 'block';
    if(row < 50 || col < 50){
        row = 40;
        col = 40;
    }
    makeButtonsClickable(row, col);
    start(row, col);
}

function makeButtonsClickable(row, col){
    addButton.addEventListener('click', () => createCells(row,col));
    startButton.addEventListener('click', () => startMutations());
    stopButton.addEventListener('click', () => stopMutations());
    clearButton.addEventListener('click', () => clearBoard());
}

export function createView(row, col){
    document.documentElement.style.setProperty('--col', col);
    const board = document.getElementById('board');
    for(let i = 0; i < row; i++){
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        for(let j = 0; j < col; j++){
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.row = row;
            cellElement.dataset.col = col;
            rowElement.appendChild(cellElement);
        }
        board.appendChild(rowElement);
    }
}
export function updateView(model){
    const cells = document.getElementById('board').querySelectorAll('.cell');
    const numRows = model.length;
    const numCols = model[0].length;
    for(let i = 0; i < numRows; i++){
        for(let j = 0; j < numCols; j++){
            const index = i * numCols + j;
            const cell = cells[index];
            const cellState = model[i][j];
            if(cellState === 1){
                cell.classList.add('alive');
                cell.classList.remove('dead');
            } else {
                cell.classList.add('dead');
                cell.classList.remove('alive');
            }
        }
    }
}