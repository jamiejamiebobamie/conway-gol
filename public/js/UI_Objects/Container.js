function getRandomInt(max) {
return Math.floor(Math.random() * Math.floor(max));
}

class Container{
    constructor(offset, y, length, widthOfCanvas, heightOfCanvas, portrait, numberOfContainers, indexOfContainer){

        this.startingPosition = y + offset;

        this.numberOfContainers = numberOfContainers;
        this.index = indexOfContainer;

        if (portrait){
            this.width = widthOfCanvas;
            this.height = heightOfCanvas;
            this.length = length || windowWidth/numberOfContainers;

        }else{
            this.width = heightOfCanvas;
            this.height = widthOfCanvas;
            this.length = length || heightOfCanvas/numberOfContainers;

        }

        this.portrait = portrait;
        this.randomColor = (getRandomInt(256))



    }

    recreate(widthOfCanvas, heightOfCanvas){
            this.width = widthOfCanvas;
            this.randomColor = (getRandomInt(256))
    }

    draw(){
        fill(this.randomColor);
        if (this.portrait){
            rect(0,this.startingPosition,this.width,this.length)
        }else{
            rect(this.startingPosition, 0,this.length, this.width)
        }
    }

    getEndingY(){
        return this.startingPosition + this.length;
    }
}

/*

ALL containers should...
    have a starting location on the canvas (where to begin):
        x (FIXED: 0)
        y
    have a width (FIXED: length of the canvas)
    have a length (how far down the canvas the container extends)
    have a draw() function to draw the items contained in the container
    have a method that returns where the container ends:
        startingLocation.y + length of container
    a method to recreateSelf() when the window is resized.

individual containers should...
    the snapshotContainer needs to extend its length with every snapshot
        and inform the canvas that the canvas needs to extend itself as well

what info to pass in?
    starting location:
        y
    container / bounds info:
        length


*/
