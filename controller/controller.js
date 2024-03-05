"use-strict"
import { createView, updateView } from "../view/view.js";
import { addCells, addModel, createBoard, runMutation, resetModel } from "../model/model.js";

let GRID_ROWS;
let GRID_COLS;
let intervalId;

export function start(row, col){
    GRID_ROWS = row;
    GRID_COLS = col;
    createView(GRID_ROWS, GRID_COLS);
    const board = createBoard(row, col);
    addModel(board);
}
export function createCells(row, col){
    const model = addCells(row,col);
    updateView(model);
}
export function startMutations(){
    if(!intervalId){
        intervalId = setInterval(() => {
            const model = runMutation(GRID_ROWS, GRID_COLS);
            updateView(model);
        }, 300);
    }
}
export function stopMutations(){
    clearInterval(intervalId);
    intervalId = null;
}
export function clearBoard(){
    const model = resetModel(GRID_ROWS, GRID_COLS);
    updateView(model);
    clearInterval(intervalId);
    intervalId = null;
}