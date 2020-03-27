class Cell {
    constructor (row, column, cellSize) {

        this.row = row;
        this.column = column;

        this.x = column * cellSize + 1
        this.y =  row * cellSize + 1
        this.width = cellSize;
        this.height = cellSize;

        this.isAlive = false;
        this.isBirthed = false;

        this.liveNeighborCount = 0;

        this.color = {
            'R' : 10 * column,
            'G' : 10 * row,
            'B' : 10 * column + row
        };
    }

    returnColor(){
        let colorInfo = [
                        int(this.x),
                        int(this.y),
                        int(this.color.R),
                        int(this.color.G),
                        int(this.color.B)
                        ];
        return colorInfo
    }

    moreThanThreeNeighbors(){
        return this.liveNeighborCount > 3
    }

    lessThantwoNeighbors(){
        return this.liveNeighborCount < 2
    }

    liveOrDie () {
        let isDead;
        let isAlive;
        if (this.isAlive){
            isDead = this.lessThantwoNeighbors() || this.moreThanThreeNeighbors()
            this.isAlive = isDead;
        } else {
            isAlive = !this.lessThantwoNeighbors() && !this.moreThanThreeNeighbors();
            this.isAlive = isAlive;
            this.isBirthed = isAlive;
        }
    }

    draw () {
        fill(color(this.color.R, this.color.G, this.color.B));
        // noStroke();// testing
        rect(this.x, this.y, this.width, this.height);
    }
}
