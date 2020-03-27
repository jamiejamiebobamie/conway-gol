
let cellDivisor = 30;

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

    getGridDimensions(){
        return [this.cellSize * this.numberOfColumns, this.cellSize * this.numberOfRows,]
    }

    randomizeCellState() {
        this.currentGeneration = 0;
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let column = 0; column < this.numberOfColumns; column++) {
                this.cells[row][column].isAlive = floor(random(2));
                if (this.cells[row][column].isAlive){
                    this.cells[row][column].color.R = 10 * column;
                    this.cells[row][column].color.G = 10 * row;
                    this.cells[row][column].color.B = column + row;
                } else {
                    this.cells[row][column].color.R = 240;
                    this.cells[row][column].color.G = 240;
                    this.cells[row][column].color.B = 240;
                }
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

    getNeighbors(currentCell){
        let neighbors = [];
        for (let rowIncrement = -1; rowIncrement <= 1; rowIncrement++) {
            for (let columnIncrement = -1; columnIncrement <= 1; columnIncrement++) {
                let testRow = currentCell.row + rowIncrement;
                let testColumn = currentCell.column + columnIncrement;
                let isValid = this.isValidPosition(currentCell, testRow, testColumn);
                if(isValid){
                    neighbors.push(this.cells[testRow][testColumn]);
                }
            }
        }
        return neighbors;
    }

    updateNeighborCounts() {
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

    //needs to be refactored
    cellColor() {
        //dividing by 3 wasn't giving me the colors I wanted:
        let colorDivisor = float(cellDivisor)/10.5;

        for (let row = 0; row < this.numberOfRows; row++) {
            for (let column = 0; column < this.numberOfColumns; column++) {
                if(this.cells[row][column].isBirthed) {
                    let neighbors = this.getNeighbors(this.cells[row][column]);
                    let livingNeighbors = 0;
                    for(let i = 0; i < neighbors.length; i++) {
                        if(neighbors[i].isAlive){
                            this.cells[row][column].color.R += neighbors[i].color.R;
                            this.cells[row][column].color.G += neighbors[i].color.G;
                            this.cells[row][column].color.B += neighbors[i].color.B;
                        }
                    }
                    this.cells[row][column].color.R /= colorDivisor;
                    this.cells[row][column].color.G /= colorDivisor;
                    this.cells[row][column].color.B /= colorDivisor;

                    this.cells[row][column].isBirthed = false;
                }
            }

        }
    }


    updatePopulation () {
        if(frameCount % 10 == 0) {
            this.currentGeneration += 1;
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
        if (this.currentGeneration % 4 == 0){     //if odd
            if (this.storeGenIn1){
                this.store1 = this.getIsAliveStateArray();
            } else {
                this.store2 = this.getIsAliveStateArray();
            }
            this.storeGenIn1 = !this.storeGenIn1;
        }
    }
    // this method doesn't work all of the time either due to framerate
        // or floating point rounding
    checkForEndState(){
        let equal = false;
        // check to make these variables are defined
        if (this.store1 && this.store2){
            // check to make sure they have the same length.
            if (this.store1.length == this.store2.length){
                equal = true;
                let i = 0;
                while (i < this.store1.length && equal){
                    if (this.store1[i] != this.store2[i]){
                            equal = false;
                    }
                    i++;
                }
            }
        }
        return equal
    }

    getIsAliveStateArray(){
        let livingCells = [];
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let column = 0; column < this.numberOfColumns; column++) {
                    livingCells.push(this.cells[row][column].isAlive);
            }
        }
        return livingCells;

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

class SavedGrid extends Grid{
    constructor (widthOfCanvas, heightOfCanvas){
        let portraitMode = widthOfCanvas < heightOfCanvas;
        super(widthOfCanvas, heightOfCanvas, portraitMode);
    }

    create(colors){
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let column = 0; column < this.numberOfColumns; column++) {
                index = row + column;
                colorR = colors[index][2];
                colorG = colors[index][3];
                colorB = colors[index][4];
                this.cells[row][column].color.R = colorR;
                this.cells[row][column].color.G = colorG;
                this.cells[row][column].color.B = colorB;
            }
        }
    }

    draw(){}
}
