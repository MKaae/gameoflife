"use-strict"

let model;

export function createBoard(row, col){
    const newModel = [];
    for(let i = 0; i < row; i++){
        const tempRow = [];
        for(let j = 0; j < col; j++){
            tempRow.push(0)
        }
        newModel.push(tempRow);
    }
    return newModel;
}

export function addModel(tempModel){
    model = tempModel;   
}

export function addCells(row,col){
    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            const randomNumber = Math.random() <= 0.15 ? 1 : 0;
            model[i][j] = randomNumber;
        }
    }
    return model;
}

export function runMutation(row, col){
    const tempModel = createBoard(row, col);
    for(let i = 0; i < model.length; i++){
        for(let j = 0; j < model[i].length; j++){
            const neighbors = countNeighbors(i,j);
            if(model[i][j] == 1){
                if(neighbors < 2 || neighbors > 3){
                    tempModel[i][j] = 0;
                } else {
                    tempModel[i][j] = 1;
                }
            } else {
                if(neighbors === 3){
                    tempModel[i][j] = 1;
                }
            }
        }    
    }
    model = tempModel
    return model;
}

function countNeighbors(row, col){
    let count = 0;
    for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){
            if(i === 0 && j === 0) continue;
            const neighborRow = row + i;
            const neighborCol = col + j;
            if(neighborRow >= 0 && neighborRow < model.length && neighborCol >= 0 && neighborCol < model.length){
                if(model[neighborRow][neighborCol]){
                    count++;
                }
            }
        }
    }
    return count;
}
export function resetModel(GRID_ROWS, GRID_COLS){
    const newModel = createBoard(GRID_ROWS, GRID_COLS);
    model = newModel;
    return model;
}