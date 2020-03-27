class Cell {
  constructor (row, column, cellSize) {

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
      let colorInfo = [ int(this.x),
                        int(this.y),
                        int(this.color.R),
                        int(this.color.G),
                        int(this.color.B) ];
      return colorInfo
  }

  setIsAlive (isAlive) {
    this.isAlive = isAlive;
  }

  moreThanThreeNeighbors(){
      return this.liveNeighborCount > 3
  }

  lessThantwoNeighbors(){
      return this.liveNeighborCount < 2
  }

  liveOrDie () {
     if (this.isAlive){
         if (this.lessThantwoNeighbors() || this.moreThanThreeNeighbors()) {
           this.isAlive = false;
         }
     } else {
         if (!this.lessThantwoNeighbors() && !this.moreThanThreeNeighbors()) {
             this.isAlive = true;
             this.isBirthed = true;
         }
     }
    }

  draw () {
    fill(color(this.colorR, this.colorG, this.colorB));
    noStroke();// testing
    rect(this.x, this.y, this.width, this.height);
  }
}
