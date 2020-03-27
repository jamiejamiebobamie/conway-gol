
let cellDivisor = 35;

class Grid {
    constructor (widthOfCanvas, heightOfCanvas, portraitMode) {
        if (portraitMode){
            this.width = widthOfCanvas;
            this.height = heightOfCanvas - heightOfCanvas / 4;
            this.cellSize = widthOfCanvas/cellDivisor;
        } else {
            this.width = widthOfCanvas - widthOfCanvas / 4;
            this.height = heightOfCanvas;
            this.cellSize = heightOfCanvas/cellDivisor;
        }

        this.numberOfRows = int( this.height / this.cellSize);
        this.numberOfColumns = int( this.width / this.cellSize);

        this.cells = new Array(this.numberOfRows);
        for (let i = 0; i < this.numberOfRows; i++) {
            this.cells[i] = new Array(this.numberOfColumns);
        }

        for (let row = 0; row < this.numberOfRows; row++) {
            for (let column = 0; column < this.numberOfColumns; column++) {
                this.cells[row][column] = new Cell(row, column, this.cellSize);
            }
        }
        this.currentGeneration = 0;
        this.play = true;

        this.storeGenIn1 = true;
        this.store1 = undefined;
        this.store2 = undefined;
    }

    randomizeCellState() {
        this.currentGeneration = 0;
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let column = 0; column < this.numberOfColumns; column++) {
                this.cells[row][column].isAlive = floor(random(2));
                this.cells[row][column].colorR = 10 * column;
                this.cells[row][column].colorG = 10 * row;
                this.cells[row][column].colorB = column + row;
            }
        }
    }

    isValidPosition (currentCell, row, column) {
        let validRow = row < this.numberOfRows && row >=0;
        let validColumn = column < this.numberOfColumns && column >= 0;
        let notSelf = currentCell.row != row && currentCell.column != column;
        if( validRow && validColumn && notSelf) {
            return true;
        } else {
            return false;
        }
    }

    getNeighbors (currentCell){
        let neighbors = [];
        for (let rowIncrement = -1; rowIncrement <= 1; rowIncrement++) {
            for (let columnIncrement = -1; columnIncrement <= 1; columnIncrement++) {
                let testRow = currentCell.row + rowIncrement;
                let testColumn = currentCell.column + columnIncrement;
                if(this.isValidPosition(currentCell, testRow, testColumn)){
                    neighbors.push(this.cells[testRow][testColumn]);
                }
            }
        }
        return neighbors;
    }

    updateNeighborCounts () {
    for (let row = 0; row < this.numberOfRows; row++) {
        for (let column = 0; column < this.numberOfColumns; column++) {
            this.cells[row][column].liveNeighborCount = 0;
            let neighbors = this.getNeighbors(this.cells[row][column]);
            for(let i = 0; i < neighbors.length; i++) {
                if (neighbors[i].isAlive){
                    this.cells[row][column].liveNeighborCount++;
                }
                }
            }
        }
    }

    cellColor () {
    let colorR = 0;
    let colorG = 0;
    let colorB = 0;
    //dividing by 3 wasn't giving me the colors I wanted:
    // let colorDivisor = 3.7;
    for (let row = 0; row < this.numberOfRows; row++) {
        for (let column = 0; column < this.numberOfColumns; column++) {
            if(this.cells[row][column].birth == true) {
                let neighbors = this.getNeighbors(this.cells[row][column]);
                for(let i = 0; i < neighbors.length; i++) {
                    if(neighbors[i].isAlive == true){
                        colorR = this.cells[row][column].colorR + neighbors[i].colorR;
                        colorG = this.cells[row][column].colorG + neighbors[i].colorG;
                        colorB = this.cells[row][column].colorB + neighbors[i].colorB;
                    }
                }
                colorR /= neighbors.length;//colorDivisor;
                colorG /= neighbors.length;//colorDivisor;
                colorB /= neighbors.length;//colorDivisor;
                this.cells[column][row].birth = false;
            } else if (this.currentGeneration > 0) {
                colorR = 240;
                colorG = 240;
                colorB = 240;
            } else {
                colorR = (240 + this.cells[row][column].colorR) / 2;
                colorG = (240 + this.cells[row][column].colorG) / 2;
                colorB = (240 + this.cells[row][column].colorB) / 2;
            }
                this.cells[row][column].colorR = colorR;
                this.cells[row][column].colorG = colorG;
                this.cells[row][column].colorB = colorB;
            }
        }
    }


    updatePopulation () {
    if(frameCount % 1 === 0) {
        this.currentGeneration = this.currentGeneration + 1;
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let column = 0; column < this.numberOfColumns; column++) {
                this.cells[row][column].liveOrDie();
                this.cellColor();
                }
            }
        }
    }

    // isn't it usually rows contains columns...
    returnColors(){
        let gridColors = []
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let column = 0; column < this.numberOfColumns; column++) {
                let cellColor = this.cells[row][column].returnColor();
                gridColors.push(cellColor);
            }
        }
        return gridColors;
    }

    /*
    need to store every other generation in two variables that flip flop
    gen1, gen2, gen3, gen4, gen5, gen6, gen7
    store1      store2      store1      store2

    if store1 == store2:
    the game has reached its conclusion and needs to be reset.

    */
    storeTwoGenerations(){
        if (this.currentGeneration % 2){     //if odd
            if (this.storeGenIn1){
                this.store1 = this.returnColors();
                this.storeGenIn1 = false;
            } else {
                this.store2 = this.returnColors();
                this.storeGenIn1 = true;
            }
        }
    }

    checkForEndState(){
        let equal = false;
        // check to make these variables are defined
        if (this.store1 && this.store2){
            // check to make sure they have the same length.
            if (this.store1.length == this.store2.length){
                equal = true;
                let i = 0;
                while (i < this.store1.length && equal){
                    for (let j = 0; j < this.store1[i].length; j++){
                        if (this.store1[i][j] != this.store2[i][j]){
                            equal = false;
                        }
                    }
                        i++;
                }
            }
        }
        return equal
    }

    draw () {
        this.storeTwoGenerations();
        this.updateNeighborCounts();
        this.updatePopulation();
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let column = 0; column < this.numberOfColumns; column++) {
                this.cells[row][column].draw();
            }
        }
    }
}
